import { createFileRoute } from "@tanstack/react-router";
import { StaticVisualPage } from "@/components/StaticVisualPage";
import { requireUnlocked } from "@/lib/gate.functions";

export const Route = createFileRoute("/fc27")({
  ssr: false,
  loader: () => requireUnlocked(),
  head: () => ({
    meta: [
      { title: "FC27 Visual | Lachy's Visuals" },
      { name: "description", content: "The EA FC 27 pre-order visual experience from Lachy's Visuals." },
      { property: "og:title", content: "FC27 Visual | Lachy's Visuals" },
      { property: "og:description", content: "The EA FC 27 pre-order visual experience from Lachy's Visuals." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <StaticVisualPage slug="fc27" />,
});
