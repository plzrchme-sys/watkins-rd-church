import { createFileRoute, Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  church,
  sermons,
  upcomingGatherings,
  worshipParts,
  type DatedGathering,
} from "@/lib/church";

export const Route = createFileRoute("/_app/")({
  head: () => ({
    meta: [{ title: "Watkins Rd. church of Christ" }],
  }),
  component: Home,
});

function Home() {
  const [next, setNext] = useState<DatedGathering | null>(null);
  const latest = sermons[0];

  useEffect(() => {
    setNext(upcomingGatherings(new Date(), 1)[0] ?? null);
  }, []);

  return (
    <div className="flex flex-col gap-12">
      <section className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="text-sm font-medium text-muted">Columbus, Ohio</p>
          <h1 className="mt-3 max-w-xl font-display text-4xl text-ink sm:text-5xl">
            A warm welcome awaits you.
          </h1>
          <p className="mt-5 max-w-md font-display text-3xl text-balance text-pine sm:text-4xl">
            {church.motto}
          </p>
          <p className="mt-3 max-w-xl text-base text-ink">{church.mottoNote}</p>
          <p className="mt-4 max-w-xl text-base text-muted">
            Watkins Road church of Christ is a congregation dedicated to the restoration of New
            Testament Christianity. The Bible, and the Bible only, is the guide in religious
            matters. You only get to be a true visitor once.
          </p>
          <Button asChild className="mt-6">
            <a href={church.mapsUrl}>Directions</a>
          </Button>
        </div>

        <aside className="overflow-hidden rounded-2xl bg-pine text-paper">
          <img
            src="/building.jpg"
            alt="The meeting house of Watkins Road church of Christ"
            className="aspect-video w-full object-cover"
          />
          <div className="px-5 py-6">
            <p className="text-xs font-medium tracking-widest text-paper/70 uppercase">
              Next gathering
            </p>
            {next ? (
              <>
                <h2 className="mt-2 font-display text-3xl">{next.title}</h2>
                <p className="mt-2 text-sm text-paper/80">
                  {format(next.when, "EEEE, MMMM d")} · {next.label}
                </p>
                <p className="mt-3 text-sm text-paper/80">{next.detail}</p>
              </>
            ) : (
              <>
                <h2 className="mt-2 font-display text-3xl">Sunday morning worship</h2>
                <p className="mt-2 text-sm text-paper/80">Sundays · 10:00 AM</p>
                <p className="mt-3 text-sm text-paper/80">
                  Prayer, preaching, singing, the Lord’s supper, and giving.
                </p>
              </>
            )}
            <p className="mt-5 text-sm">
              <a href={church.mapsUrl} className="underline decoration-paper/40 underline-offset-2">
                {church.address}
                <br />
                {church.locality}
              </a>
            </p>
            <p className="mt-2 text-sm">
              <a
                href={church.phoneHref}
                className="underline decoration-paper/40 underline-offset-2"
              >
                {church.phone}
              </a>
            </p>
          </div>
        </aside>
      </section>

      <section>
        <h2 className="font-display text-2xl">What the assembly includes</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Services are simple and biblical. These are the parts the congregation publishes.
        </p>
        <ol className="mt-5 divide-y divide-line border-y border-line">
          {worshipParts.map((part, index) => (
            <li key={part.name} className="flex items-baseline justify-between gap-4 py-3">
              <span className="text-ink">
                <span className="mr-3 font-display text-muted tabular-nums">0{index + 1}</span>
                {part.name}
              </span>
              <span className="text-sm text-brass">{part.ref}</span>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm">
          <Link to="/singing" className="text-pine underline decoration-line underline-offset-2">
            Why the singing is without instruments
          </Link>
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl">Newly baptized?</h2>
        <Link
          to="/welcome"
          className="mt-4 flex min-h-16 flex-col justify-center rounded-2xl bg-wash px-5 py-5"
        >
          <span className="text-sm text-brass">A three-lesson study</span>
          <span className="font-display text-2xl text-ink">Welcome to the Family of God</span>
          <span className="mt-1 text-sm text-muted">
            What God did for you when you obeyed the gospel, and what He now requires of you
          </span>
        </Link>
      </section>

      <section>
        <h2 className="font-display text-2xl">From the archive</h2>
        <Link
          to="/sermons/$sermonId"
          params={{ sermonId: latest.id }}
          className="mt-4 flex min-h-16 flex-col justify-center border-y border-line py-4"
        >
          <span className="text-sm text-brass">{latest.scripture}</span>
          <span className="font-display text-2xl text-ink">{latest.title}</span>
          <span className="text-sm text-muted">{latest.speaker}</span>
        </Link>
      </section>
    </div>
  );
}
