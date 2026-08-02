import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { redirect } from "@tanstack/react-router";

type GateSession = { unlocked?: boolean; deviceId?: string };

function config() {
  return {
    password: process.env["SESSION_SECRET"]!,
    name: "lv-access",
    maxAge: 60 * 60 * 24 * 30,
    cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
  };
}

export const requireUnlocked = createServerFn({ method: "GET" }).handler(async () => {
  const session = await useSession<GateSession>(config());
  if (!session.data.unlocked) throw redirect({ to: "/" });
  return { deviceId: session.data.deviceId ?? null };
});

export const lockSite = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<GateSession>(config());
  await session.clear();
  return { ok: true as const };
});
