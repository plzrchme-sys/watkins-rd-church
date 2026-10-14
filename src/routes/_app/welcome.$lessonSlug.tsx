import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Fill, StudySection } from "@/components/welcome-study";
import { Verse } from "@/components/verse";
import { Mail, Printer } from "lucide-react";
import { answersMailto, getLesson, lessons, studyMentor, studyMeta } from "@/lib/welcome-study";
import { useWelcomeStudy } from "@/lib/welcome-study-store";

export const Route = createFileRoute("/_app/welcome/$lessonSlug")({
  head: ({ params }) => ({
    meta: [{ title: `${getLesson(params.lessonSlug)?.title ?? "Lesson"} · Watkins Rd.` }],
  }),
  component: LessonPage,
});

function LessonPage() {
  const { lessonSlug } = Route.useParams();
  const lesson = getLesson(lessonSlug);
  const answers = useWelcomeStudy((s) => s.answers);
  const setAnswer = useWelcomeStudy((s) => s.setAnswer);
  const done = useWelcomeStudy((s) => s.completed.includes(lessonSlug));
  const toggleComplete = useWelcomeStudy((s) => s.toggleComplete);
  const name = useWelcomeStudy((s) => s.name);
  const setName = useWelcomeStudy((s) => s.setName);

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

  const next = lessons.find((l) => l.number === lesson.number + 1);

  return (
    <article className="flex max-w-2xl flex-col gap-8">
      <header>
        <Link to="/welcome" className="text-sm text-muted">
          {studyMeta.title}
        </Link>
        <p className="mt-4 text-sm font-medium text-brass">
          Lesson {lesson.number} of {lessons.length}
        </p>
        <h1 className="mt-2 font-display text-4xl">{lesson.title}</h1>
        <p className="mt-3 text-base text-ink">{lesson.summary}</p>
        <p className="mt-6 text-xs font-medium tracking-widest text-muted uppercase">
          In this lesson
        </p>
        <ol className="mt-2 divide-y divide-line border-y border-line">
          {lesson.outline.map((item, i) => (
            <li key={item} className="py-2 text-ink">
              <span className="mr-3 font-display text-muted tabular-nums">0{i + 1}</span>
              {item}
            </li>
          ))}
        </ol>
      </header>

      {lesson.sections.map((section, i) => (
        <StudySection key={i} section={section} />
      ))}

      <section className="flex flex-col gap-4 rounded-2xl bg-wash p-5">
        <div>
          <p className="text-xs font-medium tracking-widest text-pine uppercase">
            End of lesson {lesson.number} · Check yourself
          </p>
          <h2 className="mt-1 font-display text-2xl">{studyMeta.quizTitle}</h2>
        </div>
        <ol className="flex flex-col gap-5">
          {lesson.quiz.map((item, i) => {
            const key = `${lesson.slug}-q${i}`;
            return (
              <li key={key}>
                <label htmlFor={key} className="flex gap-3 font-medium text-ink">
                  <span className="font-display text-pine">{i + 1}</span>
                  {item.q}
                </label>
                <p className="mt-1 pl-6 text-sm text-brass">
                  Read: <Verse refText={item.read} />
                </p>
                <textarea
                  id={key}
                  rows={3}
                  value={answers[key] ?? ""}
                  onChange={(e) => setAnswer(key, e.target.value)}
                  placeholder="Write your answer…"
                  className="mt-2 w-full rounded-xl border border-line bg-paper p-3 text-base"
                />
              </li>
            );
          })}
        </ol>
        <p className="text-sm text-muted">
          <Fill text={studyMeta.quizNote} />
        </p>
        <p className="text-xs text-muted">Answers are saved on this device only.</p>
        <div id="send-answers" className="flex flex-col gap-3 border-t border-line pt-4">
          <label htmlFor="study-name" className="text-sm font-medium text-ink">
            Your name (optional)
          </label>
          <input
            id="study-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className="min-h-11 rounded-xl border border-line bg-paper px-3 text-base"
          />
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a href={answersMailto(lesson, answers, name)}>
                <Mail className="size-4" aria-hidden />
                Send answers to {studyMentor}
              </a>
            </Button>
            <Button asChild tone="quiet">
              <Link to="/welcome/worksheet/$lessonSlug" params={{ lessonSlug: lesson.slug }}>
                <Printer className="size-4" aria-hidden />
                Printable worksheet
              </Link>
            </Button>
          </div>
          <p className="text-xs text-muted">Opens your email app with your answers filled in.</p>
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <Button tone={done ? "quiet" : "primary"} onClick={() => toggleComplete(lesson.slug)}>
          {done ? "Completed ✓ (undo)" : "Mark lesson complete"}
        </Button>
        {next ? (
          <Link
            to="/welcome/$lessonSlug"
            params={{ lessonSlug: next.slug }}
            className="inline-flex min-h-11 items-center text-pine"
          >
            Next: {next.title} →
          </Link>
        ) : (
          <Link to="/welcome" className="inline-flex min-h-11 items-center text-pine">
            Your first steps →
          </Link>
        )}
      </div>
    </article>
  );
}
