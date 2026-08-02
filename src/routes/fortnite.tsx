import { createFileRoute } from "@tanstack/react-router";
import { StaticVisualPage } from "@/components/StaticVisualPage";
import { requireUnlocked } from "@/lib/gate.functions";

export const Route = createFileRoute("/fortnite")({
  ssr: false,
  loader: () => requireUnlocked(),
  head: () => ({
    meta: [
      { title: "Fortnite Visual | Lachy's Visuals" },
      { name: "description", content: "The Fortnite item shop visual experience from Lachy's Visuals." },
      { property: "og:title", content: "Fortnite Visual | Lachy's Visuals" },
      { property: "og:description", content: "The Fortnite item shop visual experience from Lachy's Visuals." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <StaticVisualPage slug="fortnite" />,
});
