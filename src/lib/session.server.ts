import { useSession } from "@tanstack/react-start/server";

export type GateSession = { unlocked?: boolean; deviceId?: string; admin?: boolean };

export function gateSessionConfig() {
  return {
    password: process.env["SESSION_SECRET"]!,
    name: "lv-access",
    maxAge: 60 * 60 * 24 * 30,
    cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
  };
}

export async function getGateSession() {
  return useSession<GateSession>(gateSessionConfig());
}
