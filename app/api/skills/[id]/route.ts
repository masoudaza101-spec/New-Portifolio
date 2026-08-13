import { prisma } from "@/lib/prisma";
import { internalError, notFound, ok, unauthorized, validationError } from "@/lib/api";
import { getAdminSession } from "@/lib/admin";
import { skillInputSchema } from "@/lib/validation";

export async function PUT(
  request: Request,
  ctx: RouteContext<"/api/skills/[id]">
) {
  try {
    const admin = await getAdminSession();
    if (!admin) return unauthorized();

    const { id } = await ctx.params;
    const existing = await prisma.skill.findUnique({ where: { id } });
    if (!existing) return notFound("Skill not found.");

    const body = await request.json().catch(() => null);
    const parsed = skillInputSchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error);

    const skill = await prisma.skill.update({
      where: { id },
      data: {
        category: parsed.data.category,
        name: parsed.data.name,
        icon: parsed.data.icon ?? null,
        order: parsed.data.order ?? existing.order,
        visible: parsed.data.visible ?? existing.visible,
      },
    });
    return ok(skill);
  } catch (error) {
    return internalError(error);
  }
}

export async function DELETE(
  _request: Request,
  ctx: RouteContext<"/api/skills/[id]">
) {
  try {
    const admin = await getAdminSession();
    if (!admin) return unauthorized();

    const { id } = await ctx.params;
    const existing = await prisma.skill.findUnique({ where: { id } });
    if (!existing) return notFound("Skill not found.");

    await prisma.skill.delete({ where: { id } });
    return ok({ deleted: true });
  } catch (error) {
    return internalError(error);
  }
}
