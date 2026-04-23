const fs = require('fs');

const basketballItems = [
  {
    "name": "Haukar - Körfubolti - Keppnistreyja",
    "price": "8.990kr.",
    "image": "https://shop.errea.is/image/cache/catalog/Félagslið/Haukar/Körfubolti/haukar-karfa-home-shirt-22-1000x1000.png",
    "url": "http://shop.errea.is/korfubolti-haukar?product_id=182"
  },
  {
    "name": "Haukar - Körfubolti - Keppnisstuttbuxur",
    "price": "4.490kr.",
    "image": "https://shop.errea.is/image/cache/catalog/Félagslið/Haukar/Körfubolti/D825000002-1000x1000.jpg",
    "url": "http://shop.errea.is/korfubolti-haukar?product_id=183"
  },
  {
    "name": "Haukar - Körfubolti - Æfingastuttbuxur - Viðsnúanlegar",
    "price": "6.490kr.",
    "image": "https://shop.errea.is/image/cache/catalog/Félagslið/Haukar/Körfubolti/DP0C0Z00500-1000x1000.jpg",
    "url": "http://shop.errea.is/korfubolti-haukar?product_id=331"
  },
  {
    "name": "Haukar - Körfubolti - Æfingatreyja - Viðsnúanleg",
    "price": "6.490kr.",
    "image": "https://shop.errea.is/image/cache/catalog/Félagslið/Haukar/Körfubolti/DM0Q0Z00500-1000x1000.jpg",
    "url": "http://shop.errea.is/korfubolti-haukar?product_id=330"
  },
  {
    "name": "Haukar - Körfubolti - Stuðningsmannabolur",
    "price": "5.990kr.",
    "image": "https://shop.errea.is/image/cache/catalog/Félagslið/Haukar/Körfubolti/haukar_everton-1000x1000.png",
    "url": "http://shop.errea.is/korfubolti-haukar/haukar-stud"
  }
];

const currentFile = fs.readFileSync('/home/ylmur/Agency_OS_2026/03_IT_and_Infrastructure/haukar-web/src/data/merchandise.js', 'utf8');
const match = currentFile.match(/export const merchandise = (\[[\s\S]*\]);/);
if (!match) {
  console.error("Could not find merchandise array");
  process.exit(1);
}

const currentData = JSON.parse(match[1]);

// Add basketball items to the front
const newBasketball = basketballItems.map((p, idx) => ({
  id: 200 + idx, // Unique IDs for basketball
  ...p,
  isNew: true,
  shopName: "Errea"
}));

const updatedData = [...newBasketball, ...currentData];

const newContent = `export const merchandise = ${JSON.stringify(updatedData, null, 2)};`;
fs.writeFileSync('/home/ylmur/Agency_OS_2026/03_IT_and_Infrastructure/haukar-web/src/data/merchandise.js', newContent);
