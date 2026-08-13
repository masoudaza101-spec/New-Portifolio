import { prisma } from "@/lib/prisma";
import { internalError, ok, unauthorized, validationError } from "@/lib/api";
import { getAdminSession } from "@/lib/admin";
import { socialLinkInputSchema } from "@/lib/validation";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const all = url.searchParams.get("all") === "1";
    if (all) {
      const admin = await getAdminSession();
      if (!admin) return unauthorized();
    }
    const socialLinks = await prisma.socialLink.findMany({
      where: all ? undefined : { visible: true },
      orderBy: { order: "asc" },
    });
    return ok(socialLinks);
  } catch (error) {
    return internalError(error);
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getAdminSession();
    if (!admin) return unauthorized();

    const body = await request.json().catch(() => null);
    const parsed = socialLinkInputSchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error);

    const socialLink = await prisma.socialLink.create({
      data: {
        platform: parsed.data.platform,
        url: parsed.data.url,
        icon: parsed.data.icon ?? parsed.data.platform.toLowerCase(),
        visible: parsed.data.visible ?? true,
        order: parsed.data.order ?? 0,
      },
    });
    return ok(socialLink, 201);
  } catch (error) {
    return internalError(error);
  }
}
