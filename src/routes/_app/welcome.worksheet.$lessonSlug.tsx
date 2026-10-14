import { createFileRoute, Link } from "@tanstack/react-router";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Fill } from "@/components/welcome-study";
import { getLesson, lessons, studyMeta } from "@/lib/welcome-study";

export const Route = createFileRoute("/_app/welcome/worksheet/$lessonSlug")({
  head: ({ params }) => ({
    meta: [
      { title: `Worksheet: ${getLesson(params.lessonSlug)?.title ?? "Lesson"} · Watkins Rd.` },
    ],
  }),
  component: Worksheet,
});

function Worksheet() {
  const { lessonSlug } = Route.useParams();
  const lesson = getLesson(lessonSlug);
  if (!lesson) {
    return (
      <div>
        <h1 className="font-display text-4xl">Lesson not found</h1>
        <Link to="/welcome" className="mt-6 inline-flex min-h-11 items-center text-pine">
          Back to the study
        </Link>
      </div>
    );
  }
  return (
    <article className="max-w-2xl print:max-w-none">
      <div className="mb-6 flex flex-wrap items-center gap-3 print:hidden">
        <Button onClick={() => window.print()}>
          <Printer className="size-4" aria-hidden />
          Print
        </Button>
        <Link
          to="/welcome/$lessonSlug"
          params={{ lessonSlug: lesson.slug }}
          className="inline-flex min-h-11 items-center text-sm text-pine"
        >
          Back to lesson {lesson.number}
        </Link>
      </div>
      <p className="text-sm text-muted">{studyMeta.title}</p>
      <p className="mt-1 text-xs font-medium tracking-widest text-brass uppercase">
        End of lesson {lesson.number} of {lessons.length} · Check yourself
      </p>
      <h1 className="mt-2 font-display text-3xl">{lesson.title}</h1>
      <p className="mt-1 font-display text-xl text-pine">{studyMeta.quizTitle}</p>
      <p className="mt-6 flex items-end gap-2 text-sm text-ink">
        Name <span className="block h-6 flex-1 border-b border-ink/40" />
      </p>
      <ol className="mt-8 flex flex-col gap-8">
        {lesson.quiz.map((item, i) => (
          <li key={item.q} className="break-inside-avoid">
            <p className="flex gap-3 font-medium text-ink">
              <span className="font-display text-pine">{i + 1}</span>
              {item.q}
            </p>
            <p className="mt-1 pl-6 text-sm text-brass">Read: {item.read}</p>
            <div className="mt-2 flex flex-col pl-6">
              {[0, 1, 2, 3].map((n) => (
                <span key={n} className="block h-8 border-b border-ink/30" />
              ))}
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-10 text-sm text-muted">
        <Fill text={studyMeta.quizNote} />
      </p>
    </article>
  );
}
