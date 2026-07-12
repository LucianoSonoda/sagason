import os
import glob

for f in glob.glob('src/pages/*.jsx'):
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Reemplazar background negro semitransparente por blanco tenue para más contraste
    content = content.replace("background: 'rgba(0,0,0,0.5)'", "background: 'rgba(255,255,255,0.08)'")
    
    # Hacer el borde un poco más visible también (blanco al 20%)
    content = content.replace("border: '1px solid var(--border)'", "border: '1px solid rgba(255,255,255,0.2)'")
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
        
print("Contrast fixed!")
