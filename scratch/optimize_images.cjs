const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicImagesDir = path.join(__dirname, '../public/images/players');
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
    const files = fs.readdirSync(publicImagesDir);
    let totalOriginalSize = 0;
    let totalNewSize = 0;
    
    for (const file of files) {
        if (!file.match(/\.(jpg|jpeg|png)$/i)) continue;
        
        const originalPath = path.join(publicImagesDir, file);
        const originalExt = path.extname(file);
        const baseName = path.basename(file, originalExt);
        const webpPath = path.join(publicImagesDir, `${baseName}.webp`);
        
        const stat = fs.statSync(originalPath);
        totalOriginalSize += stat.size;
        
        console.log(`Optimizing ${file}...`);
        
        await sharp(originalPath)
            .resize(800) // Max width 800px (plenty for cards)
            .webp({ quality: 80 })
            .toFile(webpPath);
            
        const newStat = fs.statSync(webpPath);
        totalNewSize += newStat.size;
        
        // Remove original file
        fs.unlinkSync(originalPath);
        
        // Update all references in JS files
        const oldUrl = `/images/players/${file}`;
        const newUrl = `/images/players/${baseName}.webp`;
        
        for (const jsFile of jsFiles) {
            let content = fs.readFileSync(jsFile, 'utf8');
            if (content.includes(oldUrl)) {
                content = content.split(oldUrl).join(newUrl);
                fs.writeFileSync(jsFile, content, 'utf8');
            }
        }
    }
    
    console.log(`\nOptimization Complete!`);
    console.log(`Original Size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`New Size: ${(totalNewSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Saved: ${((totalOriginalSize - totalNewSize) / 1024 / 1024).toFixed(2)} MB`);
}

optimizeImages().catch(console.error);
