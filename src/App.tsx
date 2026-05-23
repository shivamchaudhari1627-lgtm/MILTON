import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ChevronRight, Droplets, ThermometerSnowflake, ShieldCheck, Sparkles as SparklesIcon, Layers } from 'lucide-react';
import { CustomCursor } from './components/ui/CustomCursor';
import { BottleScene } from './components/canvas/BottleScene';
import { BentoCard } from './components/ui/BentoCard';
import { OrderModal } from './components/ui/OrderModal';
import { useCurrency } from './hooks/useCurrency';

function Loader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-4xl font-display font-medium tracking-[0.2em] text-gray-900"
        >
          MILTON
        </motion.div>
        <motion.div 
          className="h-[1px] bg-gray-300 mt-6 origin-center"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "circInOut" }}
          style={{ width: "80px" }}
        />
      </div>
    </motion.div>
  );
}

function Navbar({ navTextColor, onPreOrder, onScrollToDesign, onScrollToTech }: { navTextColor: any, onPreOrder: () => void, onScrollToDesign: () => void, onScrollToTech: () => void }) {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 2.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 pointer-events-auto transition-colors duration-500"
    >
      <motion.div style={{ color: navTextColor }} className="text-xl font-display font-medium tracking-[0.2em]">
        MILTON
      </motion.div>
      <motion.div style={{ color: navTextColor }} className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase font-mono opacity-80">
        <button onClick={onScrollToDesign} className="hover:opacity-100 transition-opacity">Design</button>
        <button onClick={onScrollToTech} className="hover:opacity-100 transition-opacity">Technology</button>
      </motion.div>
      <button 
        onClick={onPreOrder}
        className="px-6 py-2.5 text-xs tracking-widest uppercase font-medium text-black bg-white border border-gray-200 shadow-sm rounded-full hover:bg-gray-100 transition-all hover:scale-105 active:scale-95">
        Pre-Order
      </button>
    </motion.nav>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [selectedBottle, setSelectedBottle] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(1000);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const { formatPrice, currencyCode, loading: currencyLoading } = useCurrency();

  useEffect(() => {
    setVh(window.innerHeight);
    const handleResize = () => setVh(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (selectedBottle !== null || orderModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedBottle, orderModalOpen]);

  const scrollToGallery = () => {
    window.scrollTo({ top: vh * 6.5, behavior: 'smooth' });
  };

  const scrollToDesign = () => {
    window.scrollTo({ top: vh * 1.5, behavior: 'smooth' });
  };

  const scrollToTech = () => {
    window.scrollTo({ top: vh * 3.5, behavior: 'smooth' });
  };

  const heroOpacity = useTransform(scrollY, [0, vh*0.4], [1, 0]);
  const heroY = useTransform(scrollY, [0, vh*0.4], [0, -50]);

  const explodeOpacity = useTransform(scrollY, [vh*0.8, vh*1.2, vh*1.8, vh*2.0], [0, 1, 1, 0]);
  const explodeY = useTransform(scrollY, [vh*0.8, vh*1.2], [50, 0]);

  const featureOpacity = useTransform(scrollY, [vh*1.8, vh*2.2, vh*2.8, vh*3.0], [0, 1, 1, 0]);
  const featureY = useTransform(scrollY, [vh*1.8, vh*2.2], [50, 0]);

  const tempOpacity = useTransform(scrollY, [vh*2.8, vh*3.2, vh*3.8, vh*4.0], [0, 1, 1, 0]);
  const tempY = useTransform(scrollY, [vh*2.8, vh*3.2], [50, 0]);

  const reassembleOpacity = useTransform(scrollY, [vh*3.8, vh*4.2, vh*4.8, vh*5.0], [0, 1, 1, 0]);
  const reassembleY = useTransform(scrollY, [vh*3.8, vh*4.2], [50, 0]);

  // Trio Scene
  const trioTitleOpacity = useTransform(scrollY, [vh*5.0, vh*5.5, vh*8.2, vh*8.6], [0, 1, 1, 0]);
  const trioTitleY = useTransform(scrollY, [vh*5.0, vh*5.5], [50, 0]);

  // Dark background transitions - keep it dark from the hero initially, then fade in trio lighting
  const darkBgOpacity = useTransform(scrollY, [0, vh*0.8, vh*4.8, vh*5.2, vh*8.6, vh*9.0], [1, 0, 0, 1, 1, 0]);
  const navTextColor = useTransform(scrollY, [0, vh*0.8, vh*4.8, vh*5.2, vh*8.6, vh*9.0], ["#ffffff", "#111827", "#111827", "#ffffff", "#ffffff", "#111827"]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = 'auto'; };
  }, []);

  return (
    <>
      <CustomCursor />
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && <Navbar navTextColor={navTextColor} onPreOrder={() => setOrderModalOpen(true)} onScrollToDesign={scrollToDesign} onScrollToTech={scrollToTech} />}

      <OrderModal 
        isOpen={orderModalOpen} 
        onClose={() => setOrderModalOpen(false)} 
        initialBottle={selectedBottle}
        formatPrice={formatPrice}
      />

      <div className="fixed inset-0 z-[-2] bg-gray-50 pointer-events-none" />
      <motion.div 
        style={{ opacity: darkBgOpacity }} 
        className="fixed inset-0 z-[-1] bg-[#060606] pointer-events-none" 
      />
      
      <BottleScene selectedBottle={selectedBottle} onSelectBottle={setSelectedBottle} />

      <main className="relative z-10 w-full text-gray-900 pointer-events-none">
        
        {/* SCROLL TRACK FOR 3D CANVAS & STICKY UI */}
        <div style={{ height: '900vh' }}>
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            
            {/* HERO UI */}
            <motion.div 
              style={{ opacity: heroOpacity, y: heroY, pointerEvents: heroOpacity.get() > 0 ? 'auto' : 'none' }}
              className="absolute inset-x-0 bottom-12 md:bottom-24 flex flex-col items-center text-center px-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-xs text-white font-mono tracking-widest mb-6">
                THE FLAGSHIP TUMBLER
              </div>
              <h1 className="text-5xl md:text-8xl font-display font-medium tracking-tight mb-4 text-white">
                Pure Luxury.<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600">Infinite Chill.</span>
              </h1>
              <p className="text-gray-200 max-w-lg mb-8 text-sm md:text-base font-light">
                Crafted from aerospace-grade titanium and double-walled vacuum insulation. The last bottle you'll ever need to buy.
              </p>
            </motion.div>

            {/* EXPLODED VIEW UI */}
            <motion.div 
              style={{ opacity: explodeOpacity, y: explodeY, pointerEvents: explodeOpacity.get() > 0 ? 'auto' : 'none' }}
              className="absolute inset-0 flex items-end md:items-center justify-end px-6 md:px-24 pb-20 md:pb-0 max-w-7xl mx-auto w-full"
            >
              <div className="w-full md:w-[45%] p-8 md:p-12 glass-panel rounded-[2rem]">
                 <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mb-6 border border-gray-200">
                    <Layers className="w-5 h-5 text-gray-700" />
                 </div>
                 <h2 className="text-3xl md:text-5xl font-display font-medium mb-4">
                   Engineered <br/><span className="text-gray-500">Perfection.</span>
                 </h2>
                 <p className="text-gray-600 leading-relaxed mb-6 font-light">
                   Every layer serves a purpose. The inner metallic core reflects heat, while the vacuum chamber completely halts thermal transfer.
                 </p>
                 <ul className="space-y-3 font-mono text-xs text-gray-500 tracking-wider">
                   <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-gray-400" /> Premium Heat Reflection</li>
                   <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-gray-400" /> True Vacuum Seal</li>
                   <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-gray-400" /> Matte Scratch-Resistant Finish</li>
                 </ul>
               </div>
            </motion.div>

            {/* FEATURES UI */}
            <motion.div 
              style={{ opacity: featureOpacity, y: featureY, pointerEvents: featureOpacity.get() > 0 ? 'auto' : 'none' }}
              className="absolute inset-0 flex items-end md:items-center justify-start px-6 md:px-24 pb-20 md:pb-0 max-w-7xl mx-auto w-full"
            >
              <div className="w-full md:w-[45%] text-left">
                 <h2 className="text-4xl md:text-7xl font-display font-medium mb-6">
                   Seamless <br/><span className="italic text-gray-500 font-serif">Aesthetics.</span>
                 </h2>
                 <p className="text-xl text-gray-600 leading-relaxed mb-8 font-light">
                   Designed to look stunning on your desk, in your car, or at the gym. No visible seams, no cheap plastics. Just monolithic luxury.
                 </p>
                 <button onClick={scrollToGallery} className="px-8 py-3 bg-gray-900 text-white font-medium rounded-full hover:scale-105 transition-transform text-sm tracking-widest uppercase shadow-lg shadow-gray-900/20">
                   View Gallery
                 </button>
              </div>
            </motion.div>

            {/* TEMPERATURE UI */}
            <motion.div 
              style={{ opacity: tempOpacity, y: tempY, pointerEvents: tempOpacity.get() > 0 ? 'auto' : 'none' }}
              className="absolute inset-0 flex flex-col md:flex-row items-end md:items-center justify-end px-6 md:px-24 pb-20 md:pb-0 max-w-7xl mx-auto w-full"
            >
              <div className="w-full md:w-1/2 flex gap-4 md:gap-8 justify-center md:justify-end">
                 <div className="glass-panel p-6 md:p-8 rounded-3xl text-center border-l-4 border-l-blue-400 flex-1 max-w-[200px] shadow-sm">
                    <ThermometerSnowflake className="w-8 h-8 text-blue-500 mx-auto mb-4" />
                    <div className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">24h</div>
                    <div className="text-xs uppercase tracking-widest text-gray-500 font-mono">Ice Cold</div>
                 </div>
                 <div className="glass-panel p-6 md:p-8 rounded-3xl text-center border-l-4 border-l-orange-400 flex-1 max-w-[200px] shadow-sm">
                    <Droplets className="w-8 h-8 text-orange-500 mx-auto mb-4" />
                    <div className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">12h</div>
                    <div className="text-xs uppercase tracking-widest text-gray-500 font-mono">Piping Hot</div>
                 </div>
              </div>
            </motion.div>

            {/* REASSEMBLE & FEATURES UI */}
            <motion.div 
              style={{ opacity: reassembleOpacity, y: reassembleY, pointerEvents: reassembleOpacity.get() > 0 ? 'auto' : 'none' }}
              className="absolute inset-x-0 bottom-12 md:bottom-24 flex flex-col items-center text-center px-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 bg-white/50 backdrop-blur-md text-xs text-indigo-600 font-mono tracking-widest mb-6">
                <SparklesIcon className="w-4 h-4" />
                THE COMPLETE PACKAGE
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-medium mb-6">
                Reassembled for <br/>
                <span className="text-gray-500">Everyday Life.</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                 <div className="px-6 py-3 rounded-full border border-gray-200 text-sm font-medium text-gray-600 bg-white shadow-sm flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" /> BPA Free
                 </div>
                 <div className="px-6 py-3 rounded-full border border-gray-200 text-sm font-medium text-gray-600 bg-white shadow-sm flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" /> Dishwasher Safe
                 </div>
                 <div className="px-6 py-3 rounded-full border border-gray-200 text-sm font-medium text-gray-600 bg-white shadow-sm flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" /> Leak Proof
                 </div>
              </div>
            </motion.div>

            {/* TRIO / BEYOND A BASIC BOTTLE UI */}
            {selectedBottle === null && (
              <motion.div 
                style={{ opacity: trioTitleOpacity, y: trioTitleY, pointerEvents: trioTitleOpacity.get() > 0 ? 'auto' : 'none' }}
                className="absolute inset-x-0 top-32 md:top-40 flex flex-col items-center text-center px-6 text-white"
              >
                <h2 className="text-5xl md:text-7xl font-display font-medium tracking-tight mb-6">The Collection.</h2>
                <p className="text-gray-400 max-w-lg mx-auto font-light text-sm md:text-base tracking-wide leading-relaxed">
                  Three uncompromising finishes. One extraordinary standard. A flagship experience designed for the modern aesthetic.
                </p>
                <div className="mt-16 flex gap-8 md:gap-16 justify-center pointer-events-auto items-center">
                  <button onClick={() => setSelectedBottle(0)} className="text-[10px] uppercase tracking-[0.2em] font-mono text-gray-400 hover:text-white transition-colors duration-500">
                    Obsidian
                  </button>
                  <div className="w-[1px] h-4 bg-white/10" />
                  <button onClick={() => setSelectedBottle(1)} className="text-[10px] uppercase tracking-[0.2em] font-mono text-gray-400 hover:text-white transition-colors duration-500">
                    Titanium
                  </button>
                  <div className="w-[1px] h-4 bg-white/10" />
                  <button onClick={() => setSelectedBottle(2)} className="text-[10px] uppercase tracking-[0.2em] font-mono text-gray-400 hover:text-white transition-colors duration-500">
                    Bronze
                  </button>
                </div>
              </motion.div>
            )}

            {/* DETAILED VIEW UI OVERLAY */}
            <AnimatePresence>
              {selectedBottle !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="absolute inset-0 z-50 pointer-events-auto flex flex-col justify-between p-6 md:p-16 text-white"
                >
                  <div className="flex justify-between items-start">
                    <button 
                      onClick={() => setSelectedBottle(null)}
                      className="group flex items-center gap-4 text-[10px] tracking-[0.2em] uppercase font-mono text-gray-400 hover:text-white transition-colors"
                    >
                      <span className="w-8 h-[1px] bg-gray-500 group-hover:bg-white transition-colors" /> Back
                    </button>
                    <div className="text-right pointer-events-none">
                      <h3 className="text-4xl md:text-6xl font-display font-medium text-white mb-4 tracking-tight">
                        {selectedBottle === 0 ? 'Obsidian.' : selectedBottle === 1 ? 'Titanium.' : 'Bronze.'}
                      </h3>
                      <p className="text-gray-400 font-light text-sm max-w-[280px] ml-auto leading-relaxed tracking-wide">
                        {selectedBottle === 0 && "Forged in shadow. The absolute absence of light. A matte finish that commands presence."}
                        {selectedBottle === 1 && "Aerospace-grade purity. Micro-blasted for a perfectly diffuse reflection. Unapologetically raw."}
                        {selectedBottle === 2 && "Warmth meets industrial strength. A unique metallic coating that catches the ambient room lighting beautifully."}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-end pb-8 w-full max-w-7xl mx-auto pointer-events-none">
                     <div className="space-y-8">
                       <div className="flex flex-col">
                         <span className="text-[9px] text-gray-500 font-mono tracking-[0.2em] uppercase mb-2">Exterior Profile</span>
                         <span className="text-sm font-light text-gray-200 tracking-wide">
                           {selectedBottle === 0 ? 'Matte PVD Coating' : selectedBottle === 1 ? 'Bead-Blasted Finish' : 'Anodized Texture'}
                         </span>
                       </div>
                       <div className="flex flex-col">
                         <span className="text-[9px] text-gray-500 font-mono tracking-[0.2em] uppercase mb-2">Availability</span>
                         <span className="text-sm font-light flex items-center gap-3 text-gray-200 tracking-wide">
                           <div className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" /> Reserve List
                         </span>
                       </div>
                     </div>
                     <button onClick={() => setOrderModalOpen(true)} className="px-10 py-5 bg-white/5 border border-white/10 backdrop-blur-md text-white font-mono hover:bg-white hover:text-black transition-all duration-500 text-[10px] tracking-[0.2em] uppercase pointer-events-auto group relative overflow-hidden">
                       <span className="relative z-10 font-bold transition-colors duration-500 group-hover:text-black">Acquire — {formatPrice(199)}</span>
                       <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] z-0" />
                     </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* STATIC BENTO / REVIEWS SECTION */}
        <section className="bg-white relative z-20 pointer-events-auto py-32 border-t border-gray-100">
           <div className="max-w-7xl mx-auto px-6">
             <div className="text-center mb-24">
                <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight mb-4 text-gray-900">Beyond a basic bottle.</h2>
                <p className="text-gray-600 max-w-xl mx-auto font-light">Experience the intersection of advanced technology and uncompromised luxury lifestyle.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <BentoCard 
                 title="Titanium Core" 
                 description="Sustainably sourced, practically indestructible aerospace elements."
                 icon={<ShieldCheck />}
                 className="min-h-[300px]"
                 style={{ backgroundColor: '#fafafa', border: '1px solid #eaeaea' }}
               />
               <BentoCard 
                 title="Ceramic Interior" 
                 description="Zero metallic taste. Pure flavor retention for your coffee or water."
                 icon={<SparklesIcon />}
                 className="md:col-span-2 min-h-[300px]"
                 style={{ backgroundColor: '#fafafa', border: '1px solid #eaeaea' }}
               >
                 <div className="absolute right-0 bottom-0 top-0 w-1/2 bg-[radial-gradient(ellipse_at_right,rgba(0,0,0,0.03),transparent_70%)] rounded-r-3xl pointer-events-none" />
               </BentoCard>
             </div>
           </div>
        </section>

        {/* FOOTER */}
        <footer className="py-24 px-6 md:px-12 border-t border-gray-100 relative z-20 bg-gray-50 flex flex-col md:flex-row items-center justify-between gap-12 pointer-events-auto text-center md:text-left">
          <div>
            <div className="text-3xl font-display font-medium tracking-[0.2em] text-gray-900 mb-2">
              MILTON
            </div>
            <div className="text-xs font-mono text-gray-500 tracking-wider">
              © {new Date().getFullYear()} MILTON.
            </div>
          </div>
          <div className="flex justify-center gap-8 text-xs tracking-widest uppercase font-mono text-gray-500">
            <a href="#" className="hover:text-gray-900 transition-colors">Instagram</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Twitter</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Contact</a>
          </div>
        </footer>
      </main>
    </>
  );
}
