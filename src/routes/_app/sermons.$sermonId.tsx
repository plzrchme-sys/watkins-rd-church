import { createFileRoute, Link } from "@tanstack/react-router";
import { format, parseISO } from "date-fns";
import { Bookmark, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sermonById } from "@/lib/church";
import { useLocalChurch } from "@/lib/local-church";

export const Route = createFileRoute("/_app/sermons/$sermonId")({
  head: ({ params }) => ({
    meta: [{ title: `${sermonById(params.sermonId)?.title ?? "Sermon"} · Watkins Rd.` }],
  }),
  component: SermonDetail,
});

function SermonDetail() {
  const { sermonId } = Route.useParams();
  const sermon = sermonById(sermonId);
  const saved = useLocalChurch((state) => state.savedSermonIds.includes(sermonId));
  const toggleSaved = useLocalChurch((state) => state.toggleSaved);

  if (!sermon) {
    return (
      <div>
        <h1 className="font-display text-4xl">Sermon not found</h1>
        <p className="mt-3 text-sm text-muted">That recording is not in this archive.</p>
        <Link to="/sermons" className="mt-6 inline-flex min-h-11 items-center text-pine">
          Back to the library
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-2xl">
      <Link to="/sermons" className="text-sm text-muted">
        Sermon library
      </Link>
      <p className="mt-4 text-sm font-medium text-brass">{sermon.scripture}</p>
      <h1 className="mt-2 font-display text-4xl">{sermon.title}</h1>
      <p className="mt-3 text-sm text-muted">
        {sermon.speaker}
        <span aria-hidden="true"> · </span>
        {format(parseISO(sermon.date), "MMMM d, yyyy")}
        <span aria-hidden="true"> · </span>
        {sermon.series}
      </p>
      <p className="mt-6 text-base text-ink">{sermon.summary}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <a href={sermon.listenUrl} target="_blank" rel="noreferrer">
            Listen
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        </Button>
        <Button type="button" tone="quiet" onClick={() => toggleSaved(sermon.id)}>
          <Bookmark className="size-4" aria-hidden="true" />
          {saved ? "Saved on this device" : "Save on this device"}
        </Button>
      </div>
    </article>
  );
}
