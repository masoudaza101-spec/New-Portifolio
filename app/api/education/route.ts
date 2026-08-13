import { prisma } from "@/lib/prisma";
import { internalError, ok, unauthorized, validationError } from "@/lib/api";
import { getAdminSession } from "@/lib/admin";
import { educationInputSchema } from "@/lib/validation";

export async function GET() {
  try {
    const education = await prisma.education.findMany({
      orderBy: { order: "asc" },
    });
    return ok(education);
  } catch (error) {
    return internalError(error);
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getAdminSession();
    if (!admin) return unauthorized();

    const body = await request.json().catch(() => null);
    const parsed = educationInputSchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error);

    const entry = await prisma.education.create({
      data: {
        institution: parsed.data.institution,
        qualification: parsed.data.qualification,
        field: parsed.data.field ?? null,
        startDate: parsed.data.startDate ?? null,
        endDate: parsed.data.endDate ?? null,
        description: parsed.data.description ?? null,
        order: parsed.data.order ?? 0,
      },
    });
    return ok(entry, 201);
  } catch (error) {
    return internalError(error);
  }
}
