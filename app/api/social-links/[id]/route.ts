import { prisma } from "@/lib/prisma";
import { internalError, notFound, ok, unauthorized, validationError } from "@/lib/api";
import { getAdminSession } from "@/lib/admin";
import { socialLinkInputSchema } from "@/lib/validation";

export async function PUT(
  request: Request,
  ctx: RouteContext<"/api/social-links/[id]">
) {
  try {
    const admin = await getAdminSession();
    if (!admin) return unauthorized();

    const { id } = await ctx.params;
    const existing = await prisma.socialLink.findUnique({ where: { id } });
    if (!existing) return notFound("Social link not found.");

    const body = await request.json().catch(() => null);
    const parsed = socialLinkInputSchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error);

    const socialLink = await prisma.socialLink.update({
      where: { id },
      data: {
        platform: parsed.data.platform,
        url: parsed.data.url,
        icon: parsed.data.icon ?? existing.icon,
        visible: parsed.data.visible ?? existing.visible,
        order: parsed.data.order ?? existing.order,
      },
    });
    return ok(socialLink);
  } catch (error) {
    return internalError(error);
  }
}

export async function DELETE(
  _request: Request,
  ctx: RouteContext<"/api/social-links/[id]">
) {
  try {
    const admin = await getAdminSession();
    if (!admin) return unauthorized();

    const { id } = await ctx.params;
    const existing = await prisma.socialLink.findUnique({ where: { id } });
    if (!existing) return notFound("Social link not found.");

    await prisma.socialLink.delete({ where: { id } });
    return ok({ deleted: true });
  } catch (error) {
    return internalError(error);
  }
}
