"use client";

import { Loader2 } from "lucide-react";

export function AdminCard({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-white/[0.07] bg-card p-6 ${className}`}
    >
      {title ? (
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
        {hint ? (
          <span className="normal-case tracking-normal text-muted-foreground/60">
            {hint}
          </span>
        ) : null}
      </span>
      {children}
    </label>
  );
}

const inputClasses =
  "w-full rounded-xl border border-white/[0.08] bg-[#0a0d14] px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground/40 focus:border-[var(--accent-gold)]/50 focus:ring-2 focus:ring-[var(--accent-gold)]/15";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClasses} ${props.className ?? ""}`} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`${inputClasses} min-h-28 resize-y ${props.className ?? ""}`}
    />
  );
}

export function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-4 cursor-pointer accent-[var(--accent-gold)]"
      />
      {label}
    </label>
  );
}

type ButtonVariant = "primary" | "ghost" | "danger";

const buttonStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-cyan)] text-[#04060a] font-bold hover:opacity-90",
  ghost:
    "border border-white/[0.1] text-foreground hover:border-[var(--accent-gold)]/40 hover:text-[var(--accent-gold)]",
  danger: "border border-[#d20046]/50 text-[#ff5c85] hover:bg-[#d20046]/10",
};

export function Button({
  variant = "primary",
  loading,
  className = "",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  loading?: boolean;
}) {
  return (
    <button
      {...props}
      disabled={props.disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${buttonStyles[variant]} ${className}`}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
      {children}
    </button>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "gold" | "cyan" | "violet" | "green" | "danger";
}) {
  const tones: Record<string, string> = {
    neutral: "border-white/[0.1] text-muted-foreground",
    gold: "border-[var(--accent-gold)]/40 text-[var(--accent-gold)]",
    cyan: "border-[var(--accent-cyan)]/40 text-[var(--accent-cyan)]",
    violet: "border-[var(--accent-violet)]/40 text-[var(--accent-violet)]",
    green: "border-[var(--accent-green)]/40 text-[var(--accent-green)]",
    danger: "border-[#d20046]/50 text-[#ff5c85]",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function ErrorBanner({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p className="rounded-xl border border-[#d20046]/40 bg-[#d20046]/10 px-4 py-3 text-sm text-[#ff5c85]">
      {message}
    </p>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">{title}</h1>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
    </header>
  );
}
