import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export type AdminSession = {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
};

export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session || session.user.role !== "admin") return null;
    return {
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role,
      },
    };
  } catch {
    return null;
  }
}
