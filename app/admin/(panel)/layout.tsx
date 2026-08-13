import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex min-h-svh bg-background">
      <AdminSidebar
        user={{ name: session.user.name, email: session.user.email }}
      />
      <main className="min-w-0 flex-1 overflow-x-hidden p-8 md:p-10">
        {children}
      </main>
    </div>
  );
}
