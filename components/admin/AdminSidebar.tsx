"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  GraduationCap,
  Wrench,
  Share2,
  Inbox,
  BarChart3,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { signOut } from "@/lib/auth-client";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/education", label: "Education", icon: GraduationCap },
  { href: "/admin/skills", label: "Skills", icon: Wrench },
  { href: "/admin/social-links", label: "Social Links", icon: Share2 },
  { href: "/admin/messages", label: "Messages", icon: Inbox },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

export default function AdminSidebar({ user }: { user: { name: string; email: string } }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex h-svh w-64 shrink-0 flex-col border-r border-white/[0.07] bg-[#060a12]">
      <div className="flex items-center gap-3 border-b border-white/[0.07] px-6 py-5">
        <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent-gold)] to-[var(--accent-cyan)] font-display text-lg font-black text-[#04060a]">
          A
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
          <p className="truncate font-mono text-[10px] text-muted-foreground">
            {user.email}
          </p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
        {navItems.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-colors duration-200 ${
                active
                  ? "bg-[var(--accent-gold)]/10 text-[var(--accent-gold)]"
                  : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/[0.07] p-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-muted-foreground transition-colors duration-200 hover:bg-white/[0.04] hover:text-foreground"
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          View site
        </a>
        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-[#ff5c85] transition-colors duration-200 hover:bg-[#d20046]/10"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
