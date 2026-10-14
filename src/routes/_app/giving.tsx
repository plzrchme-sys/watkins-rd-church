import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { church } from "@/lib/church";

export const Route = createFileRoute("/_app/giving")({
  head: () => ({ meta: [{ title: "Giving · Watkins Rd." }] }),
  component: GivingPage,
});

function GivingPage() {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-medium tracking-wide text-brass">1 Corinthians 16:1–2</p>
      <h1 className="mt-2 font-display text-4xl">Giving</h1>
      <p className="mt-4 text-base text-ink">
        On the first day of the week the congregation gives, as part of the worship already
        described in its order of service. This app does not collect a card, a bank account, or a
        gift amount.
      </p>

      <section className="mt-8 rounded-2xl bg-pine px-5 py-6 text-paper">
        <h2 className="font-display text-2xl">Give online</h2>
        <p className="mt-2 text-sm text-paper/80">
          Continue on the church website. If a separate giving page is published later, this button
          is the one place that link should change.
        </p>
        <Button asChild tone="quiet" className="mt-5 bg-paper">
          <a href={church.givingUrl} target="_blank" rel="noreferrer">
            Open the church site
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        </Button>
        <p className="mt-3 text-xs text-paper/70">{church.givingUrl}</p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-2xl">Give in the assembly</h2>
        <p className="mt-2 text-sm text-muted">
          The collection is received in Sunday worship at 10:00 AM, at {church.address},{" "}
          {church.locality}. Questions can go to the office at{" "}
          <a className="text-pine underline decoration-line underline-offset-2" href={church.phoneHref}>
            {church.phone}
          </a>
          .
        </p>
      </section>
    </div>
  );
}
