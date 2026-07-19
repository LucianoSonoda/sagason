const fs = require('fs');
const path = require('path');

const dir = 'f:/Proyectos/SAGASON SPA/SitioWeb/sagason/src/pages';

// Fix Impresion3D.jsx
let impPath = path.join(dir, 'Impresion3D.jsx');
if (fs.existsSync(impPath)) {
    let content = fs.readFileSync(impPath, 'utf8');
    content = content.replace(/const \[setIsSubmitting\] = useState\(false\);\n?/, '');
    content = content.replace(/const \[isSubmitting, setIsSubmitting\] = useState\(false\);\n?/, '');
    content = content.replace(/setIsSubmitting\(true\);\n?/, '');
    fs.writeFileSync(impPath, content);
}

// Fix RegalosCorporativos.jsx
let regPath = path.join(dir, 'RegalosCorporativos.jsx');
if (fs.existsSync(regPath)) {
    let content = fs.readFileSync(regPath, 'utf8');
    content = content.replace(/import \{ useCart \} from '\.\.\/context\/CartContext';\n?/, '');
    fs.writeFileSync(regPath, content);
}

// Fix Rompecabezas.jsx
let romPath = path.join(dir, 'Rompecabezas.jsx');
if (fs.existsSync(romPath)) {
    let content = fs.readFileSync(romPath, 'utf8');
    content = content.replace(/import \{ compressImage \} from '\.\.\/utils\/imageCompressor';\n?/, '');
    content = content.replace(/const \[fileDataUrl, setFileDataUrl\] = useState\(null\);\n?/, '');
    fs.writeFileSync(romPath, content);
}

// Fix Tazones.jsx
let tazPath = path.join(dir, 'Tazones.jsx');
if (fs.existsSync(tazPath)) {
    let content = fs.readFileSync(tazPath, 'utf8');
    content = content.replace(/import \{ compressImage \} from '\.\.\/utils\/imageCompressor';\n?/, '');
    content = content.replace(/const \[fileDataUrl, setFileDataUrl\] = useState\(null\);\n?/, '');
    fs.writeFileSync(tazPath, content);
}

console.log('Fixed linting errors');
