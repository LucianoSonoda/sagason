import re

filepath = r"F:\Proyectos\SAGASON SPA\SitioWeb\sagason\public\dashboard.html"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update loadAdminPrecios fetch logic
pattern1_start = content.find("const res = await authFetch(`${API}/prices`);")
pattern1_end = content.find("} catch (_) {}", pattern1_start)
if pattern1_start != -1 and pattern1_end != -1:
    new_fetch = """const res = await fetch('http://localhost:5000/api/prices');
            if (res.ok) {
                const data = await res.json();
                for (const key of Object.keys(data)) {
                    dynamoPrecios[key] = {
                        desde: data[key].basePrice || 0,
                        nota: 'Fijado desde ERP',
                        sku: '',
                        label: key,
                        category: '',
                        active: true,
                        shippingSize: '',
                        cajaCustom: 0
                    };
                }
            }
        """
    content = content[:pattern1_start] + new_fetch + content[pattern1_end:]

# 2. Update saveSinglePrecio
pattern2 = r"async function saveSinglePrecio\(id\) \{[\s\S]*?finally \{[\s\S]*?btn\.disabled = false;[\s\S]*?\}[\s\S]*?\}"
new_save_single = """async function saveSinglePrecio(id) {
        alert("¡Aviso! Los precios ahora se calculan automáticamente desde el ERP (con 100% de lucro). Debes modificar los costos de insumos y recetas en el ERP.");
    }"""
content = re.sub(pattern2, new_save_single, content, count=1)

# 3. Update savePrecios
pattern3 = r"async function savePrecios\(\) \{[\s\S]*?finally \{[\s\S]*?btn\.disabled = false;[\s\S]*?\}[\s\S]*?\}"
new_save_all = """async function savePrecios() {
        alert("¡Aviso! Los precios ahora se calculan automáticamente desde el ERP. Dirígete al ERP para hacer cambios.");
    }"""
content = re.sub(pattern3, new_save_all, content, count=1)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Patched successfully")
