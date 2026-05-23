import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBottle?: number | null;
  formatPrice: (price: number) => string;
}

const BOTTLES = [
  { id: 0, name: 'Obsidian', hex: '#111111' },
  { id: 1, name: 'Titanium', hex: '#d1d5db' },
  { id: 2, name: 'Bronze', hex: '#b08d57' },
];

export function OrderModal({ isOpen, onClose, initialBottle, formatPrice }: OrderModalProps) {
  const [step, setStep] = useState(1);
  const [selectedColor, setSelectedColor] = useState(initialBottle ?? 1);
  const [email, setEmail] = useState('');

  const handleNext = () => setStep(2);
  const handleConfirm = () => {
    setStep(3);
    setTimeout(() => {
      onClose();
      setStep(1);
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl pointer-events-auto"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ ease: [0.21, 0.47, 0.32, 0.98], duration: 0.5 }}
            className="w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl relative"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {step === 1 && (
              <div className="p-10 md:p-12">
                <div className="text-[10px] tracking-[0.2em] font-mono text-gray-400 uppercase mb-4">Milton Flagship</div>
                <h2 className="text-3xl font-display font-medium text-gray-900 mb-8">Acquire Your Milton</h2>
                
                <div className="mb-8">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-4">Select Finish</div>
                  <div className="flex gap-4">
                    {BOTTLES.map((bottle) => (
                      <button
                        key={bottle.id}
                        onClick={() => setSelectedColor(bottle.id)}
                        className={`group relative flex flex-col items-center gap-3 transition-opacity ${selectedColor === bottle.id ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
                      >
                        <div 
                          className={`w-12 h-12 rounded-full shadow-inner transition-transform duration-300 ${selectedColor === bottle.id ? 'scale-110 ring-2 ring-offset-4 ring-gray-900' : 'scale-100'}`}
                          style={{ backgroundColor: bottle.hex, border: bottle.id === 1 ? '1px solid #e5e7eb' : 'none' }}
                        />
                        <span className="text-[10px] font-mono tracking-wider uppercase text-gray-900">{bottle.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-end border-t border-gray-100 pt-8 mt-4">
                  <div>
                    <div className="text-[10px] font-mono tracking-widest text-gray-400 uppercase mb-1">Total</div>
                    <div className="text-2xl font-display font-medium text-gray-900">{formatPrice(199)}</div>
                  </div>
                  <button 
                    onClick={handleNext}
                    className="px-8 py-3 bg-gray-900 text-white font-medium rounded-full hover:scale-105 transition-transform text-sm tracking-widest uppercase shadow-lg shadow-gray-900/20"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="p-10 md:p-12">
                <button onClick={() => setStep(1)} className="text-[10px] uppercase tracking-[0.2em] font-mono text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-2 mb-8">
                  ← Back
                </button>
                <div className="text-[10px] tracking-[0.2em] font-mono text-gray-400 uppercase mb-4">Milton Flagship</div>
                <h2 className="text-3xl font-display font-medium text-gray-900 mb-8">Reserve Priority</h2>
                
                <div className="mb-8 space-y-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-2 block">Email Address</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all outline-none"
                    />
                  </div>
                  <p className="text-xs font-light text-gray-500 leading-relaxed">
                    By reserving, you secure your position on the waitlist. You will be notified 48 hours prior to public release. No payment required today.
                  </p>
                </div>

                <button 
                  onClick={handleConfirm}
                  disabled={!email}
                  className="w-full py-4 bg-gray-900 text-white font-medium rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform text-sm tracking-widest uppercase shadow-lg disabled:opacity-50 disabled:pointer-events-none"
                >
                  Join Waitlist
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="p-10 md:p-16 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.5, duration: 0.8 }}
                  className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center text-white mb-6"
                >
                  <Check className="w-8 h-8" />
                </motion.div>
                <h2 className="text-3xl font-display font-medium text-gray-900 mb-4">Position Secured</h2>
                <p className="text-gray-500 font-light text-sm max-w-[250px] leading-relaxed">
                  You are officially on the list for the {BOTTLES.find(b => b.id === selectedColor)?.name} edition. Keep an eye on your inbox.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
