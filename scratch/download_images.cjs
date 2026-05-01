const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

const srcDir = path.join(__dirname, '../src');
const publicImagesDir = path.join(__dirname, '../public/images/players');

// Ensure directory exists
if (!fs.existsSync(publicImagesDir)) {
    fs.mkdirSync(publicImagesDir, { recursive: true });
}

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

const files = getAllFiles(srcDir);
const urlRegex = /https:\/\/www\.haukar\.is\/wp-content\/uploads\/[^\'\"`\s]+\.(jpg|jpeg|png)/g;

let allUrls = new Set();
let fileReplacements = {}; // file path -> [{oldUrl, newUrl}]

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    let match;
    let localReplacements = [];
    while ((match = urlRegex.exec(content)) !== null) {
        const url = match[0];
        allUrls.add(url);
        
        const fileName = path.basename(url);
        const localUrl = `/images/players/${fileName}`;
        
        localReplacements.push({ oldUrl: url, newUrl: localUrl });
    }
    
    if (localReplacements.length > 0) {
        fileReplacements[file] = localReplacements;
    }
});

console.log(`Found ${allUrls.size} unique image URLs to download.`);

async function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(dest)) {
            resolve();
            return;
        }
        
        const file = fs.createWriteStream(dest);
        https.get(url, response => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', err => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
}

async function main() {
    for (const url of allUrls) {
        const fileName = path.basename(url);
        const dest = path.join(publicImagesDir, fileName);
        console.log(`Downloading ${fileName}...`);
        try {
            await downloadImage(url, dest);
        } catch (e) {
            console.error(e.message);
        }
    }
    
    console.log('Replacing URLs in files...');
    for (const [filePath, replacements] of Object.entries(fileReplacements)) {
        let content = fs.readFileSync(filePath, 'utf8');
        let replaced = false;
        for (const { oldUrl, newUrl } of replacements) {
            // Need to globally replace within the file
            const parts = content.split(oldUrl);
            if (parts.length > 1) {
                content = parts.join(newUrl);
                replaced = true;
            }
        }
        if (replaced) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${path.basename(filePath)}`);
        }
    }
    console.log('Done!');
}

main();
