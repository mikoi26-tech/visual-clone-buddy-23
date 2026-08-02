import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { lvMarkup } from "@/content/lv-markup";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Member Access | Lachy's Visuals" },
      {
        name: "description",
        content:
          "Unlock the complete Lachy's Visuals interactive collection with one lifetime access key.",
      },
      { name: "theme-color", content: "#000000" },
      { property: "og:title", content: "Member Access | Lachy's Visuals" },
      {
        property: "og:description",
        content:
          "Six interactive visual experiences. One lifetime key unlocks the complete library.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: "/lv-styles.css" }],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/lv-page.js";
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: lvMarkup }} />;
}
