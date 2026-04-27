import { useState, useEffect } from 'react';
import { merchandise } from '../data/merchandise';

export default function Vefverslun() {
  const [filter, setFilter] = useState('Allt');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProducts = filter === 'Allt' 
    ? merchandise 
    : merchandise.filter(p => p.shopName === filter);

  return (
    <main className="w-full bg-white flex-grow pb-20 selection:bg-[#1c2c6c] selection:text-white">
      
      {/* 1. SHOP HERO - HAUKAR RED */}
      <div className="bg-[#c8102e] text-white py-24 px-6 text-center relative overflow-hidden shadow-lg border-b-4 border-[#1c2c6c]">
        
        <span className="material-symbols-outlined text-[350px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none rotate-12">
          local_mall
        </span>
        
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <span className="text-white bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 block shadow-sm border border-white/20 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">local_mall</span>
            Hauka Varningur
          </span>
          
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-6 drop-shadow-lg leading-tight">
            Vefverslun <br className="hidden md:block"/>Hauka
          </h1>
          <p className="text-white/90 font-medium text-lg md:text-xl leading-relaxed max-w-2xl text-center">
            Sýndu litina þína. Kauptu keppnistreyjur, æfingagalla og annan varning beint frá okkar samstarfsaðilum, Errea og Boltamanninum.
          </p>
        </div>
      </div>

      {/* 2. THE SHOP GRID */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        
        {/* Header / Action / Filter */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-8 border-b border-gray-200 pb-12">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-black italic tracking-tighter text-[#1c2c6c] uppercase mb-2">
              Hauka <span className="text-[#c8102e]">Varningur</span>
            </h2>
            <p className="text-gray-500 font-medium">Skoðaðu úrvalið frá samstarfsaðilum okkar</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {['Allt', 'Errea', 'Boltamaðurinn'].map((shop) => (
              <button
                key={shop}
                onClick={() => setFilter(shop)}
                className={`px-8 py-3 rounded-full font-black uppercase tracking-widest text-xs transition-all duration-300 border-2 shadow-sm ${
                  filter === shop 
                    ? 'bg-[#c8102e] border-[#c8102e] text-white shadow-[#c8102e]/20 shadow-xl scale-105' 
                    : 'bg-white border-gray-200 text-gray-500 hover:border-[#c8102e] hover:text-[#c8102e]'
                }`}
              >
                {shop}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <a 
              key={product.id} 
              href={product.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group cursor-pointer flex flex-col bg-white rounded-[40px] p-4 border border-transparent hover:border-[#c8102e]/10 hover:shadow-[0_20px_50px_rgba(200,16,46,0.1)] transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative bg-[#f8f8f8] rounded-[32px] overflow-hidden aspect-square mb-6 flex items-center justify-center">
                
                {product.isNew && (
                  <div className="absolute top-4 left-4 z-20 bg-[#c8102e] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-md">
                    Nýtt
                  </div>
                )}

                <div className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-sm ${
                    product.shopName === 'Errea' ? 'bg-[#1c2c6c] text-white' : 'bg-white text-[#c8102e]'
                }`}>
                    {product.shopName}
                </div>
                
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain object-center p-6 transform group-hover:scale-110 transition-transform duration-700 relative z-10"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#c8102e]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30 pointer-events-none"></div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-grow px-3 pb-2">
                <h3 className="text-base font-bold text-[#1c2c6c] leading-tight mb-3 group-hover:text-[#c8102e] transition-colors line-clamp-2 h-10">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mt-auto">
                  <p className="text-[#c8102e] font-black text-xl tracking-tighter">
                    {product.price}
                  </p>
                  <div className="w-10 h-10 rounded-2xl bg-[#1c2c6c] text-white flex items-center justify-center group-hover:bg-[#c8102e] group-hover:rotate-12 transition-all duration-300">
                    <span className="material-symbols-outlined text-lg">shopping_cart</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* External Shops Call-to-Action */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-10">
          <a 
            href="https://shop.errea.is/felagslid/haukar"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative h-80 rounded-[50px] overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1c2c6c] to-[#1c2c6c]/80 group-hover:scale-105 transition-transform duration-700"></div>
            <div className="absolute inset-0 p-12 flex flex-col items-center justify-center text-center z-10 text-white">
              <span className="material-symbols-outlined text-6xl mb-6 opacity-40">sports_soccer</span>
              <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">Errea Verslun</h2>
              <p className="text-white/70 font-medium mb-8 max-w-xs">Fullt úrval af æfinga- og keppnisfatnaði fyrir öll Haukafólk</p>
              <div className="px-8 py-3 bg-white text-[#1c2c6c] rounded-full font-black uppercase text-xs tracking-widest group-hover:bg-[#c8102e] group-hover:text-white transition-all">
                Heimsækja verslun
              </div>
            </div>
          </a>

          <a 
            href="https://boltamadurinn.is/collections/haukar"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative h-80 rounded-[50px] overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#c8102e] to-[#c8102e]/80 group-hover:scale-105 transition-transform duration-700"></div>
            <div className="absolute inset-0 p-12 flex flex-col items-center justify-center text-center z-10 text-white">
              <span className="material-symbols-outlined text-6xl mb-6 opacity-40">apparel</span>
              <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">Boltamaðurinn</h2>
              <p className="text-white/70 font-medium mb-8 max-w-xs">Hettupeysur, töskur, aukahlutir og fjölbreytt úrval</p>
              <div className="px-8 py-3 bg-white text-[#c8102e] rounded-full font-black uppercase text-xs tracking-widest group-hover:bg-[#1c2c6c] group-hover:text-white transition-all">
                Heimsækja verslun
              </div>
            </div>
          </a>
        </div>
      </div>
    </main>
  );
}