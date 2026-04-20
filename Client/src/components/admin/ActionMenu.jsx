import React, { useState, useEffect, useRef } from 'react';

export default function ActionMenu({ actions }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative inline-flex text-left" ref={menuRef}>
      <button 
        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
      >
        ⋯
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 rounded-xl bg-[#1a1a2e] border border-white/10 shadow-xl z-30 py-1 overflow-hidden origin-top-right transition-all duration-200 transform scale-100 opacity-100">
          {actions.map((action, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
                action.onClick();
              }}
              className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors ${
                action.variant === 'danger' 
                  ? 'text-red-400 hover:bg-red-500/10' 
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {action.icon && <span>{action.icon}</span>}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
