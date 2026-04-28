import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Layout Components
import Karate from './pages/Karate';
import Skak from './pages/Skak';
import PlayerProfile from './pages/PlayerProfile';
import Korfubolti from './pages/Korfubolti';
import Fotbolti from './pages/Fotbolti';
import Handbolti from './pages/Handbolti';
import Veislusalur from './pages/Veislusalur';
import Aefingagjold from './pages/Aefingagjold';
import Personuvernd from './pages/Personuvernd';
import CookieBanner from './components/CookieBanner';
import Dagatal from './pages/Dagatal';
import Bakhjarlar from './pages/Bakhjarlar';
import HafaSamband from './pages/HafaSamband';
import Leikmannahopur from './pages/Leikmannahopur';
import NewsArticle from './pages/NewsArticle';
import Frettir from './pages/Frettir';
import Arsskyrslur from './pages/Arsskyrslur';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AlertToast from './components/AlertToast';
import GeminiChat from './components/GeminiChat';
import TicketModal from './components/TicketModal';
import LoginModal from './components/LoginModal';
import Sponsors from './components/Sponsors'; 
import MatchReportModal from './components/sports/MatchReportModal';
import { useMatch } from './context/MatchContext';
import MobileBottomNav from './components/MobileBottomNav';

// Pages
import Home from './pages/Home';
import Leikvakt from './pages/Leikvakt';
import Vefverslun from './pages/Vefverslun';
import Sagan from './pages/Sagan';
import Fraedsla from './pages/Fraedsla';
import FanProfileDemo from './pages/FanProfileDemo';

import { MatchProvider } from './context/MatchContext';
import ScrollToTop from './components/ScrollToTop';
import NavigationProgressBar from './components/NavigationProgressBar';

function AppContent() {
  const location = useLocation();
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [initialSearchQuery, setInitialSearchQuery] = useState('');
  const { selectedReport, closeReport } = useMatch();

  return (
    <div className="bg-white text-gray-900 font-sans selection:bg-[#c8102e] selection:text-white flex flex-col min-h-screen">
      
      {/* 1. Modals & Overlays */}
      <TicketModal isOpen={isTicketModalOpen} onClose={() => setIsTicketModalOpen(false)} />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <MatchReportModal 
        isOpen={!!selectedReport} 
        onClose={closeReport} 
        match={selectedReport} 
      />

        {/* 2. GUARANTEED FIXED HEADER (Immune to scroll bugs) */}
        <div className="fixed top-0 left-0 w-full z-[100] bg-white shadow-md flex flex-col">
          <Navbar 
            onOpenTickets={() => setIsTicketModalOpen(true)} 
            onOpenLogin={() => setIsLoginModalOpen(true)}
            onSearchSubmit={(query) => {
              setInitialSearchQuery(query);
              setIsChatOpen(true);
            }}
          />
        </div>

        {/* 3. STRICT CONTENT WRAPPER (Destroys all horizontal overflow) */}
        <div 
          key={location.key}
          className="flex-grow relative z-10 overflow-x-hidden w-full pt-[72px] page-transition"
        >
          <Routes>
            <Route path="/leikmenn/:slug" element={<PlayerProfile />} />
            <Route path="/karate" element={<Karate />} />
            <Route path="/korfubolti" element={<Korfubolti onOpenTickets={() => setIsTicketModalOpen(true)} />} />
            <Route path="/fotbolti" element={<Fotbolti onOpenTickets={() => setIsTicketModalOpen(true)} />} />
            <Route path="/handbolti" element={<Handbolti onOpenTickets={() => setIsTicketModalOpen(true)} />} />
            <Route path="/skak" element={<Skak />} />
            <Route path="/veislusalur" element={<Veislusalur />} />
            <Route path="/aefingagjold" element={<Aefingagjold />} />
            <Route path="/dagatal" element={<Dagatal />} />
            <Route path="/bakhjarlar" element={<Bakhjarlar />} />
            <Route path="/hafasamband" element={<HafaSamband />} />
            <Route path="/leikmannahopur" element={<Leikmannahopur />} />
            <Route path="/arsskyrslur" element={<Arsskyrslur />} />
            <Route path="/frettir" element={<Frettir />} />
            <Route path="/frett/:slug" element={<NewsArticle />} />
            <Route path="/" element={<Home />} />
            <Route path="/leikvakt" element={<Leikvakt />} />
            <Route path="/vefverslun" element={<Vefverslun />} />
            <Route path="/sagan" element={<Sagan />} />
            <Route path="/fraedsla" element={<Fraedsla />} />
            <Route path="/personuvernd" element={<Personuvernd />} />
            <Route path="/demo" element={<FanProfileDemo />} />
          </Routes>
        </div>

        {/* 4. Global Pre-Footer & Footer */}
        <AlertToast />
        <GeminiChat 
          onOpenTickets={() => setIsTicketModalOpen(true)} 
          isOpen={isChatOpen}
          setIsOpen={setIsChatOpen}
          initialSearchQuery={initialSearchQuery}
          setInitialSearchQuery={setInitialSearchQuery}
        />
        <CookieBanner />
        
        {/* 5. Sponsor Wall & Footer sit outside the routes so they render on every page! */}
        <Sponsors />
        <Footer />
        <MobileBottomNav onOpenTickets={() => setIsTicketModalOpen(true)} />
        
      </div>
  );
}

export default function App() {
  return (
    <MatchProvider>
      <ScrollToTop />
      <NavigationProgressBar />
      <AppContent />
    </MatchProvider>
  );
}