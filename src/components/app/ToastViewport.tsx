"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, CircleAlert } from "lucide-react";
import { useAppState } from "@/components/AppStateProvider";
import { cn } from "@/lib/utils";

export function ToastViewport() {
  const { toasts, dismissToast } = useAppState();

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.button
            key={toast.id}
            type="button"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            onClick={() => dismissToast(toast.id)}
            className={cn(
              "pointer-events-auto flex items-start gap-3 rounded-3xl border px-4 py-3 text-left shadow-[0_24px_60px_-30px_rgba(6,18,33,0.45)] backdrop-blur-xl",
              toast.tone === "error"
                ? "border-red-400/30 bg-red-500/10 text-red-100 dark:bg-red-500/14"
                : "border-border/70 bg-background/86 text-foreground",
            )}
          >
            {toast.tone === "error" ? (
              <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
            ) : (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            )}
            <span className="text-sm font-medium">{toast.title}</span>
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}
