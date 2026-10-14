import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { useWelcomeStudy } from "@/lib/welcome-study-store";

export const Route = createFileRoute("/_app/welcome")({
  component: WelcomeLayout,
});

function WelcomeLayout() {
  useEffect(() => {
    void useWelcomeStudy.persist.rehydrate();
  }, []);
  return <Outlet />;
}
