"""
SAGASON SPA – Setup DynamoDB: sagason-products-prices
══════════════════════════════════════════════════════
Crea la tabla DynamoDB y carga los precios iniciales de todos los productos.

Uso:
  python scripts/setup-dynamodb-products.py

Requisitos:
  pip install boto3
  AWS CLI configurado (aws configure) con las credenciales correctas.

Variables de entorno opcionales:
  AWS_REGION   → Región AWS (default: us-east-1)
  TABLE_NAME   → Nombre de la tabla (default: sagason-products-prices)
"""

import boto3
import json
import time
import os
from decimal import Decimal
from datetime import datetime

# ─────────────────────────────────────────────────────────
#  Config
# ─────────────────────────────────────────────────────────
REGION     = os.environ.get("AWS_REGION", "us-east-1")
TABLE_NAME = os.environ.get("TABLE_NAME", "sagason-products-prices")

dynamodb = boto3.resource("dynamodb", region_name=REGION)
client   = boto3.client("dynamodb",   region_name=REGION)

# ─────────────────────────────────────────────────────────
#  Precios iniciales (en CLP – Pesos Chilenos)
#  Editar aquí los precios antes de ejecutar el script,
#  o actualizarlos después desde la interfaz /admin/precios
# ─────────────────────────────────────────────────────────
INITIAL_PRICES = [
    {
        "productId"    : "tazon-11oz",
        "productName"  : "Tazón Sublimado 11oz",
        "category"     : "TAZONES",
        "basePrice"    : 9990,
        "priceVariants": {"11oz": 9990, "15oz": 12990},
        "currency"     : "CLP",
        "notes"        : "Precio incluye diseño. Envío no incluido.",
        "isActive"     : True,
        "updatedAt"    : datetime.utcnow().isoformat(),
    },
    {
        "productId"    : "tazon-magico",
        "productName"  : "Tazón Mágico Sublimado",
        "category"     : "TAZONES",
        "basePrice"    : 14990,
        "priceVariants": {"11oz": 14990},
        "currency"     : "CLP",
        "notes"        : "Efecto termosensible. Solo 11oz disponible.",
        "isActive"     : True,
        "updatedAt"    : datetime.utcnow().isoformat(),
    },
    {
        "productId"    : "tumbler-20oz",
        "productName"  : "Tumbler Inox Sublimado",
        "category"     : "TUMBLERS",
        "basePrice"    : 19990,
        "priceVariants": {"20oz": 19990, "30oz": 24990},
        "currency"     : "CLP",
        "notes"        : "Incluye tapa. Precio por unidad.",
        "isActive"     : True,
        "updatedAt"    : datetime.utcnow().isoformat(),
    },
    {
        "productId"    : "mousepad-standard",
        "productName"  : "Mousepad Sublimado",
        "category"     : "MOUSEPAD",
        "basePrice"    : 9990,
        "priceVariants": {"21x21cm": 9990, "20x24cm": 11990, "40x45cm": 18990},
        "currency"     : "CLP",
        "notes"        : "Precio varía según tamaño.",
        "isActive"     : True,
        "updatedAt"    : datetime.utcnow().isoformat(),
    },
    {
        "productId"    : "cuadro-aluminio-hd",
        "productName"  : "Cuadro HD Aluminio",
        "category"     : "CUADRO_HD",
        "basePrice"    : 24990,
        "priceVariants": {
            "15x20cm": 24990,
            "20x30cm": 34990,
            "30x40cm": 49990,
            "40x60cm": 74990,
        },
        "currency"     : "CLP",
        "notes"        : "Incluye sistema de colgado. Precio por unidad.",
        "isActive"     : True,
        "updatedAt"    : datetime.utcnow().isoformat(),
    },
    {
        "productId"    : "posavasos-set4",
        "productName"  : "Set Posavasos Sublimados (x4)",
        "category"     : "POSAVASOS",
        "basePrice"    : 14990,
        "priceVariants": {
            "MDF redondo Ø9cm x4": 14990,
            "MDF cuadrado 9x9cm x4": 14990,
            "Cerámica Ø10cm x4": 19990,
        },
        "currency"     : "CLP",
        "notes"        : "Precio por set de 4 unidades.",
        "isActive"     : True,
        "updatedAt"    : datetime.utcnow().isoformat(),
    },
    {
        "productId"    : "bolsa-tote",
        "productName"  : "Bolsa Tote Sublimada",
        "category"     : "BOLSAS",
        "basePrice"    : 14990,
        "priceVariants": {"38x42cm": 14990, "40x50cm": 17990},
        "currency"     : "CLP",
        "notes"        : "Precio por unidad. Diseño full-color.",
        "isActive"     : True,
        "updatedAt"    : datetime.utcnow().isoformat(),
    },
    {
        "productId"    : "puzzle-110",
        "productName"  : "Rompecabezas Sublimado",
        "category"     : "PUZZLES",
        "basePrice"    : 16990,
        "priceVariants": {"110 piezas": 16990, "252 piezas": 22990},
        "currency"     : "CLP",
        "notes"        : "Incluye caja personalizada.",
        "isActive"     : True,
        "updatedAt"    : datetime.utcnow().isoformat(),
    },
    {
        "productId"    : "azulejo-10x10",
        "productName"  : "Azulejo / Plancha Sublimada",
        "category"     : "AZULEJOS",
        "basePrice"    : 7990,
        "priceVariants": {"10x10cm": 7990, "15x15cm": 11990, "20x20cm": 16990},
        "currency"     : "CLP",
        "notes"        : "Con o sin base de corcho. Consultar.",
        "isActive"     : True,
        "updatedAt"    : datetime.utcnow().isoformat(),
    },
    {
        "productId"    : "botella-aluminio-750",
        "productName"  : "Botella Aluminio Sublimada",
        "category"     : "BOTELLAS",
        "basePrice"    : 17990,
        "priceVariants": {"500ml": 14990, "750ml": 17990},
        "currency"     : "CLP",
        "notes"        : "Incluye tapa rosca.",
        "isActive"     : True,
        "updatedAt"    : datetime.utcnow().isoformat(),
    },
    {
        "productId"    : "llavero-sublimado",
        "productName"  : "Llavero Sublimado Personalizado",
        "category"     : "LLAVEROS",
        "basePrice"    : 4990,
        "priceVariants": {
            "MDF redondo": 4990,
            "MDF rectangular": 4990,
            "Acrílico": 6990,
            "Aluminio": 8990,
        },
        "currency"     : "CLP",
        "notes"        : "Impresión doble cara +$1.000.",
        "isActive"     : True,
        "updatedAt"    : datetime.utcnow().isoformat(),
    },
    {
        "productId"    : "id-mascota",
        "productName"  : "Placa ID Mascotas",
        "category"     : "ID_MASCOTAS",
        "basePrice"    : 7990,
        "priceVariants": {
            "Hueso acero (grabado láser)": 7990,
            "Redondo aluminio (grabado)": 6990,
            "Rectangular con foto": 9990,
        },
        "currency"     : "CLP",
        "notes"        : "Grabado láser ambas caras incluido.",
        "isActive"     : True,
        "updatedAt"    : datetime.utcnow().isoformat(),
    },
    {
        "productId"    : "id-salud",
        "productName"  : "Placa ID Salud / Emergencia",
        "category"     : "ID_SALUD",
        "basePrice"    : 14990,
        "priceVariants": {
            "Con pulsera ajustable": 14990,
            "Con cadena": 13990,
            "Solo placa": 9990,
        },
        "currency"     : "CLP",
        "notes"        : "Acero 316L hipoalergénico. Grabado profundo permanente.",
        "isActive"     : True,
        "updatedAt"    : datetime.utcnow().isoformat(),
    },
]


