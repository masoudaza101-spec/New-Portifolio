"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { apiGet, apiPost, apiPut, apiDelete } from "@/components/admin/api";
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

type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  year: number;
  role: string;
  problem: string;
  solution: string;
  challenges: string;
  result: string;
  process: unknown;
  image: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  published: boolean;
  order: number;
  technologies?: { name: string }[];
  features?: { title: string; order: number }[];
};

type FormState = {
  slug: string;
  title: string;
  description: string;
  category: string;
  year: string;
  role: string;
  problem: string;
  solution: string;
  challenges: string;
  result: string;
  process: string;
  features: string;
  technologies: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  published: boolean;
};

const emptyForm: FormState = {
  slug: "",
  title: "",
  description: "",
  category: "",
  year: String(new Date().getFullYear()),
  role: "",
  problem: "",
  solution: "",
  challenges: "",
  result: "",
  process: "",
  features: "",
  technologies: "",
  image: "",
  liveUrl: "",
  githubUrl: "",
  featured: false,
  published: true,
};

function toForm(project: Project): FormState {
  return {
    slug: project.slug,
    title: project.title,
    description: project.description,
    category: project.category,
    year: String(project.year),
    role: project.role,
    problem: project.problem,
    solution: project.solution,
    challenges: project.challenges,
    result: project.result,
    process: Array.isArray(project.process) ? project.process.join("\n") : "",
    features: (project.features ?? []).slice().sort((a, b) => a.order - b.order).map((f) => f.title).join("\n"),
    technologies: (project.technologies ?? []).map((t) => t.name).join(", "),
    image: project.image ?? "",
    liveUrl: project.liveUrl ?? "",
    githubUrl: project.githubUrl ?? "",
    featured: project.featured,
    published: project.published,
  };
}

const splitLines = (value: string) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const splitTags = (value: string) =>
  value
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);

