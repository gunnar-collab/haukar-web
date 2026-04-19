import React from 'react';

// Real data scraped directly from Boltamadurinn.is!
const products = [
  {
    id: 1,
    name: "Haukar Keppnistreyja 2025/27",
    price: "7.990 ISK",
    image: "https://boltamadurinn.is/cdn/shop/files/705747-01-1.png?v=1771674758&width=713",
    isNew: true,
  },
  {
    id: 2,
    name: "Haukar Hettupeysa - Fullorðins",
    price: "9.990 ISK",
    image: "https://boltamadurinn.is/cdn/shop/files/6518618-01-1.png?v=1771679171&width=713",
    isNew: false,
  },
  {
    id: 3,
    name: "Haukar Æfingapeysa",
    price: "8.990 ISK",
    image: "https://boltamadurinn.is/cdn/shop/files/658632-01.jpg?v=1728034367&width=713",
    isNew: false,
  },
  {
    id: 4,
    name: "Haukar stuttbuxur",
    price: "3.990 ISK",
    image: "https://boltamadurinn.is/cdn/shop/files/705752-01-1.png?v=1771678697&width=713",
    isNew: false,
  },
  {
    id: 5,
    name: "Haukar - Íþróttataska",
    price: "7.990 ISK",
    image: "https://boltamadurinn.is/cdn/shop/files/090233-03-Hau.png?v=1744124759&width=713",
    isNew: false,
  },
  {
    id: 6,
    name: "Puma Nova training handbolti",
    price: "5.990 ISK",
    image: "https://boltamadurinn.is/cdn/shop/files/084386.webp?v=1731410920&width=713",
    isNew: false,
  }
];

export default function Vefverslun() {
  return (
    <section className="w-full bg-white py-24 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="text-[#c8102e] text-sm font-bold uppercase tracking-widest flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              Boltamaðurinn
            </span>
            <h2 className="text-5xl lg:text-6xl font-black italic tracking-tighter text-[#1c2c6c] uppercase leading-none">
              Vefverslun <span className="text-[#c8102e]">Hauka</span>
            </h2>
          </div>
          
          <a 
            href="https://boltamadurinn.is/collections/haukar" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#1c2c6c] text-white px-6 py-3 rounded-full font-bold hover:bg-[#c8102e] transition-colors duration-300"
          >
            Skoða alla búðina
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </a>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <a 
              key={product.id} 
              href="https://boltamadurinn.is/collections/haukar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group cursor-pointer flex flex-col"
            >
              {/* Image Container */}
              <div className="relative bg-[#fafafa] rounded-3xl overflow-hidden aspect-[4/5] mb-5 border border-gray-100 flex items-center justify-center">
                {product.isNew && (
                  <div className="absolute top-4 left-4 z-20 bg-[#c8102e] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                    Nýtt
                  </div>
                )}
                
                {/* THE FIX: 
                  - object-contain: Makes sure the whole product fits without cropping.
                  - p-8: Gives the product breathing room from the edges.
                  - mix-blend-multiply: Erases white backgrounds on the Shopify jpegs!
                */}
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain object-center p-8 mix-blend-multiply group-hover:scale-110 transition-transform duration-700 relative z-10"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#1c2c6c]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 pointer-events-none"></div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-grow px-2">
                <h3 className="text-xl font-bold text-[#1c2c6c] leading-tight mb-2 group-hover:text-[#c8102e] transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-500 font-bold tracking-widest">
                  {product.price}
                </p>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}