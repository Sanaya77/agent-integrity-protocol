"use client";

import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export interface ToastMessage {
  id: string;
  text: string;
  type: "success" | "error" | "info";
}

interface Props {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export default function ToastContainer({ toasts, onDismiss }: Props) {
  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border shadow-xl backdrop-blur-xl animate-in slide-in-from-bottom-5 transition-all ${
            toast.type === "success"
              ? "bg-[#08201a]/90 border-green-500/30 text-green-300"
              : toast.type === "error"
              ? "bg-[#250d11]/90 border-red-500/30 text-red-300"
              : "bg-[#0b1b36]/90 border-cyan-500/30 text-cyan-300"
          }`}
        >
          {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />}
          {toast.type === "error" && <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />}
          {toast.type === "info" && <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />}

          <p className="text-xs font-medium flex-1 leading-relaxed">{toast.text}</p>

          <button
            onClick={() => onDismiss(toast.id)}
            className="text-gray-400 hover:text-white p-1 transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
