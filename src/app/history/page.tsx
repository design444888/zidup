import { HistoryList } from "@/components/app/HistoryList";

export default function HistoryPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <span className="inline-flex rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          Translation history
        </span>
        <h1 className="heading-md">Recent saved translations</h1>
        <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
          Your recent Arabic and English translations are stored locally in this
          browser for quick reuse.
        </p>
      </div>
      <HistoryList />
    </section>
  );
}
