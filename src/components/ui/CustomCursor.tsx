import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] h-8 w-8 rounded-full border border-white/30 mix-blend-difference hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isVisible ? 1 : 0,
        }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] h-2 w-2 rounded-full bg-white mix-blend-difference hidden md:block"
        style={{
          x: useSpring(useMotionValue(cursorX.get() + 12), { damping: 40, stiffness: 400 }),
          y: useSpring(useMotionValue(cursorY.get() + 12), { damping: 40, stiffness: 400 }),
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
