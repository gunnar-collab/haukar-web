import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout Components
import Veislusalur from './pages/Veislusalur';
import Aefingagjold from './pages/Aefingagjold';
import CookieBanner from './components/CookieBanner';
import Dagatal from './pages/Dagatal';
import Bakhjarlar from './pages/Bakhjarlar';
import HafaSamband from './pages/HafaSamband';
import Leikmannahopur from './pages/Leikmannahopur';
import NewsArticle from './pages/NewsArticle';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LiveTicker from './components/LiveTicker';
import AlertToast from './components/AlertToast';
import DivisionTicker from './components/DivisionTicker';
import GeminiChat from './components/GeminiChat';
import TicketModal from './components/TicketModal';
import Sponsors from './components/Sponsors'; 

// Pages
import Home from './pages/Home';
import Leikvakt from './pages/Leikvakt';
import Vefverslun from './pages/Vefverslun';
import Sagan from './pages/Sagan';

export default function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  return (
    <div className="bg-[#fafafa] text-gray-900 font-sans selection:bg-[#c8102e] selection:text-white flex flex-col min-h-screen">
      
      {/* 1. Modals & Overlays */}
      <TicketModal isOpen={isTicketModalOpen} onClose={() => setIsTicketModalOpen(false)} />

      {/* 2. Header */}
      <LiveTicker toggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)} isOpen={isDrawerOpen} />
      <DivisionTicker isOpen={isDrawerOpen} />
      <Navbar onOpenTickets={() => setIsTicketModalOpen(true)} />

      {/* 3. The Router Engine */}
      <div className="flex-grow relative z-10">
        <Routes>
          <Route path="/veislusalur" element={<Veislusalur />} />
          <Route path="/aefingagjold" element={<Aefingagjold />} />
          <Route path="/dagatal" element={<Dagatal />} />
          <Route path="/bakhjarlar" element={<Bakhjarlar />} />
          <Route path="/hafasamband" element={<HafaSamband />} />
          <Route path="/leikmannahopur" element={<Leikmannahopur />} />
          <Route path="/grein" element={<NewsArticle />} />
          <Route path="/" element={<Home />} />
          <Route path="/leikvakt" element={<Leikvakt />} />
          <Route path="/vefverslun" element={<Vefverslun />} />
          {/* FIXED: The History page is now officially wired into the routing engine! */}
          <Route path="/sagan" element={<Sagan />} />
        </Routes>
      </div>

      {/* 4. Global Pre-Footer & Footer */}
      <AlertToast />
      <GeminiChat />
      <CookieBanner />
      
      {/* 5. Sponsor Wall & Footer sit outside the routes so they render on every page! */}
      <Sponsors />
      <Footer />
      
    </div>
  );
}