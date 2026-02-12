import React from 'react';
import { EVENTS } from '../constants';
import { CalendarIcon } from 'lucide-react';

export const EventsList: React.FC = () => {
  return (
    <div className="w-full max-w-lg mx-auto p-4 pb-32">
      <div className="sticky top-0 bg-parish-cream/95 backdrop-blur-sm z-30 py-4 mb-4 border-b border-parish-gold/10">
        <h2 className="text-2xl font-serif text-parish-brown font-bold text-center">
            Programme of Activities
            <span className="block text-sm font-sans font-normal text-parish-gold mt-1">2026 Anniversary Year</span>
        </h2>
      </div>

      <div className="relative border-l-2 border-parish-gold/20 ml-6 space-y-8 my-4">
        {EVENTS.map((event) => (
          <div key={event.id} className="relative pl-8 group">
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-parish-cream border-4 border-parish-gold group-hover:bg-parish-gold transition-colors"></div>
            
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-1">
                <span className="text-xs font-bold tracking-widest text-parish-gold uppercase bg-parish-brown/5 px-2 py-0.5 rounded w-fit">
                    {event.month}
                </span>
                <span className="text-sm font-bold text-gray-500">
                    {event.date}
                </span>
            </div>

            <h3 className="text-lg font-serif font-bold text-parish-brown leading-tight mb-2 group-hover:text-parish-darkGold transition-colors">
              {event.title}
            </h3>
            
            {event.description && (
                <p className="text-sm text-gray-500 leading-relaxed">
                    {event.description}
                </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-white rounded-xl shadow-sm text-center border border-parish-gold/10">
        <CalendarIcon className="mx-auto text-parish-gold mb-3" size={32} />
        <p className="text-parish-brown font-serif italic">
            "We thank You for 70 years of grace."
        </p>
      </div>
    </div>
  );
};