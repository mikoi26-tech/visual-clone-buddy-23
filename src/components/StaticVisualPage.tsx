import { useEffect, useRef } from "react";

type PageMeta = {
  title: string;
  css: { href: string }[];
  scripts: { src: string; type?: string | null }[];
  bodyClass?: string;
};

/**
 * Renders one of the exported static visual pages (public/pages/<slug>.html)
 * with its original stylesheets and scripts, in order.
 */
export function StaticVisualPage({ slug }: { slug: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const added: Element[] = [];
    const bodyClasses: string[] = [];

    (async () => {
      const meta: PageMeta = await fetch(`/pages/${slug}.json`).then((r) => r.json());
      const html = await fetch(`/pages/${slug}.html`).then((r) => r.text());
      if (cancelled) return;

      for (const sheet of meta.css) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = sheet.href;
        document.head.appendChild(link);
        added.push(link);
      }

      if (meta.bodyClass) {
        for (const cls of meta.bodyClass.split(/\s+/).filter(Boolean)) {
          document.body.classList.add(cls);
          bodyClasses.push(cls);
        }
      }

      if (hostRef.current) hostRef.current.innerHTML = html;

      for (const entry of meta.scripts) {
        if (cancelled) return;
        await new Promise<void>((resolve) => {
          const script = document.createElement("script");
          if (entry.type) script.type = entry.type;
          script.src = entry.src;
          script.async = false;
          script.onload = () => resolve();
          script.onerror = () => resolve();
          document.body.appendChild(script);
          added.push(script);
        });
      }
    })();

    return () => {
      cancelled = true;
      for (const el of added) el.remove();
      for (const cls of bodyClasses) document.body.classList.remove(cls);
      if (hostRef.current) hostRef.current.innerHTML = "";
    };
  }, [slug]);

  return <div ref={hostRef} style={{ display: "contents" }} />;
}
