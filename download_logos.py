import requests
import json
import os
import re

teams = {
    'FH': 'Fimleikafélag_Hafnarfjarðar',
    'Valur': 'Valur_(club)',
    'IBV': 'Íþróttabandalag_Vestmannaeyja',
    'Fram': 'Knattspyrnufélagið_Fram',
    'Stjarnan': 'Stjarnan',
    'Afturelding': 'Ungmennafélagið_Afturelding',
    'Vikingur R.': 'Knattspyrnufélagið_Víkingur',
    'Vikingur O.': 'Ungmennafélagið_Víkingur',
    'Grotta': 'Íþróttafélagið_Grótta',
    'HK': 'Handknattleiksfélag_Kópavogs',
    'Selfoss': 'Kneattspyrnufélag_Árborgar',
    'Keflavik': 'Keflavík_ÍF'
}

headers = {'User-Agent': 'HaukarWebScraper/1.0 (test@test.com)'}

for team_name, wiki_title in teams.items():
    url = f"https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles={wiki_title}"
    try:
        resp = requests.get(url, headers=headers).json()
        pages = resp['query']['pages']
        for page_id in pages:
            if 'original' in pages[page_id]:
                img_url = pages[page_id]['original']['source']
                print(f"Found {team_name}: {img_url}")
                safe_name = re.sub(r'[^a-z0-9]', '', team_name.lower())
                ext = img_url.split('.')[-1].lower()
                img_data = requests.get(img_url, headers=headers).content
                with open(f"public/images/teams/{safe_name}.{ext}", 'wb') as f:
                    f.write(img_data)
            else:
                print(f"No image found for {team_name}")
    except Exception as e:
        print(f"Error on {team_name}: {e}")

