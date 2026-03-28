---
description: Cómo hacer git push en el proyecto Sagason (Google Drive)
---

# Git Push en Sagason (Google Drive)

El proyecto vive dentro de Google Drive, lo que genera archivos `desktop.ini` que **bloquean el git push**. Seguir estos pasos siempre:

// turbo-all

## 1. Eliminar desktop.ini del tracking de git (si está trackeado)
```
git rm --cached desktop.ini 2>$null; git rm --cached -r --ignore-unmatch **/desktop.ini 2>$null
```

## 2. Eliminar el archivo físico si existe
```
Remove-Item -Force desktop.ini -ErrorAction SilentlyContinue
```

## 3. Hacer el commit y push
```
git add -A && git commit -m "<mensaje>" && git push
```

> **Nota:** `desktop.ini` ya está en `.gitignore`, así que en el futuro no debería re-aparecer. Si vuelve a aparecer, repetir pasos 1 y 2.
