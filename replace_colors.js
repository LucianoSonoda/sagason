import fs from 'fs';
import path from 'path';

const dir = './src';

function replaceInDir(dirPath) {
    const files = fs.readdirSync(dirPath);
    for (let file of files) {
        let fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInDir(fullPath);
        } else if (fullPath.endsWith('.css') || fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;

            // Replace hex codes (Gold -> Elegant Blue)
            content = content.replace(/#D4AF37/gi, '#1D4ED8');
            content = content.replace(/#AA8417/gi, '#1E3A8A');

            // Replace rgb values used in rgba(...)
            content = content.replace(/212,\s*175,\s*55/g, '29, 78, 216');

            if (content !== original) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated file: ${fullPath}`);
            }
        }
    }
}

replaceInDir(dir);
console.log('Colors replaced successfully!');
