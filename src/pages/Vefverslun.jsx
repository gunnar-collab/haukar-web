export default function Vefverslun() {
  const products = [
    {
      id: 1,
      name: 'Haukar Heimatreyja 2026',
      category: 'Keppnisfatnaður',
      price: '14.990 kr.',
      // High-res placeholder for the massive hero banner
      image: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', 
      isNew: true,
      featured: true 
    },
    {
      id: 2,
      name: 'Haukar Útitreyja 2026',
      category: 'Keppnisfatnaður',
      price: '14.990 kr.',
      image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      isNew: true,
      featured: false
    },
    {
      id: 3,
      name: 'Haukar Æfingapeysa',
      category: 'Æfingafatnaður',
      price: '11.990 kr.',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      isNew: false,
      featured: false
    },
    {
      id: 4,
      name: 'Haukar Trefill',
      category: 'Fylgihlutir',
      price: '4.990 kr.',
      image: 'https://images.unsplash.com/photo-1606130983177-3e819b168db6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      isNew: false,
      featured: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* 1. Cinematic Store Header */}
        <div className="relative w-full h-[35vh] min-h-[300px] rounded-3xl overflow-hidden mb-12 shadow-2xl group cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1518605368461-1ee0677558d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
            alt="Haukar Fans" 
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#c8102e]/90 to-[#1c2c6c]/80 mix-blend-multiply"></div>
          
          <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-10">
            <span className="text-white text-xs font-bold uppercase tracking-[0.3em] mb-2 drop-shadow-md">
              Opinber Varningur
            </span>
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white uppercase drop-shadow-lg leading-none">
              Klæddu þig í <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Stoltið</span>
            </h1>
          </div>
        </div>

        {/* 2. Category Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          <button className="text-sm font-bold text-white bg-[#c8102e] px-6 py-2.5 rounded-full shadow-md outline-none">Allt</button>
          <button className="text-sm font-bold text-gray-500 hover:text-[#c8102e] bg-white border border-gray-200 px-6 py-2.5 rounded-full hover:shadow-md transition-all outline-none">Treyjur</button>
          <button className="text-sm font-bold text-gray-500 hover:text-[#c8102e] bg-white border border-gray-200 px-6 py-2.5 rounded-full hover:shadow-md transition-all outline-none">Fylgihlutir</button>
        </div>

        {/* 3. The Top-Hero Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className={`group cursor-pointer flex flex-col ${product.featured ? 'md:col-span-3' : 'col-span-1'}`}
            >
              
              <div className={`relative bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 mb-5 ${product.featured ? 'aspect-[16/9] md:aspect-[21/9]' : 'aspect-[4/5] md:aspect-square'}`}>
                
                {product.isNew && (
                  <span className="absolute top-5 left-5 z-20 bg-[#c8102e] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
                    Nýtt
                  </span>
                )}
                
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 backdrop-blur-[2px] flex items-center justify-center p-6">
                   <div className="w-full flex justify-center translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                     <button 
                        className={`bg-[#c8102e] text-white font-bold shadow-xl hover:bg-red-800 transition-all flex justify-center items-center gap-2 uppercase tracking-wider 
                        ${product.featured ? 'w-full max-w-sm py-5 text-xl rounded-2xl hover:scale-105' : 'w-full py-3 text-base rounded-xl'}`}
                     >
                        <span className={`material-symbols-outlined ${product.featured ? 'text-[24px]' : 'text-[18px]'}`}>shopping_cart</span>
                        Bæta í körfu
                     </button>
                   </div>
                </div>
              </div>

              {/* FIXED: Product Info Refactored for Perfect Alignment */}
              <div className="px-2">
                {/* 1. Category sits alone on top */}
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">
                  {product.category}
                </p>
                
                {/* 2. Name and Price sit in their own container locked to the baseline */}
                <div className="flex justify-between items-end gap-4">
                  <h3 className={`font-black italic uppercase tracking-tight text-[#1c2c6c] leading-none ${product.featured ? 'text-2xl md:text-3xl' : 'text-lg'}`}>
                    {product.name}
                  </h3>
                  <p className={`font-black text-[#c8102e] text-right whitespace-nowrap leading-none ${product.featured ? 'text-2xl md:text-3xl' : 'text-lg'}`}>
                    {product.price}
                  </p>
                </div>
              </div>
              
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}