"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { apiDelete, apiGet, apiPost, apiPut } from "@/components/admin/api";
import {
  AdminCard,
  Badge,
  Button,
  Checkbox,
  ErrorBanner,
  Field,
  PageHeader,
  TextArea,
  TextInput,
} from "@/components/admin/ui";

type FieldType = "text" | "textarea" | "number" | "date" | "checkbox";

export type ManagerField = {
  key: string;
  label: string;
  type?: FieldType;
  hint?: string;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
  fullWidth?: boolean;
};

export type BadgeSpec = { label: string; tone: "neutral" | "gold" | "cyan" | "violet" | "green" | "danger" };

type FormValue = string | boolean;
type FormState = Record<string, FormValue>;

type Item = Record<string, unknown> & { id: string };

export default function SimpleManager<T extends Item>({
  apiPath,
  title,
  description,
  fields,
  defaultForm,
  toForm,
  toPayload,
  itemTitle,
  itemSubtitle,
  itemBadges,
}: {
  apiPath: string;
  title: string;
  description?: string;
  fields: ManagerField[];
  defaultForm: FormState;
  toForm: (item: T) => FormState;
  toPayload: (form: FormState) => Record<string, unknown>;
  itemTitle: (item: T) => string;
  itemSubtitle?: (item: T) => string;
  itemBadges?: (item: T) => BadgeSpec[];
}) {
  const [items, setItems] = useState<T[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(defaultForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const rows = await apiGet<Item[]>(`${apiPath}?all=1`);
      setItems(rows as T[]);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load items.");
    } finally {
      setLoading(false);
    }
  }, [apiPath]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const rows = await apiGet<Item[]>(`${apiPath}?all=1`);
        if (cancelled) return;
        setItems(rows as T[]);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to load items.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [apiPath]);

  function startCreate() {
    setEditingId(null);
    setForm(defaultForm);
    setError(null);
  }

  function startEdit(item: T) {
    setEditingId(item.id);
    setForm(toForm(item));
    setError(null);
  }

  function setField(key: string, value: FormValue) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = toPayload(form);
      if (editingId) {
        await apiPut(`${apiPath}/${editingId}`, payload);
      } else {
        await apiPost(apiPath, payload);
      }
      startCreate();
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item: T) {
    if (!window.confirm(`Delete "${itemTitle(item)}"? This cannot be undone.`)) return;
    try {
      await apiDelete(`${apiPath}/${item.id}`);
      if (editingId === item.id) startCreate();
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete.");
    }
  }

  return (
    <div>
      <PageHeader
        title={title}
        description={description ?? `${items.length} total`}
        actions={
          <Button type="button" onClick={startCreate}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            New {title.toLowerCase().replace(/s$/, "")}
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <div className="xl:col-span-3">
          <AdminCard title={`All ${title.toLowerCase()}`}>
            {loading ? (
              <p className="py-8 text-center text-sm text-muted-foreground">Loading…</p>
            ) : items.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                Nothing here yet.
              </p>
            ) : (
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start justify-between gap-4 rounded-xl border border-white/[0.07] bg-[#0a0d14] p-4"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-foreground">{itemTitle(item)}</p>
                        {(itemBadges?.(item) ?? []).map((badge) => (
                          <Badge key={badge.label} tone={badge.tone}>
                            {badge.label}
                          </Badge>
                        ))}
                      </div>
                      {itemSubtitle ? (
                        <p className="mt-1 text-sm text-muted-foreground">
                          {itemSubtitle(item)}
                        </p>
                      ) : null}
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        aria-label={`Edit ${itemTitle(item)}`}
                        className="rounded-lg border border-white/[0.1] p-2 text-muted-foreground transition-colors hover:border-[var(--accent-gold)]/40 hover:text-[var(--accent-gold)]"
                      >
                        <Pencil className="size-4" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item)}
                        aria-label={`Delete ${itemTitle(item)}`}
                        className="rounded-lg border border-white/[0.1] p-2 text-muted-foreground transition-colors hover:border-[#d20046]/50 hover:text-[#ff5c85]"
                      >
                        <Trash2 className="size-4" aria-hidden="true" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </AdminCard>
        </div>

        <div className="xl:col-span-2">
          <AdminCard title={editingId ? `Edit ${title.toLowerCase().replace(/s$/, "")}` : `New ${title.toLowerCase().replace(/s$/, "")}`}>
            <ErrorBanner message={error} />
            <form onSubmit={handleSave} className="mt-4 flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {fields.map((field) => {
                  const value = form[field.key];
                  const isCheckbox = field.type === "checkbox";
                  if (isCheckbox) {
                    return (
                      <div key={field.key} className="flex items-center pt-6">
                        <Checkbox
                          label={field.label}
                          checked={Boolean(value)}
                          onChange={(checked) => setField(field.key, checked)}
                        />
                      </div>
                    );
                  }
                  const span = field.fullWidth ? "sm:col-span-2" : "";
                  if (field.type === "textarea") {
                    return (
                      <div key={field.key} className={`${span} sm:col-span-2`}>
                        <Field label={field.label} hint={field.hint}>
                          <TextArea
                            required={field.required}
                            value={String(value ?? "")}
                            onChange={(event) => setField(field.key, event.target.value)}
                          />
                        </Field>
                      </div>
                    );
                  }
                  return (
                    <div key={field.key} className={span}>
                      <Field label={field.label} hint={field.hint}>
                        <TextInput
                          type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
                          required={field.required}
                          value={String(value ?? "")}
                          placeholder={field.placeholder}
                          onChange={(event) => setField(field.key, event.target.value)}
                        />
                      </Field>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="submit" loading={saving}>
                  {editingId ? "Save changes" : "Create"}
                </Button>
                <Button type="button" variant="ghost" onClick={startCreate}>
                  Cancel
                </Button>
              </div>
            </form>
          </AdminCard>
        </div>
      </div>
    </div>
  );
}
