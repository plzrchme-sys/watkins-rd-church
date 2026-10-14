import { Link, useRouterState } from "@tanstack/react-router";
import {
  AudioLines,
  BookOpen,
  Sprout,
  CalendarDays,
  HandHeart,
  House,
  Users,
  Wallet,
} from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { church } from "@/lib/church";
import { useLocalChurch } from "@/lib/local-church";

const nav = [
  { to: "/", label: "Home", icon: House },
  { to: "/sermons", label: "Sermons", icon: BookOpen },
  { to: "/events", label: "Events", icon: CalendarDays },
  { to: "/groups", label: "Groups", icon: Users },
  { to: "/prayer", label: "Prayer", icon: HandHeart },
  { to: "/giving", label: "Give", icon: Wallet },
] as const;

const desktopNav = [
  nav[0],
  { to: "/singing", label: "Singing", icon: AudioLines },
  { to: "/welcome", label: "New Christians", icon: Sprout },
  ...nav.slice(1),
] as const;

const mobileNav = [
  ...nav.slice(1, 5),
  { to: "/welcome", label: "New", icon: Sprout },
  nav[5],
] as const;

function isActive(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function Shell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    void useLocalChurch.persist.rehydrate();
  }, []);

  return (
    <div className="min-h-screen md:grid print:block md:grid-cols-[15rem_1fr]">
      <aside className="sticky top-0 hidden h-screen print:hidden flex-col border-r border-line bg-paper md:flex">
        <Link to="/" className="block px-6 pt-8 pb-8">
          <Mark motto />
        </Link>
        <nav className="flex flex-1 flex-col gap-1 px-3" aria-label="Sections">
          {desktopNav.map((item) => {
            const active = isActive(pathname, item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium ${
                  active ? "bg-pine text-paper" : "text-muted hover:bg-wash hover:text-ink"
                }`}
              >
                <Icon className="size-4" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="flex items-center justify-between border-b border-line bg-parchment px-4 py-3 md:hidden print:hidden">
          <Link to="/" className="min-h-11">
            <Mark />
          </Link>
          <a
            href={church.phoneHref}
            className="inline-flex min-h-11 items-center text-sm font-medium text-pine"
          >
            Call
          </a>
        </header>
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 pt-6 pb-28 md:px-10 md:pt-10 md:pb-16 print:p-0">
          {children}
        </main>
      </div>

      <nav
        className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-6 border-t border-line bg-paper/95 backdrop-blur md:hidden print:hidden"
        aria-label="Sections"
      >
        {mobileNav.map((item) => {
          const active = isActive(pathname, item.to);
          const Icon = item.icon;
          const give = item.to === "/giving";
          return (
            <Link
              key={item.to}
              to={item.to}
              className={
                give
                  ? "mx-1 my-2 flex min-h-12 flex-col items-center justify-center gap-1 rounded-2xl bg-pine text-xs font-medium text-paper"
                  : `flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-medium ${
                      active ? "text-pine" : "text-muted"
                    }`
              }
            >
              <Icon className="size-5" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

function Mark({ motto = false }: { motto?: boolean }) {
  return (
    <span className="block leading-tight">
      <span className="block font-display text-lg tracking-tight text-ink">Watkins Rd.</span>
      <span className="mt-1 block border-t border-line pt-1 text-xs tracking-wide text-muted">
        church of Christ
      </span>
      {motto ? (
        <span className="mt-3 block font-display text-sm text-pine">{church.motto}</span>
      ) : null}
    </span>
  );
}
