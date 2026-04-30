import fs from 'fs';

const dataFile = 'src/data/fotboltiData.js';
let fotboltiData = fs.readFileSync(dataFile, 'utf-8');

const numberMap = {
    "Heiðar Máni": "77",
    "Heidar Máni": "77",
    "Bjarki Viðar": "3",
    "Bjarki Vidar": "3",
    "Markús Breki": "12",
    "Máni Mar": "6",
    "Tómas Atli": "17",
    "Daníel Smári": "21",
    "Hallur Húni": "25",
    "Andri Steinn": "15",
    "Ævar Daði": "5",
    "Aevar Dadi": "5",
    "Haukur Darri": "7",
    "Ísak Jónsson": "8",
    "Isak Jonsson": "8",
    "Alexander Aron": "20",
    "Baltasar Trausti": "80",
    "Óliver Steinar": "18",
    "Oliver Steinar": "18",
    "Magnús Ingi": "28",
    "Magnus Ingi": "28",
    "Óliver Thorkelsson": "99",
    "Oliver Thorkelsson": "99",
    "Óliver Þorkelsson": "99",
    "Kostyantyn Yaroshenko": "11",
    "Daði Snær": "10",
    "Dadi Snaer": "10",
    "Sigurður Hrannar": "9",
    "Sigurdur Hrannar": "9",
    "Guðmundur Axel": "24",
    "Gudmundur Axel": "24"
};

for (const [name, num] of Object.entries(numberMap)) {
    // We want to replace `number: "-"` or whatever number it has with `number: "X"` for the specific name.
    // It's easier to find the object block for the name, but a regex can do it:
    // Regex matches `{ number: "...", slug: "...", name: "Name ..."`
    
    // Actually, since we want to be safe, we can match name: "Daði Snær Ingason"
    const nameRegex = new RegExp(`(number:\\s*["'])([-\\d]*)(["'].*?name:\\s*["'][^"']*${name}[^"']*["'])`, 'i');
    
    if (nameRegex.test(fotboltiData)) {
        fotboltiData = fotboltiData.replace(nameRegex, `$1${num}$3`);
        console.log(`Updated number for ${name} to ${num}`);
    } else {
        // Try alternate match order if name comes before number
        const altRegex = new RegExp(`(name:\\s*["'][^"']*${name}[^"']*["'].*?number:\\s*["'])([-\\d]*)(["'])`, 'i');
        if (altRegex.test(fotboltiData)) {
            fotboltiData = fotboltiData.replace(altRegex, `$1${num}$3`);
            console.log(`Updated number for ${name} to ${num} (alt)`);
        }
    }
}

fs.writeFileSync(dataFile, fotboltiData);
console.log("Finished updating numbers.");
