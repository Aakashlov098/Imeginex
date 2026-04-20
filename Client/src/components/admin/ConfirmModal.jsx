import React from 'react';

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmLabel, variant }) {
  if (!isOpen) return null;

  const isDanger = variant === 'danger';

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        className="bg-[#13131f] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl transform transition-all scale-100 opacity-100"
      >
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${isDanger ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
          <span className="text-2xl">⚠️</span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 font-['Space_Grotesk']">{title}</h3>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/5">{message}</p>
        
        <div className="flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-lg font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 rounded-lg font-medium text-white transition-colors shadow-lg ${
              isDanger 
                ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' 
                : 'bg-yellow-500 hover:bg-yellow-600 shadow-yellow-500/20 text-black'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
