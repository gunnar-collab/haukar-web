import { useEffect } from 'react';

// Real data scraped directly from Boltamadurinn.is!
const products = [
  {
    id: 1,
    name: "Haukar Keppnistreyja 2025/27",
    price: "7.990 ISK",
    image: "https://boltamadurinn.is/cdn/shop/files/705747-01-1.png?v=1771674758&width=533",
    isNew: true
  },
  {
    id: 2,
    name: "Haukar stuttbuxur",
    price: "3.990 ISK",
    image: "https://boltamadurinn.is/cdn/shop/files/705752-01-1.png?v=1771678697&width=533",
    isNew: false
  },
  {
    id: 3,
    name: "Haukar Hettupeysa - Barna",
    price: "8.990 ISK",
    image: "https://boltamadurinn.is/cdn/shop/files/6518618-01-1.png?v=1771679171&width=533",
    isNew: false
  },
  {
    id: 4,
    name: "Haukar Hettupeysa - Fullorðins",
    price: "9.990 ISK",
    image: "https://boltamadurinn.is/cdn/shop/files/6518618-01-1.png?v=1771679171&width=533",
    isNew: false
  },
  {
    id: 5,
    name: "Puma æfingabuxur síðar",
    price: "9.990 ISK",
    image: "https://boltamadurinn.is/cdn/shop/files/657332-03_c9fdfdb6-d8f4-417c-8b51-d269b612390d.jpg?v=1728035655&width=533",
    isNew: false
  },
  {
    id: 6,
    name: "Haukar Æfingabolur",
    price: "1.500 ISK",
    image: "https://boltamadurinn.is/cdn/shop/files/704917-01-1.png?v=1771680965&width=533",
    isNew: false
  },
  {
    id: 7,
    name: "Haukar - Íþróttataska",
    price: "7.990 ISK",
    image: "https://boltamadurinn.is/cdn/shop/files/090233-03-Hau.png?v=1744124759&width=533",
    isNew: false
  },
  {
    id: 8,
    name: "Haukar - Bakpoki",
    price: "5.990 ISK",
    image: "https://boltamadurinn.is/cdn/shop/files/090238-03.jpg?v=1725289080&width=533",
    isNew: false
  },
  {
    id: 9,
    name: "Puma sokkar 3 í pakka",
    price: "2.490 ISK",
    image: "https://boltamadurinn.is/cdn/shop/files/100000965002_pp_01_puma.jpg?v=1713867145&width=533",
    isNew: false
  },
  {
    id: 10,
    name: "Haukar Æfingapeysa",
    price: "8.990 ISK",
    image: "https://boltamadurinn.is/cdn/shop/files/658632-01.jpg?v=1728034367&width=533",
    isNew: false
  },
  {
    id: 11,
    name: "Haukar æfingabolur",
    price: "4.990 ISK",
    image: "https://boltamadurinn.is/cdn/shop/files/658637-01_00ee9497-c170-4cfb-8be5-cfefa7d74ed9.jpg?v=1728034840&width=533",
    isNew: false
  },
  {
    id: 12,
    name: "Haukar Markmannstreyja",
    price: "7.990 ISK",
    image: "https://boltamadurinn.is/cdn/shop/files/704933-40_430635f2-08dc-4e75-8324-5f7d62c2fc9f.jpg?v=1728036315&width=533",
    isNew: false
  },
  {
    id: 13,
    name: "Stanno Raw Crew Grip Sokkar",
    price: "2.990 ISK",
    image: "https://boltamadurinn.is/cdn/shop/files/444007-8200-1.png?v=1741702839&width=533",
    isNew: false
  },
  {
    id: 14,
    name: "Puma markmannsbuxur handbolti",
    price: "7.990 ISK",
    image: "https://boltamadurinn.is/cdn/shop/files/658601-03_821a1339-461e-4f07-8a54-b297e43492ff.jpg?v=1728036628&width=533",
    isNew: false
  },
  {
    id: 15,
    name: "Puma Nova training handbolti",
    price: "5.990 ISK",
    image: "https://boltamadurinn.is/cdn/shop/files/084386.webp?v=1731410920&width=533",
    isNew: false
  },
  {
    id: 16,
    name: "Svampbolti - rauður",
    price: "5.990 ISK",
    image: "https://boltamadurinn.is/cdn/shop/files/H17002.webp?v=1731412511&width=533",
    isNew: false
  },
  {
    id: 17,
    name: "Puma Nova match pro handbolti",
    price: "12.990 ISK",
    image: "https://boltamadurinn.is/cdn/shop/files/083789-01.webp?v=1731411261&width=533",
    isNew: false
  },
  {
    id: 18,
    name: "Haukar derhúfa",
    price: "3.990 ISK",
    image: "https://boltamadurinn.is/cdn/shop/files/Haukarcappink_4aedffa3-b419-4416-9d94-2d398ed95751.jpg?v=1736419771&width=533",
    isNew: false
  },
  {
    id: 19,
    name: "Puma Nova training handbolti (blár)",
    price: "5.990 ISK",
    image: "https://boltamadurinn.is/cdn/shop/files/083792_01.jpg?v=1731412353&width=533",
    isNew: false
  },
  {
    id: 20,
    name: "Puma regnjakki - Fullorðins",
    price: "9.990 ISK",
    image: "https://boltamadurinn.is/cdn/shop/files/657245-03-1.png?v=1746549142&width=533",
    isNew: false
  },
  {
    id: 21,
    name: "Puma regnjakki - Barnastærðir",
    price: "8.990 ISK",
    image: "https://boltamadurinn.is/cdn/shop/files/657245-03-1.png?v=1746549142&width=533",
    isNew: false
  },
  {
    id: 22,
    name: "Puma teamGOAL23 Hettupeysa - Grá",
    price: "6.293 ISK",
    image: "https://boltamadurinn.is/cdn/shop/files/656580-33-1.png?v=1746541740&width=533",
    isNew: false
  },
  {
    id: 23,
    name: "Puma Nova Match handbolti",
    price: "7.990 ISK",
    image: "https://boltamadurinn.is/cdn/shop/files/083791-01.jpg?v=1731411098&width=533",
    isNew: false
  }
];

