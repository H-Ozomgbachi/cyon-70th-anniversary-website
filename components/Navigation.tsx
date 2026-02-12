import React from 'react';
import { ViewState } from '../types';
import { Home, Camera, Calendar, BookOpen } from 'lucide-react';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: ViewState.HOME, label: 'Home', icon: <Home size={22} strokeWidth={1.5} /> },
    { id: ViewState.EVENTS, label: 'Events', icon: <Calendar size={22} strokeWidth={1.5} /> },
    { id: ViewState.GENERATOR, label: 'DP Maker', icon: <Camera size={22} strokeWidth={1.5} /> },
    { id: ViewState.PRAYER, label: 'Prayer', icon: <BookOpen size={22} strokeWidth={1.5} /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-parish-gold/20 text-parish-brown shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 pb-safe">
      <div className="flex justify-around items-center h-20 max-w-md mx-auto px-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex flex-col items-center justify-center w-full h-full transition-all duration-300 ${
              currentView === item.id ? 'text-parish-gold' : 'text-gray-400 hover:text-parish-brown'
            }`}
          >
            <div className={`mb-1 p-1 rounded-xl transition-all ${
              currentView === item.id ? 'bg-parish-light translate-y-[-2px]' : ''
            }`}>
              {item.icon}
            </div>
            <span className={`text-[10px] uppercase tracking-wider font-bold ${
              currentView === item.id ? 'opacity-100' : 'opacity-70'
            }`}>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};