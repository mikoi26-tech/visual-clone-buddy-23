import { createFileRoute } from "@tanstack/react-router";
import { StaticVisualPage } from "@/components/StaticVisualPage";
import { requireUnlocked } from "@/lib/gate.functions";

export const Route = createFileRoute("/cash-app")({
  ssr: false,
  loader: () => requireUnlocked(),
  head: () => ({
    meta: [
      { title: "Cash App Visual | Tryhard Visuals" },
      { name: "description", content: "The Cash App visual experience from Tryhard Visuals." },
      { property: "og:title", content: "Cash App Visual | Tryhard Visuals" },
      { property: "og:description", content: "The Cash App visual experience from Tryhard Visuals." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <StaticVisualPage slug="cash-app" />,
});
