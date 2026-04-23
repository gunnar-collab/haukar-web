const fs = require('fs');

const erreaData = [
  {
    "name": "Haukar - Keppnistreyja - 2025/2027",
    "price": "9.990kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/2025/HAUKAR_HOME25-1000x1000.png",
    "url": "http://shop.errea.is/haukar/haukar-2025-home?limit=100"
  },
  {
    "name": "Haukar - Varakeppnistreyja - 2024/2026",
    "price": "5.844kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/F%C3%B3tbolti/2023/Haukar2nd-1000x1000.png",
    "url": "http://shop.errea.is/haukar?product_id=919&limit=100"
  },
  {
    "name": "Haukar - Innanundirpeysa - Daris",
    "price": "6.990kr.",
    "image": "https://shop.errea.is/image/cache/catalog/V%C3%B6rur/Innanundirfatna%C3%B0ur/Daris/FM0B0L00020%20copy-1000x1000.jpg",
    "url": "http://shop.errea.is/haukar?product_id=311&limit=100"
  },
  {
    "name": "Haukar - Markvörður - 2025/2027",
    "price": "9.990kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/2025/HAUKAR_GK25-1000x1000.png",
    "url": "http://shop.errea.is/haukar?product_id=1187&limit=100"
  },
  {
    "name": "Haukar - Keppnisstuttbuxur - Barney - Rauðar/Hvítar",
    "price": "3.990kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/F%C3%B3tbolti/2024/haukar_homeShorts_barney-1000x1000.png",
    "url": "http://shop.errea.is/haukar/haukar-stuttbuxur-2025-home?limit=100"
  },
  {
    "name": "Haukar - Knattspyrna - Varakeppnisstuttbuxur - Hvítar",
    "price": "3.990kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/F%C3%B3tbolti/2023/GP0B0Z00010-1000x1000.jpg",
    "url": "http://shop.errea.is/haukar?product_id=141&limit=100"
  },
  {
    "name": "Haukar - Innanundirbuxur stuttar - Dawe",
    "price": "5.490kr.",
    "image": "https://shop.errea.is/image/cache/catalog/V%C3%B6rur/Innanundirfatna%C3%B0ur/Dawe/FP0B0Z00020%20copy-1000x1000.jpg",
    "url": "http://shop.errea.is/haukar?product_id=752&limit=100"
  },
  {
    "name": "Haukar - Knattspyrna - Stuttbuxur - Svartar",
    "price": "3.990kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/F%C3%B3tbolti/2023/GP0B0Z00120-1000x1000.jpg",
    "url": "http://shop.errea.is/haukar?product_id=459&limit=100"
  },
  {
    "name": "Haukar - Hettupeysa - Jonas - Dökkblá - HAUKAR stórt",
    "price": "8.990kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/F%C3%B3tbolti/2024/haukar_jonas_navy_hAukar-1000x1000.png",
    "url": "http://shop.errea.is/haukar?product_id=1144&limit=100"
  },
  {
    "name": "Haukar - Hettupeysa - Jonas - Rauð - HAUKAR Stórt",
    "price": "8.990kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/F%C3%B3tbolti/2024/haukar_jonas_hAukar_red-1000x1000.png",
    "url": "http://shop.errea.is/haukar?product_id=1143&limit=100"
  },
  {
    "name": "NÝTT - Haukar - Æfingabuxur - MYRON - Svartar",
    "price": "8.490kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/2025/HP0A0Z00120_haukar_black-1000x1000.png",
    "url": "http://shop.errea.is/haukar?product_id=1214&limit=100"
  },
  {
    "name": "Haukar - Hettupeysa - Warren - Dökkblá - HAUKAR stórt",
    "price": "9.990kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/F%C3%B3tbolti/2024/haukar_Stort_warren_navy-1000x1000.png",
    "url": "http://shop.errea.is/haukar?product_id=1191&limit=100"
  },
  {
    "name": "Haukar - Hettupeysa - Warren - Rauð - HAUKAR stórt",
    "price": "9.990kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/F%C3%B3tbolti/2024/haukar_Stort_warren_raud2-1000x1000.png",
    "url": "http://shop.errea.is/haukar?product_id=1192&limit=100"
  },
  {
    "name": "Haukar - Vindjakki",
    "price": "5.990kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/F%C3%B3tbolti/2023/pressingGJ0A0Z00020_2-1000x1000.png",
    "url": "http://shop.errea.is/haukar?product_id=829&limit=100"
  },
  {
    "name": "Haukar - Knattspyrna - Keppnissokkar - Rauðir",
    "price": "2.290kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/F%C3%B3tbolti/A41000020-1000x1000.jpg",
    "url": "http://shop.errea.is/haukar?product_id=123&limit=100"
  },
  {
    "name": "Haukar - Legghlífar",
    "price": "5.990kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Fram/2025/haukar_legghlifar-1000x1000.png",
    "url": "http://shop.errea.is/haukar/hauka-legghlifar?limit=100"
  },
  {
    "name": "NÝTT - Haukar - Hettupeysa - Rennd - Eber - Rauð",
    "price": "14.990kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/2025/haukar_eber-1000x1000.png",
    "url": "http://shop.errea.is/haukar?product_id=1230&limit=100"
  },
  {
    "name": "NÝTT - Haukar - Æfingabolur - Evan - Rauður",
    "price": "7.490kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/2025/haukar_evan_omerkt-1000x1000.png",
    "url": "http://shop.errea.is/haukar?product_id=1213&limit=100"
  },
  {
    "name": "NÝTT - Haukar - Æfingapeysa - Elias - Rauður",
    "price": "8.490kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/2025/haukar_elias_omerkt-1000x1000.png",
    "url": "http://shop.errea.is/haukar?product_id=1209&limit=100"
  },
  {
    "name": "Haukar - Knattspyrna - Varakeppnissokkar - Hvítir",
    "price": "2.290kr.",
    "image": "https://shop.errea.is/image/cache/catalog/V%C3%B6rur/Sokkar/A41000010-1000x1000.jpg",
    "url": "http://shop.errea.is/haukar?product_id=142&limit=100"
  },
  {
    "name": "Haukar - Knattspyrna - Markmannssokkar - Svartir",
    "price": "2.290kr.",
    "image": "https://shop.errea.is/image/cache/catalog/V%C3%B6rur/Sokkar/A41000120-1000x1000.jpg",
    "url": "http://shop.errea.is/haukar?product_id=387&limit=100"
  },
  {
    "name": "Haukar - Æfingabolur - Marvin - Rauður",
    "price": "4.490kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/F%C3%B3tbolti/2024/haukar_marvin_red-1000x1000.png",
    "url": "http://shop.errea.is/haukar?product_id=1195&limit=100"
  },
  {
    "name": "Haukar - Knattspyrna - Keppnistreyja - 2024",
    "price": "4.495kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/F%C3%B3tbolti/2021/haukar_home_shirt_21-1000x1000.png",
    "url": "http://shop.errea.is/haukar/haukar_keppnistreyja?limit=100"
  },
  {
    "name": "Haukar - Socks Pro - Sokkalausir sokkar - Rauðir",
    "price": "2.290kr.",
    "image": "https://shop.errea.is/image/cache/catalog/V%C3%B6rur/Sokkar/Socks%20Pro/Updated/GC0B0Z00020-1000x1000.png",
    "url": "http://shop.errea.is/haukar?product_id=1188&limit=100"
  },
  {
    "name": "Haukar - Hettupeysa - Warren 3.0 - Dökkblá",
    "price": "9.990kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/F%C3%B3tbolti/2024/haukar_warren_logo_navy-1000x1000.png",
    "url": "http://shop.errea.is/haukar?product_id=1194&limit=100"
  },
  {
    "name": "Haukar - Hettupeysa - Warren 3.0 - Rauð",
    "price": "9.990kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/F%C3%B3tbolti/2024/haukar_warren_logo_red-1000x1000.png",
    "url": "http://shop.errea.is/haukar?product_id=1193&limit=100"
  },
  {
    "name": "Haukar - Socks Pro - Sokkalausir sokkar - Hvítir",
    "price": "2.290kr.",
    "image": "https://shop.errea.is/image/cache/catalog/V%C3%B6rur/Sokkar/Socks%20Pro/Updated/GC0B0Z00010-1000x1000.png",
    "url": "http://shop.errea.is/haukar?product_id=1210&limit=100"
  },
  {
    "name": "Haukar - 3D Wear - Davor",
    "price": "10.990kr.",
    "image": "https://shop.errea.is/image/cache/catalog/V%C3%B6rur/Innanundirfatna%C3%B0ur/Davor/UM0C0L0002-1000x1000.jpg",
    "url": "http://shop.errea.is/haukar?product_id=1368&limit=100"
  },
  {
    "name": "Haukar - Innanundirbuxur stuttar - Denis",
    "price": "7.990kr.",
    "image": "https://shop.errea.is/image/cache/catalog/V%C3%B6rur/Innanundirfatna%C3%B0ur/Denis/UP0B0Z00020-1000x1000.jpg",
    "url": "http://shop.errea.is/haukar/haukar?limit=100"
  },
  {
    "name": "Haukar - Socks Pro - Sokkalausir sokkar - Svartir",
    "price": "2.290kr.",
    "image": "https://shop.errea.is/image/cache/catalog/V%C3%B6rur/Sokkar/Socks%20Pro/Updated/Black-1000x1000.PNG",
    "url": "http://shop.errea.is/haukar?product_id=1211&limit=100"
  },
  {
    "name": "Haukar - Bolur - Bómull - Dökkblár",
    "price": "3.490kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/F%C3%B3tbolti/2024/haukar_evo_navy-1000x1000.png",
    "url": "http://shop.errea.is/haukar?product_id=1071&limit=100"
  },
  {
    "name": "Haukar - Bolur - Bómull - Rauður",
    "price": "3.490kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/F%C3%B3tbolti/2023/haukar_evo-1000x1000.png",
    "url": "http://shop.errea.is/haukar?product_id=962&limit=100"
  },
  {
    "name": "Haukar - Innanundirbuxur síðar - Damian",
    "price": "10.990kr.",
    "image": "https://shop.errea.is/image/cache/catalog/V%C3%B6rur/Innanundirfatna%C3%B0ur/Damian/UP0C0Z00120-1000x1000.jpg",
    "url": "http://shop.errea.is/haukar/haukar?limit=100"
  },
  {
    "name": "Haukar - Hettupeysa - Jonas - Dökkblá",
    "price": "8.490kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/F%C3%B3tbolti/2024/haukar_jonas_navy-1000x1000.png",
    "url": "http://shop.errea.is/haukar?product_id=1070&limit=100"
  },
  {
    "name": "Haukar - Hettupeysa - Jonas - Rauð",
    "price": "8.490kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/F%C3%B3tbolti/2023/haukar_jonas-1000x1000.png",
    "url": "http://shop.errea.is/haukar?product_id=828&limit=100"
  },
  {
    "name": "Errea Skip Sokkar",
    "price": "2.490kr.",
    "image": "https://shop.errea.is/image/cache/catalog/V%C3%B6rur/Sokkar/A42200280-1000x1000.jpg",
    "url": "http://shop.errea.is/haukar?product_id=511&limit=100"
  },
  {
    "name": "Haukar - Derhúfa - Rauð",
    "price": "1.990kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/F%C3%B3tbolti/2024/haukar-der-rau%C3%B0-1000x1000.png",
    "url": "http://shop.errea.is/haukar?product_id=1105&limit=100"
  },
  {
    "name": "Haukar - Hópapöntun - Manfred ZipTop - Rauður",
    "price": "5.130kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/F%C3%B3tbolti/2025/manfred_red_haukar-1000x1000.png",
    "url": "http://shop.errea.is/haukar/haukar-hopapontun?limit=100"
  },
  {
    "name": "Haukar - Íþróttabuxur - Cook 3.0 - Svartar",
    "price": "9.990kr.",
    "image": "https://shop.errea.is/image/cache/catalog/V%C3%B6rur/Buxur/Cook%203.0/FP590Z00120-1000x1000.jpg",
    "url": "http://shop.errea.is/haukar?product_id=1185&limit=100"
  },
  {
    "name": "Haukar - Keppnisstuttbuxur - Rauðar - Shorts Pro",
    "price": "3.990kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/F%C3%B3tbolti/2025/GP1C0Z00020_haukar-1000x1000.png",
    "url": "http://shop.errea.is/haukar?product_id=1208&limit=100"
  },
  {
    "name": "Errea - Gripsokkar - Energy Gripp - Rauðir",
    "price": "4.990kr.",
    "image": "https://shop.errea.is/image/cache/catalog/V%C3%B6rur/Sokkar/ENERGY%20GRIPP/GC0A0Z00020_1-1000x1000.jpg",
    "url": "http://shop.errea.is/haukar?product_id=886&limit=100"
  },
  {
    "name": "Haukar - Bakpoki með skóhólfi",
    "price": "7.990kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/2025/GA0I0Z01900_haukar-1000x1000.png",
    "url": "http://shop.errea.is/haukar?product_id=125&limit=100"
  },
  {
    "name": "Haukar - Knattspyrna - Keppnistreyja - 17/19",
    "price": "4.000kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/F%C3%B3tbolti/2024/haukar_2017-1000x1000.png",
    "url": "http://shop.errea.is/haukar?product_id=1164&limit=100"
  },
  {
    "name": "Haukar - Knattspyrna - Keppnistreyja - 19/20",
    "price": "4.000kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/F%C3%B3tbolti/haukarHOME1920%20copy-1000x1000.jpg",
    "url": "http://shop.errea.is/haukar?product_id=385&limit=100"
  },
  {
    "name": "Haukar - Knattspyrna - Varakeppnistreyja",
    "price": "4.000kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/F%C3%B3tbolti/2022/haukar-fotb-varab-1000x1000.png",
    "url": "http://shop.errea.is/haukar?product_id=758&limit=100"
  },
  {
    "name": "Haukar - Knattspyrna - Markvörður",
    "price": "4.000kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/F%C3%B3tbolti/2021/haukar_goalkeeper_shirt-1000x1000.png",
    "url": "http://shop.errea.is/haukar?product_id=636&limit=100"
  },
  {
    "name": "Haukar - Regnstakkur - 2 litir",
    "price": "11.990kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/haukar2020/FJ0K0Z00090_haukar-1000x1000.jpg",
    "url": "http://shop.errea.is/haukar/haukar-regnstakkur?limit=100"
  },
  {
    "name": "Haukar - Vatnsbrúsi",
    "price": "1.990kr.",
    "image": "https://shop.errea.is/image/cache/catalog/V%C3%B6rur/Aukahlutir/Br%C3%BAsar/haukar_vatnsbrusi-1000x1000.png",
    "url": "http://shop.errea.is/haukar?product_id=959&limit=100"
  },
  {
    "name": "Errea - Hálskragi - Jumar - Dökkblár",
    "price": "3.490kr.",
    "image": "https://shop.errea.is/image/cache/catalog/V%C3%B6rur/Aukahlutir/T710000190-1000x1000.jpg",
    "url": "http://shop.errea.is/haukar?product_id=817&limit=100"
  },
  {
    "name": "Errea - Húfa - Jak - Rauð",
    "price": "3.490kr.",
    "image": "https://shop.errea.is/image/cache/catalog/V%C3%B6rur/Aukahlutir/FA0G0Z00600-1000x1000.jpg",
    "url": "http://shop.errea.is/haukar?product_id=877&limit=100"
  },
  {
    "name": "Brave - Bakpoki m/boltaneti",
    "price": "8.490kr.",
    "image": "https://shop.errea.is/image/cache/catalog/V%C3%B6rur/T%C3%B6skur/GA0K0Z02500-1000x1000.png",
    "url": "http://shop.errea.is/haukar?product_id=783&limit=100"
  },
  {
    "name": "Errea - Hálskragi - Jumar - Rauður",
    "price": "3.490kr.",
    "image": "https://shop.errea.is/image/cache/catalog/V%C3%B6rur/Aukahlutir/T710000050-1000x1000.jpg",
    "url": "http://shop.errea.is/haukar?product_id=818&limit=100"
  },
  {
    "name": "Errea - Hanskar - Jule - Dökkbláir",
    "price": "2.990kr.",
    "image": "https://shop.errea.is/image/cache/catalog/V%C3%B6rur/Aukahlutir/FA0H0Z02000-1000x1000.jpg",
    "url": "http://shop.errea.is/haukar?product_id=874&limit=100"
  },
  {
    "name": "Errea - Hanskar - Jule - Rauðir",
    "price": "2.990kr.",
    "image": "https://shop.errea.is/image/cache/catalog/V%C3%B6rur/Aukahlutir/FA0H0Z00600-1000x1000.jpg",
    "url": "http://shop.errea.is/haukar?product_id=875&limit=100"
  },
  {
    "name": "Errea - Hanskar - Jule - Svartir",
    "price": "2.990kr.",
    "image": "https://shop.errea.is/image/cache/catalog/V%C3%B6rur/Aukahlutir/FA0H0Z02600-1000x1000.jpg",
    "url": "http://shop.errea.is/haukar?product_id=803&limit=100"
  },
  {
    "name": "Errea - Húfa - Jak - Dökkblá",
    "price": "3.490kr.",
    "image": "https://shop.errea.is/image/cache/catalog/V%C3%B6rur/Aukahlutir/FA0G0Z02000-1000x1000.jpg",
    "url": "http://shop.errea.is/haukar?product_id=876&limit=100"
  },
  {
    "name": "Errea - Húfa - Jak - Svört",
    "price": "3.490kr.",
    "image": "https://shop.errea.is/image/cache/catalog/V%C3%B6rur/Aukahlutir/FA0G0Z02600-1000x1000.jpg",
    "url": "http://shop.errea.is/haukar?product_id=804&limit=100"
  },
  {
    "name": "Haukar - Bakpoki",
    "price": "7.490kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/2025/GA0J0Z01900_haukar-1000x1000.png",
    "url": "http://shop.errea.is/haukar?product_id=124&limit=100"
  },
  {
    "name": "Haukar - Íþróttataska - Baja Media",
    "price": "8.990kr.",
    "image": "https://shop.errea.is/image/cache/catalog/V%C3%B6rur/T%C3%B6skur/GA0C0Z01900-1000x1000.png",
    "url": "http://shop.errea.is/haukar?product_id=126&limit=100"
  },
  {
    "name": "Errea Brúsi",
    "price": "1.990kr.",
    "image": "https://shop.errea.is/image/cache/catalog/V%C3%B6rur/Aukahlutir/Br%C3%BAsar/FA1F0Z0490-1000x1000.png",
    "url": "http://shop.errea.is/haukar?product_id=656&limit=100"
  },
  {
    "name": "Gjafabréf - Haukar",
    "price": "10.000kr.",
    "image": "https://shop.errea.is/image/cache/catalog/F%C3%A9lagsli%C3%B0/Haukar/gjafabr%C3%A9fHaukarNet%20copy-1000x1000.png",
    "url": "http://shop.errea.is/haukar?product_id=244&limit=100"
  },
  {
    "name": "Haukar - Æfingabuxur - Flann",
    "price": "8.490kr.",
    "image": "https://shop.errea.is/image/cache/catalog/V%C3%B6rur/Buxur/EP1H0Z00120-1000x1000.jpg",
    "url": "http://shop.errea.is/haukar?product_id=111&limit=100"
  }
];

