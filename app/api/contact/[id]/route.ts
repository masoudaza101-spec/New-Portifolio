import { prisma } from "@/lib/prisma";
import { internalError, notFound, ok, unauthorized, validationError } from "@/lib/api";
import { getAdminSession } from "@/lib/admin";
import { contactStatusSchema } from "@/lib/validation";

export async function GET(
  _request: Request,
  ctx: RouteContext<"/api/contact/[id]">
) {
  try {
    const admin = await getAdminSession();
    if (!admin) return unauthorized();

    const { id } = await ctx.params;
    const message = await prisma.contactMessage.findUnique({ where: { id } });
    if (!message) return notFound("Message not found.");
    return ok(message);
  } catch (error) {
    return internalError(error);
  }
}

export async function PUT(
  request: Request,
  ctx: RouteContext<"/api/contact/[id]">
) {
  try {
    const admin = await getAdminSession();
    if (!admin) return unauthorized();

    const { id } = await ctx.params;
    const existing = await prisma.contactMessage.findUnique({ where: { id } });
    if (!existing) return notFound("Message not found.");

    const body = await request.json().catch(() => null);
    const parsed = contactStatusSchema.safeParse(body?.status);
    if (!parsed.success) return validationError(parsed.error);

    const message = await prisma.contactMessage.update({
      where: { id },
      data: { status: parsed.data },
    });
    return ok(message);
  } catch (error) {
    return internalError(error);
  }
}

export async function DELETE(
  _request: Request,
  ctx: RouteContext<"/api/contact/[id]">
) {
  try {
    const admin = await getAdminSession();
    if (!admin) return unauthorized();

    const { id } = await ctx.params;
    const existing = await prisma.contactMessage.findUnique({ where: { id } });
    if (!existing) return notFound("Message not found.");

    await prisma.contactMessage.delete({ where: { id } });
    return ok({ deleted: true });
  } catch (error) {
    return internalError(error);
  }
}
