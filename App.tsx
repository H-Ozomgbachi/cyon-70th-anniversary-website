import React, { useState } from 'react';
import { ViewState } from './types';
import { PARISH_LOGO_URL } from './constants';
import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { DPGenerator } from './components/DPGenerator';
import { EventsList } from './components/EventsList';
import { ParishPrayer } from './components/ParishPrayer';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);

  const renderView = () => {
    switch (currentView) {
      case ViewState.HOME:
        return <Home setView={setCurrentView} />;
      case ViewState.GENERATOR:
        return <DPGenerator />;
      case ViewState.EVENTS:
        return <EventsList />;
      case ViewState.PRAYER:
        return <ParishPrayer />;
      default:
        return <Home setView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-parish-cream relative overflow-x-hidden font-sans">
      {/* Texture Overlay (Optional subtle grain) */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Header / Top Bar */}
      <header className="sticky top-0 z-40 bg-parish-cream/90 backdrop-blur-md border-b border-parish-gold/10 px-6 py-4 flex items-center justify-between transition-all">
         <div 
           className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
           onClick={() => setCurrentView(ViewState.HOME)}
         >
            <img src={PARISH_LOGO_URL} alt="70th Anniversary" className="w-9 h-9 rounded-lg object-contain shadow-md" />
            <div className="flex flex-col">
              <span className="font-serif font-bold text-parish-brown tracking-tight leading-none text-lg">SSPP Shomolu</span>
              <span className="text-[10px] uppercase tracking-widest text-parish-gold font-bold">Platinum Jubilee</span>
            </div>
         </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 w-full animate-fade-in">
        {renderView()}
      </main>

      {/* Bottom Navigation */}
      <Navigation currentView={currentView} setView={setCurrentView} />
    </div>
  );
}