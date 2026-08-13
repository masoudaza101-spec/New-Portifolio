import { prisma } from "@/lib/prisma";
import { fail, internalError, ok, rateLimited, unauthorized, validationError } from "@/lib/api";
import { getAdminSession } from "@/lib/admin";
import { sendContactNotification } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { contactMessageSchema } from "@/lib/validation";

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("cf-connecting-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (!rateLimit(`contact:${ip}`, { limit: 5, windowMs: 60_000 })) {
    return rateLimited("Too many messages. Please try again later.");
  }

  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return fail("VALIDATION_ERROR", "Invalid request.", 400);
    }

    const honeypot = (body as { website?: unknown }).website;
    if (honeypot && String(honeypot).trim() !== "") {
      return ok({ message: "Message sent successfully." });
    }

    const parsed = contactMessageSchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error);

    await prisma.contactMessage.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        subject: parsed.data.subject,
        message: parsed.data.message,
        status: "NEW",
      },
    });

    await sendContactNotification(parsed.data).catch((error) => {
      console.error("[email] failed to send notification", error);
    });

    return ok({ message: "Message sent successfully." }, 201);
  } catch (error) {
    return internalError(error);
  }
}

export async function GET(request: Request) {
  try {
    const admin = await getAdminSession();
    if (!admin) return unauthorized();

    const url = new URL(request.url);
    const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
    const pageSize = Math.min(50, Math.max(1, Number(url.searchParams.get("pageSize") ?? 20)));
    const status = url.searchParams.get("status");
    const search = url.searchParams.get("search")?.trim();

    const where = {
      ...(status ? { status: status as "NEW" | "READ" | "REPLIED" | "ARCHIVED" } : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" as const } },
              { email: { contains: search, mode: "insensitive" as const } },
              { subject: { contains: search, mode: "insensitive" as const } },
            ],
          }
        : {}),
    };

    const [items, total] = await Promise.all([
      prisma.contactMessage.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.contactMessage.count({ where }),
    ]);

    return ok({ items, total, page, pageSize });
  } catch (error) {
    return internalError(error);
  }
}
