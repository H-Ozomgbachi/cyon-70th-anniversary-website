import React from 'react';
import { ViewState } from '../types';
import { PARISH_LOGO_URL } from '../constants';
import { ChevronRight, Camera, BookOpen } from 'lucide-react';

interface HomeProps {
  setView: (view: ViewState) => void;
}

export const Home: React.FC<HomeProps> = ({ setView }) => {
  return (
    <div className="flex flex-col min-h-[85vh] w-full max-w-lg mx-auto p-6 pb-24 relative overflow-hidden">
      
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 z-10 mt-8">
        
        <div className="relative group cursor-pointer animate-fade-in" onClick={() => setView(ViewState.EVENTS)}>
            <div className="absolute inset-0 bg-gradient-to-tr from-parish-gold to-transparent opacity-20 blur-2xl rounded-full"></div>
            <img 
            src={PARISH_LOGO_URL} 
            alt="70th Anniversary Shield" 
            className="relative w-48 h-auto mx-auto drop-shadow-xl transform transition-transform duration-700 hover:scale-105 object-contain"
            />
        </div>

        <div className="space-y-4 animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 bg-parish-brown text-parish-light rounded-full text-[10px] font-bold tracking-[0.3em] uppercase shadow-md">
            1956 — 2026
            </span>
            <h1 className="text-5xl font-serif font-bold text-parish-brown leading-none">
            70 Years<br/>
            <span className="text-3xl text-parish-darkGold italic font-medium">of Grace & Glory</span>
            </h1>
            <p className="text-gray-600 font-sans text-sm max-w-xs mx-auto leading-relaxed pt-2">
            Celebrating the platinum jubilee of SS. Peter & Paul Catholic Church, Shomolu.
            </p>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-2 gap-4 mt-8 w-full z-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <button 
          onClick={() => setView(ViewState.GENERATOR)}
          className="col-span-2 p-5 bg-gradient-to-r from-parish-brown to-[#2A1A0D] text-white rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-between group"
        >
          <div className="flex flex-col items-start">
            <span className="text-xs opacity-70 uppercase tracking-wider mb-1">Get Started</span>
            <span className="font-serif font-bold text-xl">Create DP</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <Camera size={20} />
          </div>
        </button>
        
        <button 
          onClick={() => setView(ViewState.EVENTS)}
          className="p-5 bg-white text-parish-brown border border-parish-brown/5 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col items-start gap-4"
        >
          <span className="font-serif font-bold text-lg">Events</span>
          <div className="w-full flex justify-end">
             <ChevronRight size={18} className="opacity-50" />
          </div>
        </button>

        <button 
          onClick={() => setView(ViewState.PRAYER)}
          className="p-5 bg-parish-gold text-white rounded-2xl shadow-md hover:shadow-lg transition-all flex flex-col items-start gap-4"
        >
          <span className="font-serif font-bold text-lg">Prayer</span>
           <div className="w-full flex justify-end">
             <BookOpen size={18} className="opacity-80" />
          </div>
        </button>
      </div>

      <div className="mt-8 text-center">
         <p className="text-[10px] uppercase tracking-widest text-parish-brown/40">Platinum Jubilee</p>
      </div>
    </div>
  );
};