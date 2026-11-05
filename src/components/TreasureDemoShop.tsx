import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Compass, FlaskConical, Gem, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import treasure from "@/assets/treasure-emblem.png";

const collections = [
  { name: "Buccaneer Bundle", subtitle: "Compass + 4,500 demo coins", tone: "violet", label: "BUNDLE", number: "01" },
  { name: "Pirate Collection", subtitle: "The signature treasure collection", tone: "gold", label: "FEATURED", number: "02" },
  { name: "Captain’s Treasure", subtitle: "Compass + 12,500 demo coins", tone: "copper", label: "COLLECTOR", number: "03" },
];

export function TreasureDemoShop() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState<(typeof collections)[number] | null>(null);
  const visible = collections.filter((item) => `${item.name} ${item.subtitle}`.toLowerCase().includes(filter.toLowerCase()));

  return (
    <main className="treasure-shop">
      <div className="treasure-demo-strip"><FlaskConical size={14} /> FICTIONAL DEMO · NO PURCHASES, REAL CURRENCY, OR GIFTS</div>
      <header className="treasure-header">
        <Button asChild variant="ghost" className="treasure-back"><Link to="/app"><ArrowLeft /> Library</Link></Button>
        <span className="treasure-brand"><Compass size={22} /> TRYHARD VISUALS</span>
        <span className="treasure-edition">COLLECTION / 001</span>
      </header>

      <section className="treasure-intro">
        <p className="treasure-eyebrow">THE SEVEN SEAS COLLECTION</p>
        <h1>PIRATE SHOP<span className="treasure-title-star">✦</span></h1>
        <div className="treasure-intro-bottom">
          <p>Discover a little treasure.</p>
          <span><Gem size={16} /> Original fictional collectibles</span>
        </div>
      </section>

      <section className="treasure-collection" aria-label="Demo collections">
        <div className="treasure-toolbar">
          <div><h2>Explore the collection</h2><p>{visible.length} demo collections available</p></div>
          <form className="treasure-search" onSubmit={(event) => { event.preventDefault(); setFilter(query.trim()); }}>
            <Search size={18} />
            <input aria-label="Search collections" placeholder="Search collections" value={query} onChange={(event) => { setQuery(event.target.value); if (!event.target.value) setFilter(""); }} />
            <Button type="submit" className="treasure-search-button">Search</Button>
          </form>
        </div>

        <div className="treasure-grid">
          {visible.map((item) => (
            <article key={item.number} className={`treasure-card treasure-card-${item.tone}`}>
              <div className="treasure-card-top"><span>{item.label}</span><span>{item.number}</span></div>
              <h3>{item.name}</h3>
              <p>{item.subtitle}</p>
              <img src={treasure} width={1024} height={1024} alt="Original gold compass medallion with a turquoise gem and silver demo coins" />
              <div className="treasure-card-bottom"><span>DEMO COLLECTION<br /><strong>Not for sale</strong></span><Button variant="ghost" size="icon" className="treasure-preview" aria-label={`Preview ${item.name}`} title={`Preview ${item.name}`} onClick={() => setSelected(item)}><ArrowUpRight /></Button></div>
            </article>
          ))}
        </div>
        {visible.length === 0 && <div className="treasure-empty"><Search size={28} /><h3>No collections found</h3><Button variant="outline" onClick={() => { setQuery(""); setFilter(""); }}>Clear search</Button></div>}
      </section>
      <footer className="treasure-footer"><span>TRYHARD VISUALS / PIRATE COLLECTION</span><p>Fictional items. No connection to Fortnite or Epic Games.</p></footer>

      {selected && <div className="treasure-modal-backdrop" onClick={() => setSelected(null)}><section className="treasure-modal" role="dialog" aria-modal="true" aria-labelledby="treasure-preview-title" onClick={(event) => event.stopPropagation()} onKeyDown={(event) => { if (event.key === "Escape") setSelected(null); }}>
        <Button autoFocus variant="ghost" size="icon" className="treasure-modal-close" aria-label="Close preview" onClick={() => setSelected(null)}><X /></Button>
        <span className="treasure-eyebrow">FICTIONAL COLLECTION PREVIEW</span>
        <img src={treasure} alt="Gold compass collectible" width={1024} height={1024} />
        <h2 id="treasure-preview-title">{selected.name}</h2><p>{selected.subtitle}</p>
        <div className="treasure-preview-notice"><FlaskConical size={18} /><span>Demo only. This item cannot be purchased, sent, or redeemed.</span></div>
        <Button className="treasure-search-button" onClick={() => setSelected(null)}>Back to collection</Button>
      </section></div>}
    </main>
  );
}