import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function scrape() {
  const url = 'https://boltamadurinn.is/collections/haukar';
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);

  const products = [];
  $('.grid__item').each((i, el) => {
    const name = $(el).find('.card__heading').text().trim();
    const price = $(el).find('.price-item--regular').text().trim() || $(el).find('.price-item--sale').text().trim();
    let imageUrl = $(el).find('img').attr('src');
    
    if (imageUrl && imageUrl.startsWith('//')) {
      imageUrl = 'https:' + imageUrl;
    }
    
    // Clean up price
    const cleanPrice = price.replace(/\s+/g, ' ').trim();

    if (name && cleanPrice) {
      products.push({
        id: i + 1,
        name,
        price: cleanPrice,
        image: imageUrl,
        isNew: name.toLowerCase().includes('2025')
      });
    }
  });

  console.log(JSON.stringify(products, null, 2));
}

scrape();
