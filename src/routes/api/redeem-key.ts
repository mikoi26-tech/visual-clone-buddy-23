import { createFileRoute } from "@tanstack/react-router";
import { useSession } from "@tanstack/react-start/server";
import { z } from "zod";

type GateSession = { unlocked?: boolean; deviceId?: string };

const bodySchema = z.object({
  key: z.string().min(8).max(64),
  deviceId: z.string().regex(/^[a-f0-9]{64}$/),
});

export const Route = createFileRoute("/api/redeem-key")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const parsed = bodySchema.safeParse(await request.json().catch(() => null));
        if (!parsed.success) {
          return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
        }
        const key = parsed.data.key.trim().toUpperCase();
        const { deviceId } = parsed.data;

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: row } = await supabaseAdmin
          .from("access_keys")
          .select("id, device_id, revoked")
          .eq("key", key)
          .maybeSingle();

        if (!row || row.revoked) {
          return Response.json({ ok: false, error: "Invalid or inactive key." }, { status: 401 });
        }

        let firstUse = false;
        if (!row.device_id) {
          firstUse = true;
          const { error } = await supabaseAdmin
            .from("access_keys")
            .update({ device_id: deviceId, redeemed_at: new Date().toISOString() })
            .eq("id", row.id)
            .is("device_id", null);
          if (error) {
            return Response.json({ ok: false, error: "Unable to link this key." }, { status: 500 });
          }
        } else if (row.device_id !== deviceId) {
          return Response.json(
            { ok: false, error: "This key is already linked to another device." },
            { status: 403 },
          );
        }

        const session = await useSession<GateSession>({
          password: process.env["SESSION_SECRET"]!,
          name: "lv-access",
          maxAge: 60 * 60 * 24 * 30,
          cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
        });
        await session.update({ unlocked: true, deviceId });

        return Response.json({ ok: true, firstUse, redirect: "/app" });
      },
    },
  },
});
