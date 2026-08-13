"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronDown, Mail, Trash2 } from "lucide-react";
import { apiDelete, apiGet, apiPut } from "@/components/admin/api";
import {
  AdminCard,
  Badge,
  ErrorBanner,
  PageHeader,
} from "@/components/admin/ui";

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "NEW" | "READ" | "REPLIED" | "ARCHIVED";
  createdAt: string;
};

type ListResponse = {
  items: Message[];
  total: number;
  page: number;
  pageSize: number;
};

const statuses = ["NEW", "READ", "REPLIED", "ARCHIVED"] as const;
const tones: Record<Message["status"], "gold" | "cyan" | "green" | "neutral"> = {
  NEW: "gold",
  READ: "cyan",
  REPLIED: "green",
  ARCHIVED: "neutral",
};

export default function MessagesManager() {
  const [data, setData] = useState<ListResponse | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const query = statusFilter === "ALL" ? "" : `?status=${statusFilter}`;
      const result = await apiGet<ListResponse>(`/api/contact${query}`);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load messages.");
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const query = statusFilter === "ALL" ? "" : `?status=${statusFilter}`;
        const result = await apiGet<ListResponse>(`/api/contact${query}`);
        if (cancelled) return;
        setData(result);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to load messages.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [statusFilter]);

  async function updateStatus(message: Message, status: Message["status"]) {
    try {
      await apiPut(`/api/contact/${message.id}`, { status });
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status.");
    }
  }

  async function handleDelete(message: Message) {
    if (!window.confirm(`Delete message from ${message.name}?`)) return;
    try {
      await apiDelete(`/api/contact/${message.id}`);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete message.");
    }
  }

  return (
    <div>
      <PageHeader
        title="Messages"
        description={data ? `${data.total} total` : "Contact form submissions"}
      />

      <div className="mb-5 flex flex-wrap gap-2">
        {["ALL", ...statuses].map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setStatusFilter(status)}
            className={`rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
              statusFilter === status
                ? "border-[var(--accent-gold)]/60 bg-[var(--accent-gold)]/10 text-[var(--accent-gold)]"
                : "border-white/[0.1] text-muted-foreground hover:text-foreground"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <ErrorBanner message={error} />

      <AdminCard title="Inbox">
        {loading ? (
          <p className="py-8 text-center text-sm text-muted-foreground">Loading…</p>
        ) : !data || data.items.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No messages here.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {data.items.map((message) => {
              const isOpen = expanded === message.id;
              return (
                <li
                  key={message.id}
                  className="overflow-hidden rounded-xl border border-white/[0.07] bg-[#0a0d14]"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setExpanded(isOpen ? null : message.id);
                      if (message.status === "NEW") updateStatus(message, "READ");
                    }}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge tone={tones[message.status]}>{message.status}</Badge>
                        <span className="font-semibold text-foreground">
                          {message.subject}
                        </span>
                      </div>
                      <p className="mt-1 truncate text-sm text-muted-foreground">
                        {message.name} · {message.email}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {new Date(message.createdAt).toLocaleDateString()}
                      </span>
                      <ChevronDown
                        className={`size-4 text-muted-foreground transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                  </button>

                  {isOpen ? (
                    <div className="border-t border-white/[0.07] px-5 py-5">
                      <div className="flex items-start gap-3">
                        <Mail className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                        <div className="min-w-0 flex-1">
                          <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                            {message.message}
                          </p>
                          <a
                            href={`mailto:${message.email}?subject=Re: ${encodeURIComponent(message.subject)}`}
                            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[var(--accent-gold)]/40 px-4 py-2 text-sm text-[var(--accent-gold)] transition-colors hover:bg-[var(--accent-gold)]/10"
                          >
                            Reply via email
                          </a>
                        </div>
                      </div>
                      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-white/[0.07] pt-4">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                          Mark as
                        </span>
                        {statuses.map((status) => (
                          <button
                            key={status}
                            type="button"
                            onClick={() => updateStatus(message, status)}
                            className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                              message.status === status
                                ? "border-[var(--accent-gold)]/60 text-[var(--accent-gold)]"
                                : "border-white/[0.1] text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => handleDelete(message)}
                          className="ml-auto flex items-center gap-2 rounded-lg border border-white/[0.1] px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-[#d20046]/50 hover:text-[#ff5c85]"
                        >
                          <Trash2 className="size-3.5" aria-hidden="true" />
                          Delete
                        </button>
                      </div>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </AdminCard>

      {data && data.total > 0 && data.items.length === 0 ? (
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Showing 0 of {data.total} — pick a different filter.
        </p>
      ) : null}
    </div>
  );
}
