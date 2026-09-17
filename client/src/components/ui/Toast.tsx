import React, { useState, useEffect } from 'react';

export interface ToastMessage {
  id: string;
  type: 'error' | 'success' | 'outbid' | 'info';
  title: string;
  message: string;
}

export const ToastContainer: React.FC<{
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`pointer-events-auto comic-border-lg p-4 animate-pop-in ${
            toast.type === 'outbid'
              ? 'bg-comic-red text-white shadow-comic-red'
              : toast.type === 'error'
              ? 'bg-red-800 text-white'
              : toast.type === 'success'
              ? 'bg-green-700 text-white'
              : 'bg-black text-comic-yellow'
          }`}
          onClick={() => onDismiss(toast.id)}
        >
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="comic-font text-lg tracking-wide uppercase flex items-center gap-1.5">
              {toast.type === 'outbid' && '⚡ OUTBID!'}
              {toast.type === 'error' && '⚠️ ERROR'}
              {toast.type === 'success' && '🏆 SUCCESS'}
              {toast.type === 'info' && '📢 NOTICE'}
            </span>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-xs font-black uppercase bg-black/40 hover:bg-black/60 px-1.5 py-0.5"
            >
              ✕
            </button>
          </div>
          <p className="text-sm font-semibold">{toast.message}</p>
        </div>
      ))}
    </div>
  );
};
