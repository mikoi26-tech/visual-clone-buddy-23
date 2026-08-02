import { createFileRoute } from "@tanstack/react-router";
import { StaticVisualPage } from "@/components/StaticVisualPage";
import { requireUnlocked } from "@/lib/gate.functions";

export const Route = createFileRoute("/2k27")({
  ssr: false,
  loader: () => requireUnlocked(),
  head: () => ({
    meta: [
      { title: "NBA 2K27 Visual | Tryhard Visuals" },
      { name: "description", content: "The NBA 2K27 edition visual experience from Tryhard Visuals." },
      { property: "og:title", content: "NBA 2K27 Visual | Tryhard Visuals" },
      { property: "og:description", content: "The NBA 2K27 edition visual experience from Tryhard Visuals." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <StaticVisualPage slug="2k27" />,
});
