import { prisma } from "@/lib/prisma";
import { internalError, ok, unauthorized, validationError } from "@/lib/api";
import { getAdminSession } from "@/lib/admin";
import { skillInputSchema } from "@/lib/validation";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const all = url.searchParams.get("all") === "1";
    if (all) {
      const admin = await getAdminSession();
      if (!admin) return unauthorized();
    }
    const skills = await prisma.skill.findMany({
      where: all ? undefined : { visible: true },
      orderBy: [{ category: "asc" }, { order: "asc" }],
    });
    return ok(skills);
  } catch (error) {
    return internalError(error);
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getAdminSession();
    if (!admin) return unauthorized();

    const body = await request.json().catch(() => null);
    const parsed = skillInputSchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error);

    const skill = await prisma.skill.create({
      data: {
        category: parsed.data.category,
        name: parsed.data.name,
        icon: parsed.data.icon ?? null,
        order: parsed.data.order ?? 0,
        visible: parsed.data.visible ?? true,
      },
    });
    return ok(skill, 201);
  } catch (error) {
    return internalError(error);
  }
}