const boltamadurinData = [
  {
    id: 101,
    name: "Haukar Keppnistreyja 2025/27",
    price: "7.990kr.",
    image: "https://cdn.shopify.com/s/files/1/0639/3770/8190/files/705747-01-1.png?v=1771674758&width=533",
    isNew: true,
    shopName: "Boltamaðurinn",
    url: "https://boltamadurinn.is/collections/haukar/products/haukar-keppnistreyja"
  },
  {
    id: 102,
    name: "Haukar stuttbuxur",
    price: "3.990kr.",
    image: "https://cdn.shopify.com/s/files/1/0639/3770/8190/files/705752-01-1.png?v=1771678697&width=533",
    isNew: false,
    shopName: "Boltamaðurinn",
    url: "https://boltamadurinn.is/collections/haukar/products/haukar-stuttbuxur-barnastaerdir"
  },
  {
    id: 103,
    name: "Haukar Hettupeysa - Barna",
    price: "8.990kr.",
    image: "https://cdn.shopify.com/s/files/1/0639/3770/8190/files/6518618-01-1.png?v=1771679171&width=533",
    isNew: false,
    shopName: "Boltamaðurinn",
    url: "https://boltamadurinn.is/collections/haukar/products/haukar-hettupeysa"
  },
  {
    id: 104,
    name: "Haukar Hettupeysa - Fullorðins",
    price: "9.990kr.",
    image: "https://cdn.shopify.com/s/files/1/0639/3770/8190/files/6518618-01-1.png?v=1771679171&width=533",
    isNew: false,
    shopName: "Boltamaðurinn",
    url: "https://boltamadurinn.is/collections/haukar/products/haukar-hettupeysa-fullordins"
  },
  {
    id: 105,
    name: "Puma æfingabuxur síðar",
    price: "9.990kr.",
    image: "https://cdn.shopify.com/s/files/1/0639/3770/8190/files/657332-03_c9fdfdb6-d8f4-417c-8b51-d269b612390d.jpg?v=1728035655&width=533",
    isNew: false,
    shopName: "Boltamaðurinn",
    url: "https://boltamadurinn.is/collections/haukar/products/fh-treyja-copy"
  },
  {
    id: 106,
    name: "Haukar Æfiingabolur",
    price: "1.500kr.",
    image: "https://cdn.shopify.com/s/files/1/0639/3770/8190/files/704917-01-1.png?v=1771680965&width=533",
    isNew: false,
    shopName: "Boltamaðurinn",
    url: "https://boltamadurinn.is/collections/haukar/products/haukar-aefiingabolur"
  },
  {
    id: 107,
    name: "Haukar - Íþróttataska",
    price: "7.990kr.",
    image: "https://cdn.shopify.com/s/files/1/0639/3770/8190/files/090233-03-Hau.png?v=1744124759&width=533",
    isNew: false,
    shopName: "Boltamaðurinn",
    url: "https://boltamadurinn.is/collections/haukar/products/haukar-treyja-copy"
  },
  {
    id: 108,
    name: "Haukar - Bakpoki",
    price: "5.990kr.",
    image: "https://cdn.shopify.com/s/files/1/0639/3770/8190/files/090238-03.jpg?v=1725289080&width=533",
    isNew: false,
    shopName: "Boltamaðurinn",
    url: "https://boltamadurinn.is/collections/haukar/products/haukar-bakpoki"
  },
  {
    id: 109,
    name: "Puma sokkar 3 í pakka",
    price: "2.490kr.",
    image: "https://cdn.shopify.com/s/files/1/0639/3770/8190/files/100000965002_pp_01_puma.jpg?v=1713867145&width=533",
    isNew: false,
    shopName: "Boltamaðurinn",
    url: "https://boltamadurinn.is/collections/haukar/products/puma-3pc-sokkar"
  },
  {
    id: 110,
    name: "Haukar Æfingapeysa",
    price: "8.990kr.",
    image: "https://cdn.shopify.com/s/files/1/0639/3770/8190/files/658632-01.jpg?v=1728034367&width=533",
    isNew: false,
    shopName: "Boltamaðurinn",
    url: "https://boltamadurinn.is/collections/haukar/products/haukar-aefingapeysa-barnastaerdir"
  },
  {
    id: 111,
    name: "Haukar Markmannstreyja",
    price: "7.990kr.",
    image: "https://cdn.shopify.com/s/files/1/0639/3770/8190/files/704933-40_430635f2-08dc-4e75-8324-5f7d62c2fc9f.jpg?v=1728036315&width=533",
    isNew: false,
    shopName: "Boltamaðurinn",
    url: "https://boltamadurinn.is/collections/haukar/products/haukar-markmannsreyja-fullordins"
  },
  {
    id: 112,
    name: "Haukar derhúfa",
    price: "3.990kr.",
    image: "https://cdn.shopify.com/s/files/1/0639/3770/8190/files/Haukarcappink_4aedffa3-b419-4416-9d94-2d398ed95751.jpg?v=1736419771&width=533",
    isNew: false,
    shopName: "Boltamaðurinn",
    url: "https://boltamadurinn.is/collections/haukar/products/haukar-derhufa"
  },
  {
    id: 113,
    name: "Puma regnjakki",
    price: "9.990kr.",
    image: "https://cdn.shopify.com/s/files/1/0639/3770/8190/files/657245-03-1.png?v=1746549142&width=533",
    isNew: false,
    shopName: "Boltamaðurinn",
    url: "https://boltamadurinn.is/collections/haukar/products/puma-regnjakki-fullordins"
  },
  {
    id: 114,
    name: "Puma Nova handbolti",
    price: "7.990kr.",
    image: "https://cdn.shopify.com/s/files/1/0639/3770/8190/files/083791-01.jpg?v=1731411098&width=533",
    isNew: false,
    shopName: "Boltamaðurinn",
    url: "https://boltamadurinn.is/collections/haukar/products/puma-nova-match-handbolti-staerd-3"
  }
];

const merged = [
  ...erreaData.map((p, idx) => ({
    id: idx + 1,
    ...p,
    isNew: p.name.includes('NÝTT') || p.name.includes('2025'),
    shopName: 'Errea'
  })),
  ...boltamadurinData
];

const content = `export const merchandise = ${JSON.stringify(merged, null, 2)};`;
fs.writeFileSync('/home/ylmur/Agency_OS_2026/03_IT_and_Infrastructure/haukar-web/src/data/merchandise.js', content);
