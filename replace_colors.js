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

            // Replace hex codes
            content = content.replace(/#E7AC23/gi, '#D4AF37');
            content = content.replace(/#b58514/gi, '#AA8417');

            // Replace rgb values used in rgba(...)
            content = content.replace(/231,\s*172,\s*35/g, '212, 175, 55');

            if (content !== original) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated file: ${fullPath}`);
            }
        }
    }
}

replaceInDir(dir);
console.log('Colors replaced successfully!');
