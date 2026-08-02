import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { requireUnlocked, lockSite } from "@/lib/gate.functions";

export const Route = createFileRoute("/app")({
  ssr: false,
  loader: () => requireUnlocked(),
  head: () => ({
    meta: [
      { title: "Your Library | Lachy's Visuals" },
      { name: "description", content: "Your unlocked Lachy's Visuals library." },
      { property: "og:title", content: "Your Library | Lachy's Visuals" },
      { property: "og:description", content: "Your unlocked Lachy's Visuals library." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: "/lv-styles.css" }],
  }),
  component: Library,
});

function Library() {
  const router = useRouter();
  const lock = useServerFn(lockSite);

  return (
    <main className="wall">
      <nav className="site-nav" aria-label="Site status">
        <div className="site-brand">
          <span className="site-brand-mark">LV</span>
          <span>
            Lachy's Visuals<small>Premium visual suite</small>
          </span>
        </div>
        <span className="nav-status">
          <i></i>Access unlocked
        </span>
      </nav>
      <div className="box" style={{ marginTop: 24, padding: 28, textAlign: "center" }}>
        <div className="eyebrow">Your library</div>
        <h1 style={{ fontSize: 44 }}>Unlocked.</h1>
        <p className="sub">
          Your key is verified and bound to this device. Upload the library files and they'll
          appear here.
        </p>
        <div className="support-wrap">
          <button
            type="button"
            className="support-button"
            onClick={async () => {
              await lock();
              router.navigate({ to: "/", search: { logout: "1" } as never });
            }}
          >
            <span>Log out</span>
          </button>
        </div>
      </div>
    </main>
  );
}