export default function Vefverslun() {
  // Always snap to the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    // Replaced the section wrapper with the main flex-grow wrapper to match other pages and kill the gap
    <main className="w-full bg-[#fafafa] flex-grow pb-20 selection:bg-[#1c2c6c] selection:text-white">
      
      {/* 1. SHOP HERO - HAUKAR RED */}
      <div className="bg-[#c8102e] text-white py-24 px-6 text-center relative overflow-hidden shadow-lg border-b-4 border-[#1c2c6c]">
        
        {/* Subtle Background Icon */}
        <span className="material-symbols-outlined text-[350px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none rotate-12">
          local_mall
        </span>
        
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <span className="text-white bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 block shadow-sm border border-white/20 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">local_mall</span>
            Opinber Varningur
          </span>
          
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-6 drop-shadow-lg leading-tight">
            Vefverslun <br className="hidden md:block"/>Hauka
          </h1>
          <p className="text-white/90 font-medium text-lg md:text-xl leading-relaxed max-w-2xl text-center">
            Sýndu litina þína. Kauptu keppnistreyjur, æfingagalla og annan varning beint frá okkar samstarfsaðila, Boltamanum.
          </p>
        </div>
      </div>

      {/* 2. THE SHOP GRID */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        
        {/* Header / Action */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-gray-200 pb-6">
          <div>
            <h2 className="text-3xl font-black italic tracking-tighter text-[#1c2c6c] uppercase">
              Vinsælast <span className="text-[#c8102e]">í dag</span>
            </h2>
          </div>
          
          <a 
            href="https://boltamadurinn.is/collections/haukar" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#1c2c6c] text-white px-6 py-3 rounded-full font-bold hover:bg-[#c8102e] hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-xl"
          >
            Skoða alla búðina á Boltamadurinn.is
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </a>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <a 
              key={product.id} 
              href="https://boltamadurinn.is/collections/haukar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group cursor-pointer flex flex-col"
            >
              {/* Image Container */}
              <div className="relative bg-white rounded-3xl overflow-hidden aspect-[4/5] mb-5 border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-300 flex items-center justify-center group-hover:border-[#c8102e]/30">
                
                {product.isNew && (
                  <div className="absolute top-4 left-4 z-20 bg-[#c8102e] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-md shadow-md">
                    Nýtt
                  </div>
                )}
                
                {/* THE FIX: object-contain + p-8 + mix-blend-multiply */}
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain object-center p-8 mix-blend-multiply group-hover:scale-110 transition-transform duration-700 relative z-10"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c2c6c]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 pointer-events-none"></div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-grow px-2">
                <h3 className="text-xl font-bold text-[#1c2c6c] leading-tight mb-2 group-hover:text-[#c8102e] transition-colors">
                  {product.name}
                </h3>
                <p className="text-[#c8102e] font-black tracking-widest text-lg">
                  {product.price}
                </p>
              </div>
            </a>
          ))}
        </div>

      </div>
    </main>
  );
}