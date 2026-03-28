---
description: Cómo hacer deploy del proyecto Sagason (Google Drive + GitHub Pages)
---

# Deploy de Sagason

## Flujo Normal (GitHub Actions activo)

Desde que se configuró GitHub Actions, el deploy es completamente automático.
Solo necesitas hacer push a `main` y GitHub se encarga del build y deploy.

// turbo-all

## 1. Hacer commit y push a main
```
git add -A && git commit -m "<mensaje>" && git push
```

GitHub Actions hará automáticamente:
- `npm install`
- `npm run build`
- Deploy del `dist/` a la rama `gh-pages`

El sitio en `sagason.cl` se actualiza en ~2 minutos.

---

## ⚠️ Si vuelve a aparecer `desktop.ini`

El archivo `desktop.ini` ya está en `.gitignore`, pero Google Drive puede regenerarlo.
Si aparece y bloquea el push:

```
# Eliminar del tracking y del disco
git rm --cached desktop.ini 2>$null
Remove-Item -Force desktop.ini -ErrorAction SilentlyContinue
git add -A && git commit -m "chore: remove desktop.ini" && git push
```

---

## ⚠️ Si GitHub Actions falla (fallback manual)

Si por alguna razón Actions falla, puedes hacer el deploy manualmente:

```
# 1. Build
npm run build

# 2. Clonar gh-pages en carpeta temporal
git clone --branch gh-pages --single-branch https://github.com/lucianosonoda/sagason.git .gh-pages-tmp

# 3. Copiar dist y pushear
Remove-Item .gh-pages-tmp\* -Recurse -Force -Exclude ".git"
Copy-Item dist\* .gh-pages-tmp -Recurse -Force
cd .gh-pages-tmp
git add -A && git commit -m "deploy manual" && git push
cd ..
Remove-Item .gh-pages-tmp -Recurse -Force
```

> **NOTA:** `npm run deploy` despliega a Cloudflare Workers, NO a sagason.cl.
> `sagason.cl` siempre usa GitHub Pages (rama `gh-pages`).
