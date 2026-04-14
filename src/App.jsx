import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NewsGrid from './components/NewsGrid';
import TrophyCabinet from './components/TrophyCabinet';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-surface text-gray-900 font-body selection:bg-haukar-red selection:text-white">
      
      <Navbar />

      <main>
        <Hero />
        <NewsGrid />
        <TrophyCabinet />
      </main>

      <Footer />
      
    </div>
  );
}