import { prisma } from "@/lib/prisma";
import { internalError, ok, rateLimited, unauthorized, validationError } from "@/lib/api";
import { getAdminSession } from "@/lib/admin";
import { rateLimit } from "@/lib/rate-limit";
import { analyticsEventSchema } from "@/lib/validation";

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("cf-connecting-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (!rateLimit(`analytics:${ip}`, { limit: 60, windowMs: 60_000 })) {
    return rateLimited();
  }

  try {
    const body = await request.json().catch(() => null);
    const parsed = analyticsEventSchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error);

    const event = await prisma.analyticsEvent.create({
      data: {
        event: parsed.data.event,
        page: parsed.data.page ?? null,
        projectId: parsed.data.projectId ?? null,
        sessionId: parsed.data.sessionId ?? null,
      },
    });
    return ok({ recorded: true, id: event.id }, 201);
  } catch (error) {
    return internalError(error);
  }
}

export async function GET(request: Request) {
  try {
    const admin = await getAdminSession();
    if (!admin) return unauthorized();

    const url = new URL(request.url);
    const event = url.searchParams.get("event");

    const [pageViews, projectViews, breakdown] = await Promise.all([
      prisma.analyticsEvent.count({ where: { event: "PAGE_VIEW" } }),
      prisma.analyticsEvent.count({ where: { event: "PROJECT_VIEW" } }),
      prisma.analyticsEvent.groupBy({
        by: ["event"],
        _count: { _all: true },
        where: event ? { event } : undefined,
      }),
    ]);

    const recent = await prisma.analyticsEvent.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return ok({ pageViews, projectViews, breakdown, recent });
  } catch (error) {
    return internalError(error);
  }
}
