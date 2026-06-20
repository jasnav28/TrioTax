import * as React from "react";
import { ToastContext, type Toast } from "@/hooks/use-toast";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const toast = React.useCallback(({ title, description, type }: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <Toaster toasts={toasts} dismiss={dismiss} />
    </ToastContext.Provider>
  );
}

function Toaster({ toasts, dismiss }: { toasts: Toast[]; dismiss: (id: string) => void }) {
  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 w-full max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => {
          return <ToastItem key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />;
        })}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  React.useEffect(() => {
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={`pointer-events-auto flex w-full items-start justify-between rounded-xl p-4 shadow-lg border border-white/10 backdrop-blur-md ${
        toast.type === "destructive"
          ? "bg-red-950/90 text-red-200"
          : "bg-neutral-900/90 text-white"
      }`}
    >
      <div className="grid gap-1">
        {toast.title && <div className="text-sm font-semibold">{toast.title}</div>}
        {toast.description && (
          <div className="text-xs text-neutral-400">{toast.description}</div>
        )}
      </div>
      <button
        onClick={onDismiss}
        className="ml-4 rounded-md p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
}
