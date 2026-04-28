import Link from "next/link";
import { ArrowRight, Copy, Languages, PanelTop } from "lucide-react";
import { Button } from "@/components/ui/Button";

const features = [
  {
    title: "Arabic ↔ English translation",
    description:
      "Switch between Arabic and English with bilingual direction handling built into the interface.",
    icon: Languages,
  },
  {
    title: "Copy-ready results",
    description:
      "Move fast with one-click copy actions and clean output formatting for messages, content, and daily work.",
    icon: Copy,
  },
  {
    title: "Clean bilingual interface",
    description:
      "Readable cards, responsive layout, and balanced RTL/LTR behavior across desktop and mobile.",
    icon: PanelTop,
  },
];

export function HomeHero() {
  return (
    <div className="space-y-8">
      <section className="grid gap-8 overflow-hidden rounded-[2rem] border border-border/70 bg-background/60 p-6 shadow-[0_28px_80px_-40px_rgba(6,18,33,0.3)] backdrop-blur-xl md:grid-cols-[1.15fr_0.85fr] md:p-10 lg:p-12">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-primary/20 bg-primary-soft px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Arabic + English Workspace
          </span>
          <div className="space-y-4">
            <h1 className="heading-lg max-w-3xl">
              Translate Arabic and English instantly
            </h1>
            <p className="subheading max-w-2xl">
              Fast, clean, and accurate translation for everyday words, business
              messages, and content creation.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-2xl">
              <Link href="/translate">
                Start translating
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-2xl">
              <Link href="/history">View history</Link>
            </Button>
          </div>
        </div>

        <div className="relative flex min-h-[320px] items-center justify-center">
          <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.24),transparent_58%)]" />
          <div className="relative w-full max-w-md rounded-[1.75rem] border border-border/70 bg-card/85 p-5 shadow-[0_24px_70px_-36px_rgba(6,18,33,0.4)] backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
                Live preview
              </span>
              <span className="text-xs text-muted-foreground">Auto detect</span>
            </div>
            <div className="grid gap-4">
              <div className="rounded-[1.5rem] border border-border/60 bg-background/80 p-4">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  Arabic
                </p>
                <p className="font-arabic text-right text-lg leading-9" dir="rtl">
                  مرحبا، كيف يمكنني ترجمة هذه الرسالة بشكل واضح واحترافي؟
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-border/60 bg-background/80 p-4">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  English
                </p>
                <p className="text-lg leading-8">
                  Hello, how can I translate this message clearly and
                  professionally?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="card-grid md:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="rounded-[1.75rem] border border-border/70 bg-card/76 p-6 shadow-[0_24px_60px_-34px_rgba(6,18,33,0.24)] backdrop-blur-xl"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-semibold">{feature.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {feature.description}
              </p>
            </div>
          );
        })}
      </section>
    </div>
  );
}
