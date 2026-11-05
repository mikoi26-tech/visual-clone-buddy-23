import { createFileRoute } from "@tanstack/react-router";
import { TreasureDemoShop } from "@/components/TreasureDemoShop";
import { requireUnlocked } from "@/lib/gate.functions";

export const Route = createFileRoute("/fortnite")({
  ssr: false,
  loader: () => requireUnlocked(),
  head: () => ({
    meta: [
      { title: "Pirate Shop Demo | Tryhard Visuals" },
      { name: "description", content: "Explore an original fictional pirate collection. A visual demo only, with no purchases, currency, or gifts." },
      { property: "og:title", content: "Pirate Shop Demo | Tryhard Visuals" },
      { property: "og:description", content: "Original fictional pirate collectibles in a gold-and-purple demo shop. Nothing is for sale." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TreasureDemoShop,
});
