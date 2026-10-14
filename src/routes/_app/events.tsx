import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { church, gatherings, upcomingGatherings, type DatedGathering } from "@/lib/church";

export const Route = createFileRoute("/_app/events")({
  head: () => ({ meta: [{ title: "Events · Watkins Rd." }] }),
  component: EventsPage,
});

function EventsPage() {
  const [upcoming, setUpcoming] = useState<DatedGathering[] | null>(null);

  useEffect(() => {
    setUpcoming(upcomingGatherings(new Date(), 8));
  }, []);

  return (
    <div>
      <p className="text-sm font-medium text-muted">At the building</p>
      <h1 className="mt-2 font-display text-4xl">Gatherings</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted">
        The weekly rhythm published by Watkins Road church of Christ. Every meeting is at{" "}
        {church.address}, {church.locality}.
      </p>

      <h2 className="mt-10 font-display text-2xl">Each week</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {gatherings.map((gathering) => (
          <li key={gathering.id} className="rounded-2xl border border-line bg-paper p-4">
            <p className="text-xs font-medium text-muted">{gathering.label}</p>
            <h3 className="mt-1 font-display text-xl">{gathering.title}</h3>
            <p className="mt-2 text-sm text-muted">{gathering.detail}</p>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 font-display text-2xl">Coming up</h2>
      {upcoming === null ? (
        <p className="mt-3 text-sm text-muted">The next dates follow the weekly rhythm above.</p>
      ) : (
        <ol className="mt-4 divide-y divide-line border-y border-line">
          {upcoming.map((item) => (
            <li key={`${item.id}-${item.when.toISOString()}`} className="flex gap-4 py-4">
              <time
                dateTime={item.when.toISOString()}
                className="w-28 shrink-0 text-sm text-muted tabular-nums"
              >
                {format(item.when, "EEE, MMM d")}
              </time>
              <div>
                <p className="font-medium text-ink">
                  {item.title}
                  <span className="text-muted"> · {item.label}</span>
                </p>
                <p className="text-sm text-muted">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
