import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { createHash, timingSafeEqual } from "node:crypto";
import { getGateSession } from "@/lib/session.server";

const bodySchema = z.object({ password: z.string().min(1).max(200) });

function matches(input: string, expected: string) {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

export const Route = createFileRoute("/api/admin/login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const parsed = bodySchema.safeParse(await request.json().catch(() => null));
        if (!parsed.success) {
          return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
        }
        const expected = process.env["ADMIN_PASSWORD"];
        if (!expected || !matches(parsed.data.password, expected)) {
          return Response.json({ ok: false, error: "Incorrect password." }, { status: 401 });
        }
        const session = await getGateSession();
        await session.update({ ...session.data, admin: true, unlocked: true });
        return Response.json({ ok: true });
      },
    },
  },
});
