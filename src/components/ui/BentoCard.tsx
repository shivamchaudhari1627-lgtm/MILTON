import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface BentoCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export function BentoCard({ title, description, icon, delay = 0, className, children, ...props }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        "bg-white/80 backdrop-blur-2xl border border-gray-200 shadow-sm rounded-3xl p-8 relative overflow-hidden group flex flex-col justify-between hover:bg-gray-50 transition-colors duration-500",
        className
      )}
      {...props}
    >
      {/* Subtle hover gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="z-10 relative">
        {icon && (
          <div className="mb-6 h-12 w-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-indigo-500 group-hover:text-indigo-600 group-hover:scale-110 transition-all duration-500">
            {icon}
          </div>
        )}
        <h3 className="text-xl md:text-2xl font-display font-medium text-gray-900 mb-3">
          {title}
        </h3>
        <p className="text-gray-500 leading-relaxed max-w-sm">
          {description}
        </p>
      </div>

      {children && (
        <div className="mt-8 z-10 relative flex-grow">
          {children}
        </div>
      )}
    </motion.div>
  );
}
