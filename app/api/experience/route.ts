import { prisma } from "@/lib/prisma";
import { internalError, ok, unauthorized, validationError } from "@/lib/api";
import { getAdminSession } from "@/lib/admin";
import { experienceInputSchema } from "@/lib/validation";

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: [{ current: "desc" }, { startDate: "desc" }],
    });
    return ok(experiences);
  } catch (error) {
    return internalError(error);
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getAdminSession();
    if (!admin) return unauthorized();

    const body = await request.json().catch(() => null);
    const parsed = experienceInputSchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error);

    const experience = await prisma.experience.create({
      data: {
        title: parsed.data.title,
        organization: parsed.data.organization ?? null,
        startDate: parsed.data.startDate,
        endDate: parsed.data.endDate ?? null,
        description: parsed.data.description,
        current: parsed.data.current ?? false,
        order: parsed.data.order ?? 0,
      },
    });
    return ok(experience, 201);
  } catch (error) {
    return internalError(error);
  }
}
