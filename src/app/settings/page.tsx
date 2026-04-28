import { SettingsPanel } from "@/components/app/SettingsPanel";

export default function SettingsPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <span className="inline-flex rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          Preferences
        </span>
        <h1 className="heading-md">Settings</h1>
        <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
          Control theme behavior, translation defaults, and local saved history.
        </p>
      </div>
      <SettingsPanel />
    </section>
  );
}