# ─────────────────────────────────────────────────────────
#  Funciones
# ─────────────────────────────────────────────────────────

def table_exists(name):
    try:
        client.describe_table(TableName=name)
        return True
    except client.exceptions.ResourceNotFoundException:
        return False


def create_table():
    print(f"Creando tabla '{TABLE_NAME}'...")
    table = dynamodb.create_table(
        TableName=TABLE_NAME,
        KeySchema=[
            {"AttributeName": "productId", "KeyType": "HASH"},
        ],
        AttributeDefinitions=[
            {"AttributeName": "productId", "AttributeType": "S"},
        ],
        BillingMode="PAY_PER_REQUEST",
        Tags=[
            {"Key": "Project", "Value": "SAGASON SPA"},
            {"Key": "Environment", "Value": "production"},
        ],
    )
    # Esperar a que la tabla esté activa
    print("  Esperando que la tabla esté activa...", end="")
    while True:
        desc = client.describe_table(TableName=TABLE_NAME)
        status = desc["Table"]["TableStatus"]
        if status == "ACTIVE":
            print(" ✓")
            break
        print(".", end="", flush=True)
        time.sleep(2)
    return table


def seed_prices(table):
    print(f"\nCargando {len(INITIAL_PRICES)} productos en DynamoDB...")
    with table.batch_writer() as batch:
        for item in INITIAL_PRICES:
            # Convertir floats a Decimal para DynamoDB
            item_decimal = json.loads(
                json.dumps(item),
                parse_float=Decimal
            )
            batch.put_item(Item=item_decimal)
            print(f"  ✓ {item['productId']:30s} → ${item['basePrice']:,} CLP")
    print("\n✅ Todos los productos cargados correctamente.")


def print_summary():
    print("\n" + "═" * 60)
    print("  SAGASON SPA – DynamoDB Setup Completado")
    print("═" * 60)
    print(f"  Tabla:  {TABLE_NAME}")
    print(f"  Región: {REGION}")
    print(f"  Items:  {len(INITIAL_PRICES)} productos")
    print("═" * 60)
    print("\n  Próximos pasos:")
    print("  1. Configura la variable de entorno ADMIN_TOKEN en tu Lambda.")
    print("  2. Agrega VITE_PRODUCTS_API_URL al .env del sitio web.")
    print("  3. Accede a /admin/precios en el sitio para gestionar precios.")
    print()


# ─────────────────────────────────────────────────────────
#  Main
# ─────────────────────────────────────────────────────────
if __name__ == "__main__":
    print("═" * 60)
    print("  SAGASON SPA – Setup DynamoDB Productos")
    print("═" * 60)
    print(f"  Región: {REGION}")
    print(f"  Tabla:  {TABLE_NAME}\n")

    if table_exists(TABLE_NAME):
        print(f"⚠️  La tabla '{TABLE_NAME}' ya existe.")
        answer = input("   ¿Deseas recargar los precios iniciales? (s/N): ").strip().lower()
        if answer != "s":
            print("Operación cancelada.")
            exit(0)
        table = dynamodb.Table(TABLE_NAME)
    else:
        table = create_table()

    seed_prices(table)
    print_summary()
