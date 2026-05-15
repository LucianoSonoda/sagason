/**
 * SAGASON SPA – Servicio de Productos
 * ─────────────────────────────────────
 * Conecta el sitio web con la Lambda de precios (DynamoDB).
 *
 * Variable de entorno requerida:
 *   VITE_PRODUCTS_API_URL  → URL base de la API Gateway (sin slash final)
 *   Ejemplo: https://xxxxxxxx.execute-api.us-east-1.amazonaws.com/prod
 */

const API_URL = import.meta.env.VITE_PRODUCTS_API_URL || '';

/**
 * Retorna todos los productos con sus precios.
 * Requiere el token de admin en el header x-admin-token.
 * @param {string} adminToken
 * @returns {Promise<Array>}
 */
export async function getProductPrices(adminToken) {
  if (!API_URL) {
    throw new Error('VITE_PRODUCTS_API_URL no está configurado en el .env');
  }

  const response = await fetch(`${API_URL}/products/prices`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-token': adminToken,
    },
  });

  const raw = await response.text();

  if (response.status === 401) {
    throw new Error('Token de admin incorrecto');
  }
  if (!response.ok) {
    throw new Error(`Error al obtener precios: ${response.status} ${raw}`);
  }

  const data = JSON.parse(raw);
  if (!data.success) {
    throw new Error(data.error || 'Error desconocido en la API');
  }

  return data.data; // Array de productos con precios
}

/**
 * Actualiza el precio de un producto.
 * @param {string} adminToken
 * @param {string} productId
 * @param {number} basePrice
 * @param {Object} priceVariants  - { "variante": precio, ... }
 * @param {string} notes
 * @returns {Promise<Object>}
 */
export async function updateProductPrice(adminToken, productId, basePrice, priceVariants = {}, notes = '') {
  if (!API_URL) {
    throw new Error('VITE_PRODUCTS_API_URL no está configurado en el .env');
  }

  const response = await fetch(`${API_URL}/products/${productId}/price`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-token': adminToken,
    },
    body: JSON.stringify({ productId, basePrice, priceVariants, notes }),
  });

  const raw = await response.text();

  if (response.status === 401) {
    throw new Error('Token de admin incorrecto');
  }
  if (!response.ok) {
    throw new Error(`Error al actualizar precio: ${response.status} ${raw}`);
  }

  const data = JSON.parse(raw);
  if (!data.success) {
    throw new Error(data.error || 'Error desconocido en la API');
  }

  return data;
}

/**
 * Formatea un precio en CLP con separador de miles.
 * @param {number} price
 * @returns {string}  Ejemplo: "$9.990"
 */
export function formatPrice(price) {
  if (price === null || price === undefined) return 'Consultar';
  return `$${Number(price).toLocaleString('es-CL')}`;
}
