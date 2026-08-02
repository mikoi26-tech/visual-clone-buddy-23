import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/activity")({
  server: {
    handlers: {
      POST: async () => Response.json({ ok: true }),
    },
  },
});
