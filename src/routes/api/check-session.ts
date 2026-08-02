import { createFileRoute } from "@tanstack/react-router";
import { useSession } from "@tanstack/react-start/server";

export type GateSession = { unlocked?: boolean; deviceId?: string };

export const sessionConfig = {
  password: process.env["SESSION_SECRET"] ?? "",
  name: "lv-access",
  maxAge: 60 * 60 * 24 * 30,
  cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
};

export const Route = createFileRoute("/api/check-session")({
  server: {
    handlers: {
      GET: async () => {
        const config = { ...sessionConfig, password: process.env["SESSION_SECRET"]! };
        const session = await useSession<GateSession>(config);
        return Response.json({
          ok: true,
          authenticated: Boolean(session.data.unlocked),
          deviceId: session.data.deviceId ?? null,
        });
      },
    },
  },
});
