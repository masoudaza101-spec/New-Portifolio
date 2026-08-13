"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { site } from "@/data/site";
import { emailPattern } from "@/lib/utils";

type Fields = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Errors = Partial<Fields>;

const initialValues: Fields = { name: "", email: "", subject: "", message: "" };

function validate(values: Fields): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!emailPattern.test(values.email)) {
    errors.email = "Please provide a valid email address.";
  }

  if (!values.subject.trim()) {
    errors.subject = "Please add a subject.";
  }

  if (!values.message.trim()) {
    errors.message = "Please write a message.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Your message should be at least 10 characters.";
  }

  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState<Fields>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function handleChange(field: keyof Fields) {
    return (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setSubmitError(null);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, website: "" }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(
          body?.error?.message ?? "Something went wrong. Please try again."
        );
      }

      setValues(initialValues);
      setSent(true);
    } catch (error) {
      if (error instanceof TypeError) {
        const subject = encodeURIComponent(`[Portfolio] ${values.subject}`);
        const body = encodeURIComponent(
          `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`
        );
        window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
        setSent(true);
        return;
      }
      setSubmitError(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field
          label="Name"
          value={values.name}
          onChange={handleChange("name")}
          error={errors.name}
          autoComplete="name"
        />
        <Field
          label="Email"
          type="email"
          value={values.email}
          onChange={handleChange("email")}
          error={errors.email}
          autoComplete="email"
        />
      </div>

      <Field
        label="Subject"
        value={values.subject}
        onChange={handleChange("subject")}
        error={errors.subject}
      />

      <Field
        label="Message"
        multiline
        value={values.message}
        onChange={handleChange("message")}
        error={errors.message}
      />

      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {sent ? (
        <p
          role="status"
          className="flex items-center gap-3 rounded-xl border border-[var(--accent-green)]/40 bg-[var(--accent-green)]/10 px-4 py-3 text-sm font-medium text-[var(--accent-green)]"
        >
          <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
          Thank you. Your message has been sent successfully.
        </p>
      ) : null}

      {submitError ? (
        <p
          role="alert"
          className="flex items-center gap-3 rounded-xl border border-[var(--accent-pink)]/40 bg-[var(--accent-pink)]/10 px-4 py-3 text-sm font-medium text-[var(--accent-pink)]"
        >
          <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
          {submitError}
        </p>
      ) : null}

      <div>
        <button
          type="submit"
          data-track="CONTACT_CLICK"
          disabled={sending}
          className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-gold-2)] px-8 py-3.5 text-sm font-semibold text-[#0b0e14] shadow-glow-gold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(212,175,55,0.35)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
        >
          {sending ? "Sending…" : "Send message"}
          <Send
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </button>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
  type?: string;
  multiline?: boolean;
  autoComplete?: string;
};

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  multiline = false,
  autoComplete,
}: FieldProps) {
  const id = `field-${label.toLowerCase()}`;
  const base =
    "w-full rounded-xl border border-white/[0.08] bg-[#0a0d14] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-300 focus:outline-none";

  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={label.toLowerCase()}
          rows={5}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${base} resize-none ${
            error
              ? "border-[var(--accent-pink)]/60 focus:border-[var(--accent-pink)]"
              : "focus:border-[var(--accent-gold)] focus:shadow-glow-gold"
          }`}
        />
      ) : (
        <input
          id={id}
          name={label.toLowerCase()}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${base} ${
            error
              ? "border-[var(--accent-pink)]/60 focus:border-[var(--accent-pink)]"
              : "focus:border-[var(--accent-gold)] focus:shadow-glow-gold"
          }`}
        />
      )}
      {error ? (
        <p
          id={`${id}-error`}
          className="mt-2 font-mono text-xs text-[var(--accent-pink)]"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
