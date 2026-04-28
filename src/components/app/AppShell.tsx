import { AppHeader } from "@/components/app/AppHeader";
import { ToastViewport } from "@/components/app/ToastViewport";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <AppHeader />
      <div className="page-shell pt-28 sm:pt-32">{children}</div>
      <ToastViewport />
    </div>
  );
}
