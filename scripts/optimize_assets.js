import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDirectories = [
    { dir: path.join(__dirname, '../public/images/players'), urlPrefix: '/images/players/' },
    { dir: path.join(__dirname, '../public/images/news'), urlPrefix: '/images/news/' },
];
const srcDir = path.join(__dirname, '../src');

// Find all JS/JSX files
function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.js') || file.endsWith('.jsx')) {
          arrayOfFiles.push(path.join(dirPath, file));
      }
    }
  });

  return arrayOfFiles;
}

const jsFiles = getAllFiles(srcDir);

async function optimizeImages() {
    console.log('Scanning for new, unoptimized images...\n');
    
    let totalOriginalSize = 0;
    let totalNewSize = 0;
    let optimizedCount = 0;
    
    for (const target of targetDirectories) {
        if (!fs.existsSync(target.dir)) {
            console.log(`Directory ${target.dir} does not exist. Skipping...`);
            continue;
        }

        console.log(`\nScanning directory: ${target.dir}`);
        const files = fs.readdirSync(target.dir);
        
        for (const file of files) {
            // Only target raw formats, ignore already optimized webp/svg
            if (!file.match(/\.(jpg|jpeg|png)$/i)) continue;
            
            const originalPath = path.join(target.dir, file);
            const originalExt = path.extname(file);
            const baseName = path.basename(file, originalExt);
            const webpPath = path.join(target.dir, `${baseName}.webp`);
            
            const stat = fs.statSync(originalPath);
            totalOriginalSize += stat.size;
            
            console.log(`Optimizing: ${file}...`);
            
            // Convert to highly optimized WebP format with a max width of 1280px
            await sharp(originalPath)
                .resize({ width: 1280, withoutEnlargement: true })
                .webp({ quality: 85 })
                .toFile(webpPath);
                
            const newStat = fs.statSync(webpPath);
            totalNewSize += newStat.size;
            
            // Remove the heavy original file
            fs.unlinkSync(originalPath);
            optimizedCount++;
            
            // Auto-update all references in JS/JSX source code
            const oldUrl = `${target.urlPrefix}${file}`;
            const newUrl = `${target.urlPrefix}${baseName}.webp`;
            
            for (const jsFile of jsFiles) {
                let content = fs.readFileSync(jsFile, 'utf8');
                if (content.includes(oldUrl)) {
                    content = content.split(oldUrl).join(newUrl);
                    fs.writeFileSync(jsFile, content, 'utf8');
                    console.log(`  └─ Updated code reference in ${path.basename(jsFile)}`);
                }
            }
        }
    }
    
    if (optimizedCount > 0) {
        console.log(`\n✅ Optimization Complete!`);
        console.log(`Original Size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`New Size: ${(totalNewSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`Saved: ${((totalOriginalSize - totalNewSize) / 1024 / 1024).toFixed(2)} MB`);
    } else {
        console.log(`✨ All images are already optimized! No heavy .jpg or .png files found.`);
    }
}

optimizeImages().catch(console.error);
