"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX, FiXCircle } from "react-icons/fi";

type ToastType = "success" | "error" | "info" | "warning";

type Toast = {
  id: number;
  message: string;
  type: ToastType;
};

type ToastContextValue = {
  toast: (message: string, type?: ToastType) => void;
  dismiss: (id: number) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const toastStyles: Record<ToastType, { icon: typeof FiCheckCircle; iconClass: string; barClass: string }> = {
  success: { icon: FiCheckCircle, iconClass: "text-emerald-600", barClass: "bg-emerald-500" },
  error: { icon: FiXCircle, iconClass: "text-red-600", barClass: "bg-red-500" },
  info: { icon: FiInfo, iconClass: "text-blue-600", barClass: "bg-blue-500" },
  warning: { icon: FiAlertCircle, iconClass: "text-amber-600", barClass: "bg-amber-500" },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback((message: string, type: ToastType = "info") => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current.slice(-3), { id, message, type }]);
    window.setTimeout(() => dismiss(id), 4500);
  }, [dismiss]);

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return <ToastContext.Provider value={value}>
    {children}
    <div className="pointer-events-none fixed right-4 top-5 z-[100] flex w-[calc(100vw-2rem)] flex-col items-end gap-3 sm:w-96" aria-live="polite" aria-atomic="true">
      {toasts.map(({ id, message, type }) => {
        const { icon: Icon, iconClass, barClass } = toastStyles[type];
        return <div key={id} role="status" className="pointer-events-auto relative w-full overflow-hidden rounded-2xl border border-[#eadfe2] bg-white p-4 pr-11 shadow-[0_16px_45px_rgba(83,27,47,0.16)]">
          <div className="flex items-start gap-3"><Icon className={`mt-0.5 shrink-0 ${iconClass}`} size={20} /><p className="text-sm font-semibold leading-5 text-[#443442]">{message}</p></div>
          <button onClick={() => dismiss(id)} aria-label="Dismiss notification" className="absolute right-3 top-3 rounded-lg p-1 text-[#a799a0] hover:bg-[#fbf7f2] hover:text-[#443442]"><FiX size={16} /></button>
          <span className={`absolute inset-x-0 bottom-0 h-1 ${barClass}`} />
        </div>;
      })}
    </div>
  </ToastContext.Provider>;
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider");
  return context;
}
