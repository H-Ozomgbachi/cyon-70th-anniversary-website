import React from 'react';
import { PARISH_LOGO_URL } from '../constants';

export const ParishPrayer: React.FC = () => {
  return (
    <div className="w-full max-w-lg mx-auto min-h-[85vh] p-8 pb-28 animate-fade-in relative overflow-hidden">
      
      {/* Background Watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center">
         <img src={PARISH_LOGO_URL} className="w-[80%]" alt="Watermark" />
      </div>

      <div className="relative z-10 space-y-8 text-center">
        
        <header className="space-y-4">
            <div className="w-16 h-1 bg-parish-gold mx-auto rounded-full"></div>
            <h2 className="text-3xl font-serif text-parish-brown font-bold leading-tight">
                70th Anniversary<br/>Parish Prayer
            </h2>
            <div className="w-16 h-1 bg-parish-gold mx-auto rounded-full"></div>
        </header>

        <div className="space-y-6 font-serif text-parish-brown leading-relaxed text-lg">
          <p>
            <span className="text-parish-gold font-bold text-2xl float-left mr-2 leading-none">H</span>
            eavenly Father, we thank You for 70 years of grace and faithfulness in SS Peter and Paul Catholic Church.
            We praise You for the work of evangelization You have accomplished in this Parish.
          </p>

          <p>
            We thank You for all our priests, past and present, and for their faithful service to Your people.
            Bless them abundantly for their sacrifices and labour of love.
          </p>

          <p>
            We are grateful for all parishioners, past and present, who have worked with dedication to build and sustain this Parish.
            May Your blessings rest upon them and their families.
          </p>

          <p>
            We also remember all who have gone before us, marked with the sign of peace, grant them eternal rest and let your perpetual light shine upon them.
          </p>

          <p>
            Holy Spirit, guide and direct us as we celebrate this anniversary year.
            We place all the plans and affairs of this celebration into Your hands.
          </p>

          <p>
            Grant us unity, protection, and renewed zeal for Your mission.
            Through the intercession of Saints Peter and Paul, keep us steadfast in faith and bold in witness.
          </p>

          <p>
            We make this prayer through Christ our Lord.
          </p>

          <p className="font-bold text-xl text-parish-gold mt-6">Amen.</p>

          <div className="pt-8 text-base border-t border-parish-gold/20 mt-8">
            <p className="font-bold">Saint Peter and Saint Paul,</p>
            <p className="italic text-gray-500">Pray for us.</p>
          </div>
        </div>
      </div>
    </div>
  );
};