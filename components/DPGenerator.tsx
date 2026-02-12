import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Upload, Download, RotateCcw, Image as ImageIcon, ZoomIn, Move } from 'lucide-react';
import { PARISH_LOGO_URL } from '../constants';

const CANVAS_SIZE = 1080;

export const DPGenerator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [logoImg, setLogoImg] = useState<HTMLImageElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const img = new Image();
    // No crossOrigin needed for data URI
    img.src = PARISH_LOGO_URL; 
    img.onload = () => setLogoImg(img);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setImage(img);
          // Center the new image
          setScale(Math.max(CANVAS_SIZE / img.width, CANVAS_SIZE / img.height));
          setPosition({ x: 0, y: 0 });
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // 1. Draw User Image (Background Layer)
    // We fill with cream first to avoid transparency issues
    ctx.fillStyle = '#FDFBF7';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    if (image) {
      ctx.save();
      const centerX = CANVAS_SIZE / 2;
      const centerY = CANVAS_SIZE / 2;
      ctx.translate(centerX + position.x, centerY + position.y);
      ctx.scale(scale, scale);
      ctx.drawImage(image, -image.width / 2, -image.height / 2);
      ctx.restore();
    } else {
        // Empty State Background
        ctx.fillStyle = '#F9F5EB'; // Parish Light
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        
        // Subtle pattern or text
        ctx.fillStyle = '#E5E0D0';
        for(let i=0; i<CANVAS_SIZE; i+=40) {
            ctx.fillRect(i, 0, 1, CANVAS_SIZE);
            ctx.fillRect(0, i, CANVAS_SIZE, 1);
        }
    }

    // 2. Draw The Overlay Frame (Foreground Layer)
    // Gold Frame Border
    const frameWidth = 30;
    const gradient = ctx.createLinearGradient(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    gradient.addColorStop(0, '#C5A059');   // Gold
    gradient.addColorStop(0.3, '#F9E5B6'); // Light Gold
    gradient.addColorStop(0.5, '#F9E5B6'); // Light Gold
    gradient.addColorStop(0.7, '#C5A059'); // Gold
    gradient.addColorStop(1, '#9A7B3E');   // Dark Gold

    ctx.strokeStyle = gradient;
    ctx.lineWidth = frameWidth;
    ctx.strokeRect(frameWidth/2, frameWidth/2, CANVAS_SIZE - frameWidth, CANVAS_SIZE - frameWidth);

    // Inner White Line
    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.lineWidth = 3;
    ctx.strokeRect(frameWidth, frameWidth, CANVAS_SIZE - frameWidth*2, CANVAS_SIZE - frameWidth*2);

    // 3. Bottom Banner - compact strip at the very bottom
    const bannerHeight = 160;
    const bannerY = CANVAS_SIZE - bannerHeight;
    
    // Gradient fade for text legibility
    const fadeGrad = ctx.createLinearGradient(0, bannerY - 40, 0, CANVAS_SIZE);
    fadeGrad.addColorStop(0, 'rgba(62, 39, 19, 0)');
    fadeGrad.addColorStop(0.3, 'rgba(62, 39, 19, 0.8)');
    fadeGrad.addColorStop(1, 'rgba(62, 39, 19, 0.95)');
    
    ctx.fillStyle = fadeGrad;
    ctx.fillRect(frameWidth, bannerY - 40, CANVAS_SIZE - frameWidth * 2, bannerHeight + 40);

    // 4. Logo - small badge in the bottom-left corner
    if (logoImg) {
        const logoSize = 140;
        const logoX = frameWidth + 20;
        const logoY = CANVAS_SIZE - logoSize - 15;

        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 10;
        ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
        ctx.restore();
    }

    // 5. Text - aligned to the right of the logo
    const textX = CANVAS_SIZE / 2 + 60;
    ctx.textAlign = 'center';
    
    // Main Title
    ctx.font = 'bold 42px "Playfair Display"';
    ctx.fillStyle = '#F9E5B6'; // Light Gold
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.fillText("SS. PETER & PAUL", textX, CANVAS_SIZE - 100);
    
    // Subtitle
    ctx.font = 'bold 24px "Playfair Display"';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText("CATHOLIC CHURCH SHOMOLU", textX, CANVAS_SIZE - 65);

    // Tagline
    ctx.font = 'italic 22px "Lato"';
    ctx.fillStyle = '#C5A059';
    ctx.shadowColor = 'rgba(0,0,0,0)'; // Remove shadow for small text
    ctx.fillText("Celebrating 70 Years of Faith & Service", textX, CANVAS_SIZE - 35);

  }, [image, scale, position, logoImg]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  // Handle Dragging
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `sspp-70th-dp-${Date.now()}.png`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 'image/png', 1.0);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto p-4 space-y-6 pb-32">
      
      {!image ? (
          // --- EMPTY STATE (Initial View) ---
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-fade-in">
             <div className="space-y-2">
                <h2 className="text-3xl font-serif text-parish-brown font-bold">Get Your Jubilee DP</h2>
                <p className="text-parish-brown/70 max-w-xs mx-auto">
                    Upload your favorite photo to generate a customized WhatsApp profile picture for the 70th Anniversary.
                </p>
             </div>

             <div className="p-8 bg-white rounded-full shadow-xl border-4 border-parish-light">
                <img src={PARISH_LOGO_URL} alt="Logo" className="w-32 h-32 object-contain" />
             </div>

             <label className="btn-primary w-full max-w-xs py-4 bg-parish-brown text-white rounded-xl shadow-lg font-bold text-lg flex items-center justify-center gap-3 cursor-pointer transform transition hover:scale-105 active:scale-95">
                <Upload size={24} />
                <span>Upload Photo</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
             </label>
          </div>
      ) : (
          // --- EDITOR STATE (After Upload) ---
          <div className="w-full space-y-4 animate-fade-in-up">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-serif font-bold text-parish-brown">Adjust Your Photo</h2>
                <button 
                    onClick={() => { setImage(null); setScale(1); setPosition({x:0,y:0}); }}
                    className="text-sm text-red-500 font-bold flex items-center gap-1"
                >
                    <RotateCcw size={14} /> Start Over
                </button>
            </div>

            {/* Canvas Container */}
            <div className="relative w-full aspect-square bg-gray-100 rounded-xl shadow-2xl overflow-hidden border-2 border-parish-gold">
                <canvas
                ref={canvasRef}
                width={CANVAS_SIZE}
                height={CANVAS_SIZE}
                className="w-full h-full object-contain cursor-move touch-none"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                />
                
                {/* Floating Hint */}
                <div className="absolute top-4 left-0 right-0 flex justify-center pointer-events-none">
                    <span className="bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md">
                        Drag to move • Pinch to zoom
                    </span>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-parish-gold/20 space-y-5">
                
                <div className="space-y-2">
                    <div className="flex justify-between text-xs text-parish-brown font-bold uppercase tracking-wider">
                        <span>Zoom</span>
                        <span>{Math.round(scale * 100)}%</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <ImageIcon size={16} className="text-gray-400" />
                        <input
                            type="range"
                            min="0.2"
                            max="3"
                            step="0.05"
                            value={scale}
                            onChange={(e) => setScale(parseFloat(e.target.value))}
                            className="flex-1 accent-parish-brown h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <ZoomIn size={20} className="text-parish-brown" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <label className="py-3 px-4 rounded-xl border border-parish-brown/20 text-parish-brown font-bold flex items-center justify-center gap-2 hover:bg-parish-light cursor-pointer">
                        <Upload size={18} />
                        <span>Change</span>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                    
                    <button 
                        onClick={downloadImage}
                        className="py-3 px-4 rounded-xl bg-parish-gold text-white font-bold flex items-center justify-center gap-2 hover:bg-parish-darkGold shadow-lg transform active:scale-95 transition"
                    >
                        <Download size={18} /> Save Image
                    </button>
                </div>
            </div>
          </div>
      )}
    </div>
  );
};