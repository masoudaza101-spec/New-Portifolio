import { prisma } from "@/lib/prisma";
import { internalError, notFound, ok, unauthorized, validationError } from "@/lib/api";
import { getAdminSession } from "@/lib/admin";
import { experienceInputSchema } from "@/lib/validation";

export async function PUT(
  request: Request,
  ctx: RouteContext<"/api/experience/[id]">
) {
  try {
    const admin = await getAdminSession();
    if (!admin) return unauthorized();

    const { id } = await ctx.params;
    const existing = await prisma.experience.findUnique({ where: { id } });
    if (!existing) return notFound("Experience entry not found.");

    const body = await request.json().catch(() => null);
    const parsed = experienceInputSchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error);

    const experience = await prisma.experience.update({
      where: { id },
      data: {
        title: parsed.data.title,
        organization: parsed.data.organization ?? null,
        startDate: parsed.data.startDate,
        endDate: parsed.data.endDate ?? null,
        description: parsed.data.description,
        current: parsed.data.current ?? existing.current,
        order: parsed.data.order ?? existing.order,
      },
    });
    return ok(experience);
  } catch (error) {
    return internalError(error);
  }
}

export async function DELETE(
  _request: Request,
  ctx: RouteContext<"/api/experience/[id]">
) {
  try {
    const admin = await getAdminSession();
    if (!admin) return unauthorized();

    const { id } = await ctx.params;
    const existing = await prisma.experience.findUnique({ where: { id } });
    if (!existing) return notFound("Experience entry not found.");

    await prisma.experience.delete({ where: { id } });
    return ok({ deleted: true });
  } catch (error) {
    return internalError(error);
  }
}
