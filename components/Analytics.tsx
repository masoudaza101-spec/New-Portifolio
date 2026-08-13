"use client";

import { useEffect } from "react";

const TRACKED_EVENTS = new Set([
  "CONTACT_CLICK",
  "GITHUB_CLICK",
  "LINKEDIN_CLICK",
  "LIVE_DEMO_CLICK",
  "PROJECT_VIEW",
  "WHATSAPP_CLICK",
]);

function sessionId(): string {
  let id = "";
  try {
    id = localStorage.getItem("aza_session_id") ?? "";
  } catch {
    // localStorage unavailable
  }
  if (!id) {
    id = crypto.randomUUID();
    try {
      localStorage.setItem("aza_session_id", id);
    } catch {
      // ignore
    }
  }
  return id;
}

function track(event: string, extra: Record<string, string | undefined> = {}) {
  fetch("/api/analytics", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      event,
      page: window.location.pathname,
      sessionId: sessionId(),
      ...extra,
    }),
    keepalive: true,
  }).catch(() => {
    // Analytics must never break the page.
  });
}

export default function Analytics() {
  useEffect(() => {
    track("PAGE_VIEW");

    function onClick(event: MouseEvent) {
      const target = (event.target as Element | null)?.closest?.(
        "[data-track]"
      ) as HTMLElement | null;
      if (!target) return;

      const name = target.getAttribute("data-track");
      if (!name || !TRACKED_EVENTS.has(name)) return;

      const projectId = target.getAttribute("data-project") ?? undefined;
      track(name, projectId ? { projectId } : {});
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
