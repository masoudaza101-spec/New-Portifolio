"use client";

import { useCallback, useEffect, useState } from "react";
import { apiGet } from "@/components/admin/api";
import { AdminCard, ErrorBanner, PageHeader } from "@/components/admin/ui";

type AnalyticsResponse = {
  pageViews: number;
  projectViews: number;
  breakdown: { event: string; _count: { _all: number } }[];
  recent: {
    id: string;
    event: string;
    page: string | null;
    projectId: string | null;
    sessionId: string | null;
    createdAt: string;
  }[];
};

const eventTones: Record<string, string> = {
  PAGE_VIEW: "text-[var(--accent-cyan)]",
  PROJECT_VIEW: "text-[var(--accent-violet)]",
  CONTACT_CLICK: "text-[var(--accent-gold)]",
  GITHUB_CLICK: "text-[var(--accent-green)]",
  LINKEDIN_CLICK: "text-[var(--accent-cyan)]",
  LIVE_DEMO_CLICK: "text-[var(--accent-gold)]",
  WHATSAPP_CLICK: "text-[var(--accent-green)]",
};

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const result = await apiGet<AnalyticsResponse>("/api/analytics");
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load analytics.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const result = await apiGet<AnalyticsResponse>("/api/analytics");
        if (cancelled) return;
        setData(result);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to load analytics.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleRefresh() {
    setLoading(true);
    await refresh();
  }

  return (
    <div>
      <PageHeader
        title="Analytics"
        description="Aggregated traffic and engagement"
        actions={
          <button
            type="button"
            onClick={handleRefresh}
            className="rounded-xl border border-white/[0.1] px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:border-[var(--accent-gold)]/40 hover:text-[var(--accent-gold)]"
          >
            Refresh
          </button>
        }
      />

      <ErrorBanner message={error} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminCard title="Total page views">
          {loading ? (
            <p className="py-6 text-sm text-muted-foreground">Loading…</p>
          ) : (
            <p className="mt-3 font-display text-5xl font-bold text-[var(--accent-cyan)]">
              {data?.pageViews ?? 0}
            </p>
          )}
        </AdminCard>
        <AdminCard title="Project views">
          {loading ? (
            <p className="py-6 text-sm text-muted-foreground">Loading…</p>
          ) : (
            <p className="mt-3 font-display text-5xl font-bold text-[var(--accent-violet)]">
              {data?.projectViews ?? 0}
            </p>
          )}
        </AdminCard>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminCard title="By event">
          {!loading && data ? (
            <ul className="mt-4 flex flex-col gap-2">
              {data.breakdown.map((row) => (
                <li
                  key={row.event}
                  className="flex items-center justify-between rounded-lg bg-[#0a0d14] px-4 py-3"
                >
                  <span className={`font-mono text-xs uppercase tracking-wider ${eventTones[row.event] ?? "text-muted-foreground"}`}>
                    {row.event}
                  </span>
                  <span className="font-display text-lg font-bold">{row._count._all}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">Loading…</p>
          )}
        </AdminCard>

        <AdminCard title="Recent events">
          {!loading && data ? (
            <ul className="mt-4 flex max-h-[28rem] flex-col gap-2 overflow-y-auto">
              {data.recent.length === 0 ? (
                <li className="text-sm text-muted-foreground">No events yet.</li>
              ) : (
                data.recent.map((event) => (
                  <li
                    key={event.id}
                    className="flex items-center justify-between gap-3 rounded-lg bg-[#0a0d14] px-4 py-2.5"
                  >
                    <div className="min-w-0">
                      <p className={`font-mono text-[11px] uppercase tracking-wider ${eventTones[event.event] ?? "text-muted-foreground"}`}>
                        {event.event}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {event.projectId ?? event.page ?? event.sessionId ?? "—"}
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
                      {new Date(event.createdAt).toLocaleString()}
                    </span>
                  </li>
                ))
              )}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">Loading…</p>
          )}
        </AdminCard>
      </div>
    </div>
  );
}
