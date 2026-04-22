import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Layout Components
import Karate from './pages/Karate';
import PlayerProfile from './pages/PlayerProfile';
import Korfubolti from './pages/Korfubolti';
import Fotbolti from './pages/Fotbolti';
import Handbolti from './pages/Handbolti';
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

import { MatchProvider } from './context/MatchContext';
import ScrollToTop from './components/ScrollToTop';
import NavigationProgressBar from './components/NavigationProgressBar';

export default function App() {
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  return (
    <MatchProvider>
      <ScrollToTop />
      <NavigationProgressBar />
      <div className="bg-[#fafafa] text-gray-900 font-sans selection:bg-[#c8102e] selection:text-white flex flex-col min-h-screen">
        
        {/* 1. Modals & Overlays */}
        <TicketModal isOpen={isTicketModalOpen} onClose={() => setIsTicketModalOpen(false)} />

        {/* 2. GUARANTEED FIXED HEADER (Immune to scroll bugs) */}
        <div className="fixed top-0 left-0 w-full z-[100] bg-white shadow-md flex flex-col">
          <LiveTicker toggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)} isOpen={isDrawerOpen} />
          <DivisionTicker isOpen={isDrawerOpen} />
          <Navbar onOpenTickets={() => setIsTicketModalOpen(true)} />
        </div>

        {/* 3. STRICT CONTENT WRAPPER (Destroys all horizontal overflow) */}
        <div 
          key={location.key}
          className="flex-grow relative z-10 overflow-x-hidden w-full pt-[120px] page-transition"
        >
          <Routes>
            <Route path="/leikmenn/:slug" element={<PlayerProfile />} />
            <Route path="/karate" element={<Karate />} />
            <Route path="/korfubolti" element={<Korfubolti onOpenTickets={() => setIsTicketModalOpen(true)} />} />
            <Route path="/fotbolti" element={<Fotbolti onOpenTickets={() => setIsTicketModalOpen(true)} />} />
            <Route path="/handbolti" element={<Handbolti onOpenTickets={() => setIsTicketModalOpen(true)} />} />
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
    </MatchProvider>
  );
}