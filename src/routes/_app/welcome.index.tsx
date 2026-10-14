import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Download } from "lucide-react";
import { Verse } from "@/components/verse";
import { Fill, StudySection } from "@/components/welcome-study";
import { closing, firstSteps, lessons, studyMeta } from "@/lib/welcome-study";
import { useWelcomeStudy } from "@/lib/welcome-study-store";

export const Route = createFileRoute("/_app/welcome/")({
  head: () => ({ meta: [{ title: `${studyMeta.title} · Watkins Rd.` }] }),
  component: StudyIndex,
});

function StudyIndex() {
  const completed = useWelcomeStudy((s) => s.completed);

  return (
    <div className="flex max-w-2xl flex-col gap-10">
      <header>
        <p className="text-sm font-medium text-muted">{studyMeta.eyebrow}</p>
        <h1 className="mt-2 font-display text-4xl">{studyMeta.title}</h1>
        <p className="mt-4 text-base text-ink">{studyMeta.subtitle}</p>
        <p className="mt-3 text-sm text-muted">{studyMeta.byline}</p>
        <p className="mt-4 text-sm text-pine">
          {completed.length} of {lessons.length} lessons complete
        </p>
        <a
          href="/welcome-to-the-family-of-god.pptx"
          download="Welcome to the Family of God.pptx"
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-sm font-medium text-pine hover:bg-wash"
        >
          <Download className="size-4" aria-hidden />
          Download the slides (PowerPoint)
        </a>
      </header>

      <ol className="flex flex-col gap-3">
        {lessons.map((lesson) => {
          const done = completed.includes(lesson.slug);
          return (
            <li key={lesson.slug}>
              <Link
                to="/welcome/$lessonSlug"
                params={{ lessonSlug: lesson.slug }}
                className="flex gap-4 rounded-2xl border border-line bg-paper p-5 hover:bg-wash"
              >
                <span
                  className={`flex size-11 shrink-0 items-center justify-center rounded-full font-display text-xl ${
                    done ? "bg-pine text-paper" : "bg-wash text-pine"
                  }`}
                >
                  {done ? <Check className="size-5" aria-label="Complete" /> : lesson.number}
                </span>
                <span>
                  <span className="block text-xs font-medium tracking-widest text-muted uppercase">
                    Lesson {lesson.number} of {lessons.length}
                  </span>
                  <span className="block font-display text-2xl text-ink">{lesson.title}</span>
                  <span className="mt-1 block text-sm text-muted">{lesson.summary}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      <section className="flex flex-col gap-4 border-t border-line pt-8">
        <div>
          <p className="text-xs font-medium tracking-widest text-muted uppercase">
            {firstSteps.kicker}
          </p>
          <h2 className="mt-1 font-display text-2xl">{firstSteps.title}</h2>
        </div>
        <ol className="divide-y divide-line border-y border-line">
          {firstSteps.items.map((item, i) => (
            <li key={item.text} className="flex gap-3 py-3">
              <span className="font-display text-muted tabular-nums">{i + 1}</span>
              <span>
                <span className="block text-ink">
                  <Fill text={item.text} />
                </span>
                <span className="block text-sm text-brass">
                  <Verse refText={item.ref} />
                </span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      {closing.map((section) => (
        <StudySection key={section.kicker} section={section} />
      ))}
    </div>
  );
}
