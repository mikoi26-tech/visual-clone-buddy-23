import { createFileRoute } from "@tanstack/react-router";
import { StaticVisualPage } from "@/components/StaticVisualPage";
import { requireUnlocked } from "@/lib/gate.functions";

export const Route = createFileRoute("/app")({
  ssr: false,
  loader: () => requireUnlocked(),
  head: () => ({
    meta: [
      { title: "Visuals Hub | Tryhard Visuals" },
      { name: "description", content: "Browse every interactive visual in the Tryhard Visuals library." },
      { property: "og:title", content: "Visuals Hub | Tryhard Visuals" },
      { property: "og:description", content: "Browse every interactive visual in the Tryhard Visuals library." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <StaticVisualPage slug="app" />,
});
