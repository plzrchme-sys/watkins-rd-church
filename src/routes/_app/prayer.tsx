import { createFileRoute } from "@tanstack/react-router";
import { format, parseISO } from "date-fns";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { useLocalChurch, type PrayerKind } from "@/lib/local-church";

export const Route = createFileRoute("/_app/prayer")({
  head: () => ({ meta: [{ title: "Prayer · Watkins Rd." }] }),
  component: PrayerPage,
});

const kinds: { id: PrayerKind; label: string }[] = [
  { id: "petition", label: "A need" },
  { id: "thanksgiving", label: "Thanks" },
  { id: "church", label: "The church" },
];

function PrayerPage() {
  const prayers = useLocalChurch((state) => state.prayers);
  const addPrayer = useLocalChurch((state) => state.addPrayer);
  const togglePrayed = useLocalChurch((state) => state.togglePrayed);
  const removePrayer = useLocalChurch((state) => state.removePrayer);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [kind, setKind] = useState<PrayerKind>("petition");
  const [error, setError] = useState("");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (text.trim().length < 3) {
      setError("Write a short request first.");
      return;
    }
    addPrayer({ name, text, kind });
    setName("");
    setText("");
    setKind("petition");
    setError("");
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p className="text-sm font-medium text-muted">Private to this device</p>
        <h1 className="mt-2 font-display text-4xl">Prayer</h1>
        <p className="mt-3 text-sm text-muted">
          The assembly prays together (Acts 2:42). This list is only a reminder for you. It is
          saved in this browser and is not shared with the church or stored on a server.
        </p>
        <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3">
          <label className="text-sm">
            <span className="mb-1 block text-muted">Name, if you want it</span>
            <input
              value={name}
              maxLength={40}
              onChange={(event) => setName(event.target.value)}
              className="w-full min-h-11 rounded-xl border border-line bg-paper px-3 text-ink"
            />
          </label>
          <fieldset>
            <legend className="mb-1 text-sm text-muted">Kind</legend>
            <div className="flex flex-wrap gap-2">
              {kinds.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={kind === item.id}
                  onClick={() => setKind(item.id)}
                  className={`min-h-11 rounded-full px-4 text-sm ${
                    kind === item.id ? "bg-pine text-paper" : "border border-line bg-paper text-ink"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </fieldset>
          <label className="text-sm">
            <span className="mb-1 block text-muted">Request</span>
            <textarea
              value={text}
              maxLength={500}
              rows={4}
              onChange={(event) => setText(event.target.value)}
              className="w-full rounded-xl border border-line bg-paper px-3 py-3 text-ink"
            />
          </label>
          {error ? <p className="text-sm text-ink">{error}</p> : null}
          <Button type="submit" className="self-start">
            Add to my list
          </Button>
        </form>
      </div>

      <div>
        <h2 className="font-display text-2xl">My list</h2>
        {prayers.length === 0 ? (
          <p className="mt-3 text-sm text-muted">
            Nothing here yet. Add a name, a thanks, or a need for the church.
          </p>
        ) : (
          <ul className="mt-4 flex flex-col gap-3">
            {prayers.map((prayer) => (
              <li key={prayer.id} className="rounded-2xl border border-line bg-paper p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-xs font-medium text-muted">
                    {kinds.find((item) => item.id === prayer.kind)?.label}
                    {prayer.name ? ` · ${prayer.name}` : ""}
                  </p>
                  <time className="text-xs text-muted tabular-nums" dateTime={prayer.createdAt}>
                    {format(parseISO(prayer.createdAt), "MMM d")}
                  </time>
                </div>
                <p className={`mt-2 text-sm ${prayer.prayed ? "text-muted line-through" : "text-ink"}`}>
                  {prayer.text}
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => togglePrayed(prayer.id)}
                    className="min-h-11 rounded-full px-3 text-sm text-pine"
                  >
                    {prayer.prayed ? "Mark as still open" : "Mark as prayed"}
                  </button>
                  <button
                    type="button"
                    onClick={() => removePrayer(prayer.id)}
                    className="min-h-11 rounded-full px-3 text-sm text-muted"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
