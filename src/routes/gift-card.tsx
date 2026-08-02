import { createFileRoute } from "@tanstack/react-router";
import { StaticVisualPage } from "@/components/StaticVisualPage";
import { requireUnlocked } from "@/lib/gate.functions";

export const Route = createFileRoute("/gift-card")({
  ssr: false,
  loader: () => requireUnlocked(),
  head: () => ({
    meta: [
      { title: "Gift Card Visual | Lachy's Visuals" },
      { name: "description", content: "The gift card visual experience from Lachy's Visuals." },
      { property: "og:title", content: "Gift Card Visual | Lachy's Visuals" },
      { property: "og:description", content: "The gift card visual experience from Lachy's Visuals." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <StaticVisualPage slug="gift-card" />,
});
