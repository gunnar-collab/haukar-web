import json
import urllib.request
import re
from datetime import datetime

url = "https://www.abler.io/shop/haukar/leikjaskoli?program=Q2x1YlNlcnZpY2U6NTIyMTE="

# Load existing JSON
with open('src/data/haukar_youth_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        
        # Extract title
        title_match = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE)
        title = title_match.group(1) if title_match else "Leikjaskóli Hauka"
        
        # Clean title
        clean_title = title.replace('Leikjaskóli | ', '').replace(' | Shop | Abler', '').strip()
        
        # Find highest prog ID to increment
        prog_ids = [int(m['id'].split('_')[1]) for m in data['matches'] if str(m['id']).startswith('prog_')]
        next_id = max(prog_ids) + 1 if prog_ids else 0

        # Append
        data['matches'].append({
            "id": f"prog_{next_id}",
            "date": "2026-06-01T10:00:00",
            "home": "Haukar",
            "away": "Leikjaskóli",
            "sport": "Félagið",
            "category": "Félagið",
            "ageGroup": "Námskeið",
            "competition": clean_title,
            "venue": "Ásvellir",
            "ablerLink": url
        })
        
        print(f"Scraped: {clean_title}")
except Exception as e:
    print(f"Failed to fetch {url}: {e}")

# Save back to JSON
with open('src/data/haukar_youth_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Successfully added Leikjaskóli to haukar_youth_data.json!")
