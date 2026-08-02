import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { getGateSession } from "@/lib/session.server";

function randomKey() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const block = () =>
    Array.from(
      crypto.getRandomValues(new Uint8Array(5)),
      (n) => alphabet[n % alphabet.length],
    ).join("");
  return `LACHY-${block()}-${block()}-${block()}-${block()}`;
}

async function requireAdmin() {
  const session = await getGateSession();
  return Boolean(session.data.admin);
}

const createSchema = z.object({ count: z.number().int().min(1).max(50), note: z.string().max(120).optional() });
const patchSchema = z.object({
  id: z.string().uuid(),
  action: z.enum(["revoke", "restore", "unbind", "delete"]),
});

export const Route = createFileRoute("/api/admin/keys")({
  server: {
    handlers: {
      GET: async () => {
        if (!(await requireAdmin())) return Response.json({ ok: false }, { status: 401 });
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data, error } = await supabaseAdmin
          .from("access_keys")
          .select("id, key, device_id, redeemed_at, revoked, note, created_at")
          .order("created_at", { ascending: false });
        if (error) return Response.json({ ok: false, error: error.message }, { status: 500 });
        return Response.json({ ok: true, keys: data ?? [] });
      },
      POST: async ({ request }) => {
        if (!(await requireAdmin())) return Response.json({ ok: false }, { status: 401 });
        const parsed = createSchema.safeParse(await request.json().catch(() => null));
        if (!parsed.success) return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
        const rows = Array.from({ length: parsed.data.count }, () => ({
          key: randomKey(),
          note: parsed.data.note ?? null,
        }));
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data, error } = await supabaseAdmin.from("access_keys").insert(rows).select("key");
        if (error) return Response.json({ ok: false, error: error.message }, { status: 500 });
        return Response.json({ ok: true, created: data?.map((r) => r.key) ?? [] });
      },
      PATCH: async ({ request }) => {
        if (!(await requireAdmin())) return Response.json({ ok: false }, { status: 401 });
        const parsed = patchSchema.safeParse(await request.json().catch(() => null));
        if (!parsed.success) return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
        const { id, action } = parsed.data;
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        if (action === "delete") {
          const { error } = await supabaseAdmin.from("access_keys").delete().eq("id", id);
          if (error) return Response.json({ ok: false, error: error.message }, { status: 500 });
          return Response.json({ ok: true });
        }
        const patch =
          action === "revoke"
            ? { revoked: true }
            : action === "restore"
              ? { revoked: false }
              : { device_id: null, redeemed_at: null };
        const { error } = await supabaseAdmin.from("access_keys").update(patch).eq("id", id);
        if (error) return Response.json({ ok: false, error: error.message }, { status: 500 });
        return Response.json({ ok: true });
      },
    },
  },
});
