"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { signIn, useSession } from "@/lib/auth-client";
import { Button, ErrorBanner, Field, TextInput } from "@/components/admin/ui";

export default function AdminLoginPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && session) {
      router.replace("/admin");
    }
  }, [isPending, session, router]);

  if (isPending || session) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background">
        <Loader2 className="size-6 animate-spin text-muted-foreground" aria-hidden="true" />
      </div>
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await signIn.email({ email, password });
      if (result?.error) {
        setError(result.error.message ?? "Unable to sign in.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent-gold)] to-[var(--accent-cyan)]">
            <Lock className="size-6 text-[#04060a]" aria-hidden="true" />
          </div>
          <h1 className="mt-5 font-display text-2xl font-bold tracking-tight">
            Admin Console
          </h1>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            Sign in with your admin account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <ErrorBanner message={error} />
          <Field label="Email">
            <TextInput
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
          </Field>
          <Field label="Password">
            <TextInput
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
            />
          </Field>
          <Button type="submit" loading={loading} className="mt-2">
            Sign in
          </Button>
        </form>

        <p className="mt-6 text-center font-mono text-[10px] text-muted-foreground/60">
          Seeded via <span className="text-muted-foreground">ADMIN_EMAIL</span> in .env
        </p>
      </div>
    </main>
  );
}
