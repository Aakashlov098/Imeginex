import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function AdminModal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      <div className="relative bg-[#111118] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl transform transition-all duration-300 scale-100 opacity-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white font-['Syne']">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="font-['DM_Sans']">
          {children}
        </div>
      </div>
    </div>
  );
}
