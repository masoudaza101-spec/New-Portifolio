import { prisma } from "@/lib/prisma";
import { internalError, notFound, ok, unauthorized, validationError } from "@/lib/api";
import { getAdminSession } from "@/lib/admin";
import { educationInputSchema } from "@/lib/validation";

export async function PUT(
  request: Request,
  ctx: RouteContext<"/api/education/[id]">
) {
  try {
    const admin = await getAdminSession();
    if (!admin) return unauthorized();

    const { id } = await ctx.params;
    const existing = await prisma.education.findUnique({ where: { id } });
    if (!existing) return notFound("Education entry not found.");

    const body = await request.json().catch(() => null);
    const parsed = educationInputSchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error);

    const entry = await prisma.education.update({
      where: { id },
      data: {
        institution: parsed.data.institution,
        qualification: parsed.data.qualification,
        field: parsed.data.field ?? null,
        startDate: parsed.data.startDate ?? null,
        endDate: parsed.data.endDate ?? null,
        description: parsed.data.description ?? null,
        order: parsed.data.order ?? existing.order,
      },
    });
    return ok(entry);
  } catch (error) {
    return internalError(error);
  }
}

export async function DELETE(
  _request: Request,
  ctx: RouteContext<"/api/education/[id]">
) {
  try {
    const admin = await getAdminSession();
    if (!admin) return unauthorized();

    const { id } = await ctx.params;
    const existing = await prisma.education.findUnique({ where: { id } });
    if (!existing) return notFound("Education entry not found.");

    await prisma.education.delete({ where: { id } });
    return ok({ deleted: true });
  } catch (error) {
    return internalError(error);
  }
}
