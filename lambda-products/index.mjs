/**
 * SAGASON SPA – Lambda: sagason-products-prices
 * ─────────────────────────────────────────────
 * Gestiona los precios de productos en DynamoDB.
 *
 * Endpoints:
 *   GET  /products/public         → Lista todos los productos (sin precios)
 *   GET  /products/prices         → Lista productos + precios (requiere x-admin-token)
 *   PUT  /products/{id}/price     → Actualiza precio de un producto (requiere x-admin-token)
 *
 * Variables de entorno requeridas:
 *   ADMIN_TOKEN    → Token secreto para operaciones de admin
 *   TABLE_NAME     → Nombre de la tabla DynamoDB (default: sagason-products-prices)
 *   AWS_REGION     → Región AWS (default: us-east-1)
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  UpdateCommand,
  GetCommand,
} from '@aws-sdk/lib-dynamodb';

// ────────────────────────────────────────────────────────
//  Config
// ────────────────────────────────────────────────────────
const TABLE_NAME  = process.env.TABLE_NAME  || 'sagason-products-prices';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '';
const REGION      = process.env.AWS_REGION  || 'us-east-1';

const client = new DynamoDBClient({ region: REGION });
const ddb    = DynamoDBDocumentClient.from(client);

// ────────────────────────────────────────────────────────
//  CORS Headers
// ────────────────────────────────────────────────────────
const CORS = {
  'Access-Control-Allow-Origin' : '*',
  'Access-Control-Allow-Methods': 'GET,PUT,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type,x-admin-token',
};

function response(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json', ...CORS },
    body: JSON.stringify(body),
  };
}

// ────────────────────────────────────────────────────────
//  Auth helper
// ────────────────────────────────────────────────────────
function decodeJwtPayload(token) {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    const decoded = Buffer.from(payload, 'base64').toString('utf8');
    return JSON.parse(decoded);
  } catch (e) {
    return null;
  }
}

function isAdmin(event) {
  const token =
    event.headers?.['x-admin-token'] ||
    event.headers?.['X-Admin-Token'] ||
    '';
    
  // 1. Validar por token secreto (fallback local)
  if (ADMIN_TOKEN && token === ADMIN_TOKEN) return true;
  
  // 2. Validar por cuenta de Google (JWT sin validación de firma para equiparar Tags4K)
  const decoded = decodeJwtPayload(token);
  if (decoded && decoded.email === 'brluson@gmail.com') return true;

  return false;
}

// ────────────────────────────────────────────────────────
//  Handler
// ────────────────────────────────────────────────────────
export const handler = async (event) => {
  const method = event.httpMethod || event.requestContext?.http?.method || 'GET';
  const path   = event.path || event.rawPath || '/';

  // ── Preflight ──────────────────────────────────────────
  if (method === 'OPTIONS') {
    return { statusCode: 200, headers: CORS, body: '' };
  }

  try {
    // ── GET /products/public ────────────────────────────
    if (method === 'GET' && path.includes('/public')) {
      const result = await ddb.send(new ScanCommand({
        TableName: TABLE_NAME,
        ProjectionExpression: 'productId, productName, category, isActive',
      }));
      return response(200, { success: true, data: result.Items || [] });
    }

    // ── GET /products/prices ────────────────────────────
    if (method === 'GET' && path.includes('/prices')) {
      if (!isAdmin(event)) {
        return response(401, { success: false, error: 'No autorizado' });
      }
      const result = await ddb.send(new ScanCommand({ TableName: TABLE_NAME }));
      return response(200, { success: true, data: result.Items || [] });
    }

    // ── PUT /products/{id}/price ────────────────────────
    if (method === 'PUT' && path.includes('/price')) {
      if (!isAdmin(event)) {
        return response(401, { success: false, error: 'No autorizado' });
      }

      const body = JSON.parse(event.body || '{}');
      const { productId, basePrice, priceVariants, notes } = body;

      if (!productId || basePrice === undefined) {
        return response(400, { success: false, error: 'productId y basePrice son requeridos' });
      }

      const now = new Date().toISOString();

      await ddb.send(new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { productId },
        UpdateExpression:
          'SET basePrice = :bp, priceVariants = :pv, notes = :n, updatedAt = :ua',
        ExpressionAttributeValues: {
          ':bp': Number(basePrice),
          ':pv': priceVariants || {},
          ':n' : notes || '',
          ':ua': now,
        },
      }));

      return response(200, {
        success: true,
        message: `Precio actualizado para ${productId}`,
        updatedAt: now,
      });
    }

    // ── GET /products/{id} ──────────────────────────────
    if (method === 'GET') {
      const segments = path.split('/').filter(Boolean);
      const productId = segments[segments.length - 2] === 'products'
        ? null
        : segments[segments.length - 1];

      if (productId && productId !== 'products') {
        // Devuelve precio solo si es admin
        const result = await ddb.send(new GetCommand({
          TableName: TABLE_NAME,
          Key: { productId },
        }));
        if (!result.Item) {
          return response(404, { success: false, error: 'Producto no encontrado' });
        }
        const item = isAdmin(event)
          ? result.Item
          : { productId: result.Item.productId, productName: result.Item.productName };
        return response(200, { success: true, data: item });
      }

      // GET /products → lista completa sin precios (público)
      const result = await ddb.send(new ScanCommand({ TableName: TABLE_NAME }));
      const items = (result.Items || []).map(item =>
        isAdmin(event)
          ? item
          : { productId: item.productId, productName: item.productName, category: item.category, isActive: item.isActive }
      );
      return response(200, { success: true, data: items });
    }

    return response(404, { success: false, error: 'Ruta no encontrada' });

  } catch (err) {
    console.error('Lambda error:', err);
    return response(500, { success: false, error: 'Error interno del servidor' });
  }
};
