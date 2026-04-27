import json

match_id = "7350245"
lineup_haukar = {
    "starting": [
        {"number": 1, "name": "Sveinn Óli Guðnason (M)"},
        {"number": 4, "name": "Máni Mar Steinbjörnsson"},
        {"number": 6, "name": "Óliver Steinar Guðmundsson"},
        {"number": 8, "name": "Ísak Jónsson"},
        {"number": 9, "name": "Sigurður Hrannar Þorsteinsson"},
        {"number": 10, "name": "Daði Snær Ingason"},
        {"number": 11, "name": "Jón Gísli Stefánsson"},
        {"number": 18, "name": "Einar Karl Ingvarsson"},
        {"number": 23, "name": "Pablo Oshan Punyed Dubon"},
        {"number": 25, "name": "Hallur Húni Þorsteinsson"},
        {"number": 82, "name": "Markús Breki Steinsson"}
    ],
    "bench": [
        {"number": 77, "name": "Franz Sigurjónsson (M)"},
        {"number": 2, "name": "Andri Steinn Ingvarsson"},
        {"number": 3, "name": "Kári Vilberg Atlason"},
        {"number": 12, "name": "Gabriel Aron Sævarsson"},
        {"number": 15, "name": "Ævar Daði Segatta"},
        {"number": 19, "name": "Ólafur Darri Sigurjónsson"},
        {"number": 99, "name": "Óliver Þorkelsson"}
    ],
    "coach": "Guðjón Pétur Lýðsson"
}

lineup_opponent = {
    "name": "Víkingur Ó.",
    "starting": [
        {"number": 1, "name": "Jón Kristinn Elíasson (M)"},
        {"number": 2, "name": "Gabriel Þór Þórðarson"},
        {"number": 3, "name": "Benjamin Mehic"},
        {"number": 4, "name": "Daði Kárason"},
        {"number": 7, "name": "Asmer Begic"},
        {"number": 8, "name": "Kristófer Áki Hlinason"},
        {"number": 10, "name": "Ingvar Freyr Þorsteinsson"},
        {"number": 11, "name": "Naim Aaras EL Hmaidi"},
        {"number": 23, "name": "Björn Henry Kristjánsson"},
        {"number": 26, "name": "Ismael Salmi Yagoub"},
        {"number": 77, "name": "Kolbeinn Tumi Sveinsson"}
    ],
    "bench": [
        {"number": 12, "name": "Kristall Blær Barkarson (M)"},
        {"number": 9, "name": "Allyson Fernando Santos Da Silva"},
        {"number": 14, "name": "Brynjar Óttar Jóhannsson"},
        {"number": 16, "name": "Maxymilian Alex Bochra"},
        {"number": 18, "name": "Leó Örn Þrastarson"},
        {"number": 21, "name": "Jón Björgvin Jónsson"},
        {"number": 25, "name": "Ellert Gauti Heiðarsson"}
    ],
    "coach": "Tomasz Luba"
}

file_path = '/home/ylmur/Agency_OS_2026/03_IT_and_Infrastructure/haukar-web/src/data/match_reports.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

if match_id in data:
    data[match_id]["lineup"] = lineup_haukar
    data[match_id]["opponentLineup"] = lineup_opponent

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Successfully updated lineups for match {match_id}")
