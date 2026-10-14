import { createFileRoute, Link } from "@tanstack/react-router";
import { format, parseISO } from "date-fns";
import { Bookmark } from "lucide-react";
import { useMemo, useState } from "react";
import { church, sermons } from "@/lib/church";
import { useLocalChurch } from "@/lib/local-church";

export const Route = createFileRoute("/_app/sermons/")({
  head: () => ({ meta: [{ title: "Sermons · Watkins Rd." }] }),
  component: SermonsPage,
});

const series = ["All", ...Array.from(new Set(sermons.map((sermon) => sermon.series)))];

function SermonsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const saved = useLocalChurch((state) => state.savedSermonIds);
  const toggleSaved = useLocalChurch((state) => state.toggleSaved);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return sermons.filter((sermon) => {
      if (filter !== "All" && sermon.series !== filter) return false;
      if (!needle) return true;
      return `${sermon.title} ${sermon.scripture} ${sermon.speaker} ${sermon.book}`
        .toLowerCase()
        .includes(needle);
    });
  }, [filter, query]);

  return (
    <div>
      <p className="text-sm font-medium text-muted">Archive</p>
      <h1 className="mt-2 font-display text-4xl">Sermon library</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted">
        These are published recordings from Watkins Road, not a stand-in for this Sunday’s sermon.
        The full channel is on{" "}
        <a className="text-pine underline decoration-line underline-offset-2" href={church.channelUrl}>
          YouTube
        </a>{" "}
        and the{" "}
        <a className="text-pine underline decoration-line underline-offset-2" href={church.podcastUrl}>
          podcast
        </a>
        .
      </p>

      <label className="mt-6 block">
        <span className="sr-only">Search sermons</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search title, scripture, or speaker"
          className="min-h-11 w-full rounded-xl border border-line bg-paper px-3 text-sm text-ink placeholder:text-muted"
        />
      </label>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Series">
        {series.map((name) => {
          const active = filter === name;
          return (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(name)}
              className={`min-h-11 shrink-0 rounded-full px-4 text-sm ${
                active ? "bg-pine text-paper" : "border border-line bg-paper text-ink"
              }`}
            >
              {name}
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="mt-10 text-sm text-muted">No sermons match that search.</p>
      ) : (
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {visible.map((sermon) => {
            const marked = saved.includes(sermon.id);
            return (
              <li key={sermon.id} className="flex items-stretch gap-2 py-1">
                <Link
                  to="/sermons/$sermonId"
                  params={{ sermonId: sermon.id }}
                  className="flex min-h-16 flex-1 flex-col justify-center py-3"
                >
                  <span className="text-xs text-brass">{sermon.scripture}</span>
                  <span className="font-display text-xl text-ink">{sermon.title}</span>
                  <span className="text-sm text-muted">
                    {sermon.speaker} · {format(parseISO(sermon.date), "MMMM d, yyyy")}
                  </span>
                </Link>
                <button
                  type="button"
                  aria-pressed={marked}
                  aria-label={marked ? `Unsave ${sermon.title}` : `Save ${sermon.title}`}
                  onClick={() => toggleSaved(sermon.id)}
                  className={`grid size-11 shrink-0 place-items-center self-center rounded-full ${
                    marked ? "bg-pine text-paper" : "text-muted hover:bg-paper"
                  }`}
                >
                  <Bookmark className="size-4" aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
