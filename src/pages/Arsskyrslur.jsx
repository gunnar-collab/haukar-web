import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Arsskyrslur() {
  // Always snap to the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const reports = [
    { year: '2024', title: 'Ársskýrsla Hauka 2024', url: 'https://www.haukar.is/wp-content/uploads/2016/03/Haukar_Ársskýrsla-2024_LowRes02.pdf', size: 'Low-Res' },
    { year: '2023', title: 'Ársskýrsla Hauka 2023', url: 'https://www.haukar.is/wp-content/uploads/2024/05/Haukar_Ársskýrsla-2023_NET.pdf', size: 'Net-Res' },
    { year: '2022', title: 'Ársskýrsla Hauka 2022', url: 'https://www.haukar.is/wp-content/uploads/2016/03/Haukar_arsskyrsla_2022.pdf', size: 'PDF' },
    { year: '2020', title: 'Ársskýrsla Hauka 2020', url: 'https://www.haukar.is/wp-content/uploads/2016/03/Haukar_Ársskýrsla-2020_01-22.pdf', size: 'PDF' },
    { year: '2019', title: 'Ársskýrsla Hauka 2019', url: 'https://www.haukar.is/wp-content/uploads/2016/03/Haukar_Ársskýrsla-2019_NET.pdf', size: 'PDF' },
    { year: '2018', title: 'Ársskýrsla Hauka 2018', url: 'https://www.haukar.is/wp-content/uploads/2019/03/Haukar_Ársskýrsla2018_NET.pdf', size: 'PDF' },
    { year: '2018', title: 'Ársreikningur Knattspyrnudeildar 2018', url: 'https://www.haukar.is/wp-content/uploads/2019/04/Ársreikningur-Knattspyrnudeildar-2018..pdf', size: 'PDF' },
    { year: '2017', title: 'Ársskýrsla Hauka 2017', url: 'http://www.haukar.is/wp-content/uploads/2018/08/Ársskýrsla-2017-drög-3-lokaeintak.pdf', size: 'PDF' },
    { year: '2016', title: 'Ársskýrsla Aðalstjórnar Hauka 2016', url: 'http://www.haukar.is/wp-content/uploads/2017/03/Ársskýrsla-Aðalstjórnar-Hauka-starfsárið-2016.pdf', size: 'PDF' },
    { year: '2015', title: 'Ársskýrsla Hauka 2015', url: 'http://www.haukar.is/wp-content/uploads/2016/03/Ársskýrsla-2015-lokaútgáfa1.pdf', size: 'PDF' },
  ];

  return (
    <main className="w-full bg-[#fafafa] flex-grow pb-20">
      
      {/* Hero Section */}
      <div className="bg-[#1c2c6c] text-white py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <span className="text-[#c8102e] text-[10px] md:text-xs font-black uppercase tracking-widest mb-3 block">
            Gagnsæi & Upplýsingar
          </span>
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-6 drop-shadow-lg">
            Ársskýrslur
          </h1>
          <p className="text-white/80 font-medium text-lg md:text-xl leading-relaxed max-w-2xl text-center">
            Hér getur þú nálgast opinberar ársskýrslur og fjárhagsupplýsingar Knattspyrnufélagsins Hauka.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        
        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((report, idx) => (
            <a 
              key={idx}
              href={report.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-6 group"
            >
              <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-[#c8102e] group-hover:bg-[#c8102e]/10 transition-colors">
                <span className="material-symbols-outlined text-3xl">picture_as_pdf</span>
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-1">
                   <span className="text-[10px] font-black text-[#c8102e] uppercase tracking-widest">{report.year}</span>
                   <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{report.size}</span>
                </div>
                <h3 className="text-lg font-black text-[#1c2c6c] uppercase tracking-tight group-hover:text-[#c8102e] transition-colors line-clamp-1">
                  {report.title}
                </h3>
              </div>
              <span className="material-symbols-outlined text-gray-200 group-hover:text-[#c8102e] transition-colors">
                download
              </span>
            </a>
          ))}
        </div>

        {/* Back Link */}
        <div className="mt-16 text-center">
          <Link to="/hafasamband" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#c8102e] transition-colors uppercase tracking-widest">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Aftur í Hafa Samband
          </Link>
        </div>

      </div>
    </main>
  );
}
