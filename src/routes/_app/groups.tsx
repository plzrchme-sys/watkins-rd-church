import { createFileRoute } from "@tanstack/react-router";
import { groups } from "@/lib/church";

export const Route = createFileRoute("/_app/groups")({
  head: () => ({ meta: [{ title: "Groups · Watkins Rd." }] }),
  component: GroupsPage,
});

function GroupsPage() {
  return (
    <div>
      <p className="text-sm font-medium text-muted">Meet with the church</p>
      <h1 className="mt-2 font-display text-4xl">Groups</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted">
        Classes and ministries drawn from the congregation’s published schedule and listing. No
        sign-up is required to visit a class.
      </p>
      <ul className="mt-8 flex flex-col gap-4">
        {groups.map((group) => (
          <li key={group.id} className="rounded-2xl border border-line bg-paper p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-2xl">{group.title}</h2>
              <p className="text-sm text-muted">{group.when}</p>
            </div>
            <p className="mt-2 text-sm font-medium text-ink">{group.who}</p>
            <p className="mt-2 text-sm text-muted">{group.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