export default function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const items = await apiGet<Project[]>("/api/projects");
      setProjects(items);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const items = await apiGet<Project[]>("/api/projects");
        if (cancelled) return;
        setProjects(items);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to load projects.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  function startCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setError(null);
  }

  function startEdit(project: Project) {
    setEditingId(project.id);
    setForm(toForm(project));
    setError(null);
  }

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = {
        ...form,
        year: Number(form.year),
        process: splitLines(form.process),
        features: splitLines(form.features),
        technologies: splitTags(form.technologies),
        image: form.image || null,
        liveUrl: form.liveUrl || null,
        githubUrl: form.githubUrl || null,
      };
      if (editingId) {
        await apiPut(`/api/projects/${editingId}`, payload);
      } else {
        await apiPost("/api/projects", payload);
      }
      startCreate();
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save project.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(project: Project) {
    if (!window.confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
    try {
      await apiDelete(`/api/projects/${project.id}`);
      if (editingId === project.id) startCreate();
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete project.");
    }
  }

  return (
    <div>
      <PageHeader
        title="Projects"
        description={`${projects.length} published projects`}
        actions={
          <Button type="button" onClick={startCreate}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            New project
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <div className="flex flex-col gap-4 xl:col-span-3">
          <AdminCard title="All projects">
            {loading ? (
              <p className="py-8 text-center text-sm text-muted-foreground">Loading…</p>
            ) : projects.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No projects yet. Create your first one.
              </p>
            ) : (
              <ul className="flex flex-col gap-3">
                {projects.map((project) => (
                  <li
                    key={project.id}
                    className="flex items-start justify-between gap-4 rounded-xl border border-white/[0.07] bg-[#0a0d14] p-4"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-foreground">{project.title}</p>
                        {project.featured ? <Badge tone="gold">Featured</Badge> : null}
                        {project.published ? (
                          <Badge tone="green">Published</Badge>
                        ) : (
                          <Badge tone="danger">Draft</Badge>
                        )}
                      </div>
                      <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                        {project.category} · {project.year} · /projects/{project.slug}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(project)}
                        aria-label={`Edit ${project.title}`}
                        className="rounded-lg border border-white/[0.1] p-2 text-muted-foreground transition-colors hover:border-[var(--accent-gold)]/40 hover:text-[var(--accent-gold)]"
                      >
                        <Pencil className="size-4" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(project)}
                        aria-label={`Delete ${project.title}`}
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
          <AdminCard title={editingId ? "Edit project" : "New project"}>
            <ErrorBanner message={error} />
            <form onSubmit={handleSave} className="mt-4 flex flex-col gap-4">
              <Field label="Title">
                <TextInput
                  required
                  value={form.title}
                  onChange={(event) => set("title", event.target.value)}
                  placeholder="KEMI-FAIBA"
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Slug">
                  <TextInput
                    required
                    value={form.slug}
                    onChange={(event) => set("slug", event.target.value)}
                    placeholder="kemi-faiba"
                  />
                </Field>
                <Field label="Year">
                  <TextInput
                    type="number"
                    min={2000}
                    max={2100}
                    required
                    value={form.year}
                    onChange={(event) => set("year", event.target.value)}
                  />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Category">
                  <TextInput
                    required
                    value={form.category}
                    onChange={(event) => set("category", event.target.value)}
                    placeholder="Web Application"
                  />
                </Field>
                <Field label="Role">
                  <TextInput
                    required
                    value={form.role}
                    onChange={(event) => set("role", event.target.value)}
                    placeholder="Full-stack Developer"
                  />
                </Field>
              </div>
              <Field label="Description" hint="max 500 chars">
                <TextArea
                  required
                  value={form.description}
                  onChange={(event) => set("description", event.target.value)}
                />
              </Field>
              <Field label="Image URL">
                <TextInput
                  value={form.image}
                  onChange={(event) => set("image", event.target.value)}
                  placeholder="/images/kemi-faiba.jpg or https://…"
                />
              </Field>
              <Field label="Technologies" hint="comma separated">
                <TextInput
                  value={form.technologies}
                  onChange={(event) => set("technologies", event.target.value)}
                  placeholder="Next.js, React, TypeScript"
                />
              </Field>
              <Field label="Problem">
                <TextArea
                  required
                  value={form.problem}
                  onChange={(event) => set("problem", event.target.value)}
                />
              </Field>
              <Field label="Solution">
                <TextArea
                  required
                  value={form.solution}
                  onChange={(event) => set("solution", event.target.value)}
                />
              </Field>
              <Field label="Challenges">
                <TextArea
                  required
                  value={form.challenges}
                  onChange={(event) => set("challenges", event.target.value)}
                />
              </Field>
              <Field label="Result">
                <TextArea
                  required
                  value={form.result}
                  onChange={(event) => set("result", event.target.value)}
                />
              </Field>
              <Field label="Process" hint="one step per line">
                <TextArea
                  value={form.process}
                  onChange={(event) => set("process", event.target.value)}
                />
              </Field>
              <Field label="Key features" hint="one per line">
                <TextArea
                  value={form.features}
                  onChange={(event) => set("features", event.target.value)}
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Live URL">
                  <TextInput
                    value={form.liveUrl}
                    onChange={(event) => set("liveUrl", event.target.value)}
                    placeholder="https://…"
                  />
                </Field>
                <Field label="GitHub URL">
                  <TextInput
                    value={form.githubUrl}
                    onChange={(event) => set("githubUrl", event.target.value)}
                    placeholder="https://github.com/…"
                  />
                </Field>
              </div>
              <div className="flex gap-6">
                <Checkbox
                  label="Featured"
                  checked={form.featured}
                  onChange={(value) => set("featured", value)}
                />
                <Checkbox
                  label="Published"
                  checked={form.published}
                  onChange={(value) => set("published", value)}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="submit" loading={saving}>
                  {editingId ? "Save changes" : "Create project"}
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
