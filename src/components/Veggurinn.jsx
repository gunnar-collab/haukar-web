import Button from './Button.jsx';

export default function Veggurinn() {
  // Mock data strictly for Instagram and Facebook
  const socialPosts = [
    {
      id: 1,
      user: 'Jón Jónsson',
      handle: '@jonni_haukamadur',
      platform: 'instagram',
      content: 'Mættur á Ásvelli! Búið að vera geggjað tímabil, nú klárum við þetta! 🔴⚪️',
      image: true,
      time: '2 klst síðan'
    },
    {
      id: 2,
      user: 'Knattspyrnufélagið Haukar',
      handle: 'Haukar - Opinber Síða',
      platform: 'facebook',
      content: 'Þvílík stemning í stúkunni í kvöld! Takk fyrir stuðninginn, þið eruð áttundi leikmaðurinn á vellinum. 👊 Sjáumst á næsta leik!',
      image: true,
      time: '5 klst síðan'
    },
    {
      id: 3,
      user: 'Anna Sigurðardóttir',
      handle: '@annasig',
      platform: 'instagram',
      content: 'Framtíðin er björt! Yngri flokkarnir að gera frábæra hluti um helgina. Upprennandi stjörnur.',
      image: true,
      time: 'Í gær'
    },
    {
      id: 4,
      user: 'Haukar Handbolti',
      handle: 'Haukar Handbolti',
      platform: 'facebook',
      // FIXED: Removed Stubbur.is, updated to our new Digital Wallet messaging!
      content: 'Undirbúningur í hámarki fyrir oddaleikinn. Hlökkum til að sjá ykkur öll á fimmtudaginn! Tryggðu þér miða með nýja stafræna VIP passanum okkar í Apple Wallet.',
      image: false,
      time: 'Í gær'
    }
  ];

  return (
    <section className="w-full bg-[#fafafa] py-16 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-[#c8102e] text-xs font-bold uppercase tracking-widest block mb-2">
            #ÁframHaukar
          </span>
          <h2 className="text-5xl font-black italic tracking-normal text-[#c8102e]">
            Veggurinn á Ásvöllum
          </h2>
          <p className="text-gray-500 text-sm font-body mt-4 max-w-xl">
            Taktu þátt í umræðunni! Merktu myndirnar þínar með <strong className="text-[#1c2c6c]">#ÁframHaukar</strong> á Instagram og Facebook til að birtast á veggnum.
          </p>
        </div>

        {/* Grid Layout for Social Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full cursor-pointer">
              
              {/* Post Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-[#1c2c6c]">
                    {post.user.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1c2c6c] leading-none mb-1">{post.user}</h4>
                    <span className="text-[10px] text-gray-400 font-medium">{post.handle}</span>
                  </div>
                </div>
                {/* Platform Icon Indicator */}
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-[14px] shadow-sm ${post.platform === 'instagram' ? 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500' : 'bg-[#1877F2]'}`}>
                  <span className="material-symbols-outlined text-[16px]">
                    {post.platform === 'instagram' ? 'photo_camera' : 'thumb_up'}
                  </span>
                </div>
              </div>

              {/* Post Image Placeholder */}
              {post.image && (
                <div className="w-full bg-[#e9ecef] rounded-2xl aspect-square mb-4 flex items-center justify-center overflow-hidden">
                  <span className="material-symbols-outlined text-gray-400 text-3xl">image</span>
                </div>
              )}

              {/* Post Content */}
              <p className="text-gray-600 text-sm font-body mb-4 flex-grow">
                {post.content}
              </p>

              {/* Post Footer */}
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{post.time}</span>
                <span className={`material-symbols-outlined transition-colors text-[18px] ${post.platform === 'instagram' ? 'text-gray-300 hover:text-red-500' : 'text-gray-300 hover:text-[#1877F2]'}`}>
                  {post.platform === 'instagram' ? 'favorite' : 'thumb_up'}
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* Global Button for Loading More */}
        <div className="mt-12 text-center">
          <Button variant="outline" uppercase={true}>
            Hlaða fleiri færslum
          </Button>
        </div>

      </div>
    </section>
  );
}