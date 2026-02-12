import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Copy, Check } from 'lucide-react';

export const GeminiCaption: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [tone, setTone] = useState<string>("joyful");

  const generateCaption = async () => {
    if (!process.env.API_KEY) {
      setCaption("API Key is missing. Please configure the environment.");
      return;
    }

    setLoading(true);
    setCopied(false);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Write a short, engaging social media caption (max 50 words) for a parishioner of SS. Peter and Paul Catholic Church Shomolu to post with their 70th Anniversary photo. 
      The tone should be ${tone}. 
      Include the hashtag #SSPPShomolu70 #Anniversary. 
      Focus on faith, community, and celebration.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      if (response.text) {
        setCaption(response.text.trim());
      }
    } catch (error) {
      console.error(error);
      setCaption("Could not generate caption at this time. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-serif text-parish-brown font-bold flex items-center justify-center gap-2">
          <Sparkles className="text-parish-gold" />
          AI Wishes
        </h2>
        <p className="text-sm text-parish-brown/80">
          Need words for your post? Let AI write a celebratory message for you.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-parish-gold space-y-4">
        <div>
          <label className="block text-sm font-bold text-parish-brown mb-2">Select Tone</label>
          <div className="flex gap-2">
            {['Joyful', 'Solemn', 'Gratitude'].map((t) => (
              <button
                key={t}
                onClick={() => setTone(t.toLowerCase())}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold border ${
                  tone === t.toLowerCase()
                    ? 'bg-parish-brown text-white border-parish-brown'
                    : 'bg-transparent text-parish-brown border-parish-brown/30'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={generateCaption}
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-parish-gold to-parish-darkGold text-white font-bold rounded-lg shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="animate-pulse">Writing...</span>
          ) : (
            <>
              <Sparkles size={18} />
              Generate Caption
            </>
          )}
        </button>

        {caption && (
          <div className="mt-4 p-4 bg-parish-light rounded-lg border border-parish-gold/20 relative">
            <p className="text-parish-brown italic font-serif leading-relaxed pr-8">
              "{caption}"
            </p>
            <button 
              onClick={copyToClipboard}
              className="absolute top-2 right-2 p-2 text-parish-brown/60 hover:text-parish-gold transition"
              title="Copy"
            >
              {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};