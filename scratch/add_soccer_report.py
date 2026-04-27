import json
import os

match_id = "7350245"
events = [
    { "time": "23'", "score": "0-0", "text": "Gult spjald: Naim Aaras EL Hmaidi (Víkingur Ó.)" },
    { "time": "27'", "score": "0-0", "text": "Gult spjald: Kristófer Áki Hlinason (Víkingur Ó.)" },
    { "time": "37'", "score": "0-0", "text": "Gult spjald: Hallur Húni Þorsteinsson (Haukar)" },
    { "time": "45'+", "score": "0-0", "text": "Gult spjald: Daði Kárason (Víkingur Ó.)" },
    { "time": "46'", "score": "0-0", "text": "Skipting: Ellert Gauti Heiðarsson (Inn) / Ismael Salmi Yagoub (Út) (Víkingur Ó.)" },
    { "time": "60'", "score": "0-0", "text": "Gult spjald: Pablo Oshan Punyed Dubon (Haukar)" },
    { "time": "63'", "score": "0-0", "text": "Skipting: Ólafur Darri Sigurjónsson (Inn) / Einar Karl Ingvarsson (Út) (Haukar)" },
    { "time": "63'", "score": "0-0", "text": "Skipting: Óliver Þorkelsson (Inn) / Jón Gísli Stefánsson (Út) (Haukar)" },
    { "time": "70'", "score": "0-0", "text": "Skipting: Allyson Fernando Santos Da Silva (Inn) / Asmer Begic (Út) (Víkingur Ó.)" },
    { "time": "70'", "score": "0-0", "text": "Gult spjald: Ísak Jónsson (Haukar)" },
    { "time": "73'", "score": "0-0", "text": "Skipting: Gabríel Aron Sævarsson (Inn) / Sigurður Hrannar Þorsteinsson (Út) (Haukar)" },
    { "time": "73'", "score": "0-0", "text": "Skipting: Kári Vilberg Atlason (Inn) / Ísak Jónsson (Út) (Haukar)" },
    { "time": "76'", "score": "0-0", "text": "Gult spjald: Máni Mar Steinbjörnsson (Haukar)" },
    { "time": "80'", "score": "0-0", "text": "Skipting: Ævar Daði Segatta (Inn) / Óliver Steinar Guðmundsson (Út) (Haukar)" },
    { "time": "84'", "score": "0-0", "text": "Gult spjald: Björn Henry Kristjánsson (Víkingur Ó.)" },
    { "time": "90'", "score": "0-0", "text": "Skipting: Jón Björgvin Jónsson (Inn) / Naim Aaras EL Hmaidi (Út) (Víkingur Ó.)" },
    { "time": "PSO", "score": "0-0", "text": "Víkingur Ó: Ingvar Freyr Þorsteinsson — MISSED (0-0)" },
    { "time": "PSO", "score": "0-1", "text": "Haukar: Daði Snær Ingason — SCORED (0-1)" },
    { "time": "PSO", "score": "0-1", "text": "Víkingur Ó: Kolbeinn Tumi Sveinsson — MISSED (0-1)" },
    { "time": "PSO", "score": "0-2", "text": "Haukar: Máni Mar Steinbjörnsson — SCORED (0-2)" },
    { "time": "PSO", "score": "1-2", "text": "Víkingur Ó: Benjamín Mehic — SCORED (1-2)" },
    { "time": "PSO", "score": "1-3", "text": "Haukar: Ævar Daði Segatta — SCORED (1-3)" },
    { "time": "PSO", "score": "2-3", "text": "Víkingur Ó: Daði Kárason — SCORED (2-3)" },
    { "time": "PSO", "score": "2-3", "text": "Haukar: Ólafur Darri Sigurjónsson — MISSED (2-3)" },
    { "time": "PSO", "score": "2-4", "text": "Haukar: Gabríel Aron Sævarsson — SCORED (2-4)" }
]

file_path = '/home/ylmur/Agency_OS_2026/03_IT_and_Infrastructure/haukar-web/src/data/match_reports.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

data[match_id] = {
    "id": match_id,
    "events": events
}

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Successfully added match report {match_id}")
