import { Fragment, type ReactNode } from "react";
import type { Block, Section } from "@/lib/welcome-study";
import { useWelcomeStudy } from "@/lib/welcome-study-store";
import { Verse } from "@/components/verse";

/** Renders text, highlighting [placeholders] so they are obviously still to be filled in. */
export function Fill({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, i) =>
        /^\[[^\]]+\]$/.test(part) ? (
          <mark
            key={i}
            title="To be filled in"
            className="rounded border border-dashed border-brass bg-brass/10 px-1 text-brass"
          >
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

function RefLine({ children }: { children: ReactNode }) {
  return <p className="mt-2 text-sm text-brass">{children}</p>;
}

function LineBody({ text }: { text: string }) {
  const m = text.match(/^(.*\()([^)]+)(\))$/);
  if (!m) return <Fill text={text} />;
  return (
    <>
      {m[1]}
      <Verse refText={m[2]} className="text-brass" />
      {m[3]}
    </>
  );
}

function Line({ text }: { text: string }) {
  const [body, ref] = text.split(" — ");
  return (
    <li className="py-2">
      <LineBody text={body} />
      {ref ? (
        <span className="block text-sm text-brass">
          <Verse refText={ref} />
        </span>
      ) : null}
    </li>
  );
}

function WriteIn({ id, title, count }: { id: string; title: string; count: number }) {
  const answers = useWelcomeStudy((s) => s.answers);
  const setAnswer = useWelcomeStudy((s) => s.setAnswer);
  return (
    <div className="rounded-2xl border border-line p-5">
      <p className="font-display text-lg text-ink">{title}</p>
      <ol className="mt-3 flex flex-col gap-2">
        {Array.from({ length: count }, (_, i) => (
          <li key={i} className="flex items-center gap-3">
            <span className="w-5 text-muted tabular-nums">{i + 1}.</span>
            <input
              aria-label={`${title} ${i + 1}`}
              value={answers[`${id}-${i}`] ?? ""}
              onChange={(e) => setAnswer(`${id}-${i}`, e.target.value)}
              className="min-h-11 flex-1 rounded-xl border border-line bg-paper px-3 text-base"
            />
          </li>
        ))}
      </ol>
    </div>
  );
}

export function StudyBlock({ block }: { block: Block }) {
  switch (block.kind) {
    case "lead":
      return (
        <div>
          <p className="text-base text-ink">
            <Fill text={block.text} />
          </p>
          {block.ref ? (
            <RefLine>
              <Verse refText={block.ref} />
            </RefLine>
          ) : null}
        </div>
      );
    case "scripture":
      return (
        <figure className="rounded-2xl bg-wash px-5 py-6">
          <blockquote className="font-display text-xl text-pine-deep sm:text-2xl">
            {block.text}
          </blockquote>
          <figcaption className="mt-3 text-sm font-medium text-brass">
            <Verse refText={block.ref} />
          </figcaption>
          {block.note ? <p className="mt-2 text-sm text-muted">{block.note}</p> : null}
        </figure>
      );
    case "points":
      return (
        <ul className="grid gap-3 sm:grid-cols-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 rounded-2xl border border-line bg-paper p-4">
              {block.numbered ? (
                <span className="font-display text-xl text-pine tabular-nums">{i + 1}</span>
              ) : null}
              <div>
                {item.title ? <p className="font-medium text-ink">{item.title}</p> : null}
                {item.text ? (
                  <p className={item.title ? "mt-1 text-sm text-muted" : "text-base text-ink"}>
                    <Fill text={item.text} />
                  </p>
                ) : null}
                {item.ref ? (
                  <p className="mt-2 text-sm text-brass">
                    <Verse refText={item.ref} />
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <aside className="rounded-2xl border-l-4 border-brass bg-brass/5 px-4 py-4">
          <p className="text-xs font-semibold tracking-widest text-brass uppercase">
            {block.label}
          </p>
          <p className="mt-1 text-base text-ink">
            <Fill text={block.text} />
          </p>
          {block.ref ? (
            <p className="mt-1 text-sm text-brass">
              <Verse refText={block.ref} />
            </p>
          ) : null}
        </aside>
      );
    case "case":
      return (
        <div className="flex flex-col gap-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-paper p-5">
              <p className="text-xs font-semibold tracking-widest text-muted uppercase">Then</p>
              <p className="text-sm text-muted">First century</p>
              <p className="mt-3 text-base text-ink">{block.then.text}</p>
              <p className="mt-3 text-sm text-brass">
                <Verse refText={block.then.ref} />
              </p>
            </div>
            <div className="rounded-2xl bg-pine p-5 text-paper">
              <p className="text-xs font-semibold tracking-widest text-paper/70 uppercase">Now</p>
              <p className="text-sm text-paper/70">Today</p>
              <p className="mt-3 text-base">{block.now.text}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-pine/30 px-5 py-4">
            <p className="text-xs font-semibold tracking-widest text-pine uppercase">The lesson</p>
            <p className="mt-1 text-base text-ink">{block.lesson.text}</p>
            <p className="mt-1 text-sm text-brass">
              <Verse refText={block.lesson.ref} />
            </p>
          </div>
        </div>
      );
    case "definition":
      return (
        <div className="rounded-2xl border border-line p-5">
          <p className="font-display text-3xl text-pine italic">{block.term}</p>
          <p className="mt-2 text-base text-ink">{block.text}</p>
          <p className="mt-3 text-sm text-muted">{block.note}</p>
          <p className="mt-1 text-sm text-brass">
            <Verse refText={block.ref} />
          </p>
        </div>
      );
    case "stats":
      return (
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {block.items.map((item) => (
            <div key={item.value} className="rounded-2xl bg-wash p-4">
              <dt className="font-display text-2xl text-pine">{item.value}</dt>
              <dd className="mt-1 text-sm text-muted">{item.label}</dd>
            </div>
          ))}
        </dl>
      );
    case "columns":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {block.items.map((col) => (
            <div key={col.label} className="rounded-2xl border border-line p-5">
              <p className="text-xs font-semibold tracking-widest text-pine uppercase">
                {col.label}
              </p>
              {col.title ? <p className="mt-1 font-display text-xl">{col.title}</p> : null}
              {col.ref ? (
                <p className="mt-1 text-sm text-brass">
                  <Verse refText={col.ref} />
                </p>
              ) : null}
              <ul className="mt-2 divide-y divide-line text-base text-ink">
                {col.lines.map((line) => (
                  <Line key={line} text={line} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    case "table":
      return (
        <div>
          {block.title ? <p className="mb-2 font-display text-lg">{block.title}</p> : null}
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-left text-sm">
              <thead className="bg-wash text-xs tracking-widest text-pine uppercase">
                <tr>
                  {block.headers.map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {block.rows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, i) => (
                      <td
                        key={i}
                        className={`px-4 py-3 align-top ${i === row.length - 1 && row.length > 2 ? "text-brass" : "text-ink"}`}
                      >
                        {i === row.length - 1 && row.length > 2 ? <Verse refText={cell} /> : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    case "writeIn":
      return <WriteIn id={block.id} title={block.title} count={block.count} />;
  }
}

export function StudySection({ section }: { section: Section }) {
  return (
    <section className="flex flex-col gap-4 border-t border-line pt-8">
      <div>
        <p className="text-xs font-medium tracking-widest text-muted uppercase">{section.kicker}</p>
        {section.title ? <h2 className="mt-1 font-display text-2xl">{section.title}</h2> : null}
      </div>
      {section.blocks.map((block, i) => (
        <StudyBlock key={i} block={block} />
      ))}
    </section>
  );
}
