import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Key Manager | Lachy's Visuals" },
      { name: "description", content: "Create, revoke and monitor Lachy's Visuals access keys." },
      { property: "og:title", content: "Key Manager | Lachy's Visuals" },
      { property: "og:description", content: "Create, revoke and monitor access keys." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

type KeyRow = {
  id: string;
  key: string;
  device_id: string | null;
  redeemed_at: string | null;
  revoked: boolean;
  note: string | null;
  created_at: string;
};

function Admin() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [keys, setKeys] = useState<KeyRow[]>([]);
  const [count, setCount] = useState(1);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  async function load() {
    const res = await fetch("/api/admin/keys", { credentials: "same-origin" });
    if (res.ok) {
      const data = await res.json();
      setKeys(data.keys ?? []);
      setAuthed(true);
    } else {
      setAuthed(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function login(e: FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setPassword("");
      await load();
    } else setError("Incorrect password.");
  }

  async function create() {
    setBusy(true);
    await fetch("/api/admin/keys", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ count, note: note || undefined }),
    });
    setNote("");
    await load();
    setBusy(false);
  }

  async function act(id: string, action: string) {
    setBusy(true);
    await fetch("/api/admin/keys", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id, action }),
    });
    await load();
    setBusy(false);
  }

  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
        <form onSubmit={login} className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-7">
          <h1 className="text-xl font-semibold">Key manager</h1>
          <p className="mt-1 text-sm text-white/50">Owner access only.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="mt-5 w-full rounded-lg border border-white/15 bg-black/60 px-3 py-2 text-sm outline-none focus:border-white/40"
          />
          {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
          <button className="mt-4 w-full rounded-lg bg-white px-3 py-2 text-sm font-semibold text-black">
            Enter
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-5 py-10 text-white">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="text-2xl font-semibold">Access keys</h1>
        <p className="mt-1 text-sm text-white/50">
          {keys.length} total · {keys.filter((k) => k.device_id).length} bound ·{" "}
          {keys.filter((k) => k.revoked).length} revoked
        </p>

        <div className="mt-6 flex flex-wrap items-end gap-3 rounded-2xl border border-white/10 bg-white/5 p-5">
          <label className="text-xs text-white/60">
            How many
            <input
              type="number"
              min={1}
              max={50}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="mt-1 block w-24 rounded-lg border border-white/15 bg-black/60 px-3 py-2 text-sm text-white"
            />
          </label>
          <label className="flex-1 text-xs text-white/60">
            Note (optional)
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Whop batch #4"
              className="mt-1 block w-full rounded-lg border border-white/15 bg-black/60 px-3 py-2 text-sm text-white"
            />
          </label>
          <button
            onClick={create}
            disabled={busy}
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black disabled:opacity-50"
          >
            Generate keys
          </button>
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-white/50">
              <tr>
                <th className="px-4 py-3">Key</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Note</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {keys.map((k) => (
                <tr key={k.id} className="border-t border-white/10">
                  <td className="px-4 py-3 font-mono text-xs">
                    <button
                      onClick={() => navigator.clipboard?.writeText(k.key)}
                      title="Copy"
                      className="hover:text-emerald-300"
                    >
                      {k.key}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {k.revoked ? (
                      <span className="text-red-400">Revoked</span>
                    ) : k.device_id ? (
                      <span className="text-emerald-400">Bound · {k.device_id.slice(0, 8)}…</span>
                    ) : (
                      <span className="text-white/50">Unused</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-white/60">{k.note ?? "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2 text-xs">
                      {k.device_id && (
                        <button onClick={() => act(k.id, "unbind")} className="rounded border border-white/20 px-2 py-1">
                          Unbind
                        </button>
                      )}
                      <button
                        onClick={() => act(k.id, k.revoked ? "restore" : "revoke")}
                        className="rounded border border-white/20 px-2 py-1"
                      >
                        {k.revoked ? "Restore" : "Revoke"}
                      </button>
                      <button
                        onClick={() => act(k.id, "delete")}
                        className="rounded border border-red-500/40 px-2 py-1 text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
