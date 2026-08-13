import { prisma } from "@/lib/prisma";
import {
  internalError,
  ok,
  unauthorized,
  validationError,
} from "@/lib/api";
import { getAdminSession } from "@/lib/admin";
import { projectInputSchema } from "@/lib/validation";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      include: {
        technologies: { select: { id: true, name: true }, orderBy: { name: "asc" } },
        features: { select: { id: true, title: true, description: true, order: true }, orderBy: { order: "asc" } },
        images: { orderBy: { order: "asc" } },
      },
    });
    return ok(projects);
  } catch (error) {
    return internalError(error);
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getAdminSession();
    if (!admin) return unauthorized();

    const body = await request.json().catch(() => null);
    const parsed = projectInputSchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error);

    const input = parsed.data;
    const technologies = input.technologies ?? [];

    const project = await prisma.project.create({
      data: {
        slug: input.slug,
        title: input.title,
        description: input.description,
        category: input.category,
        year: input.year,
        role: input.role,
        problem: input.problem,
        solution: input.solution,
        challenges: input.challenges,
        result: input.result,
        process: input.process ?? [],
        image: input.image,
        liveUrl: input.liveUrl,
        githubUrl: input.githubUrl,
        featured: input.featured ?? false,
        published: input.published ?? true,
        order: 0,
        technologies: {
          connectOrCreate: technologies.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
        features: {
          create: (input.features ?? []).map((title, index) => ({
            title,
            order: index,
          })),
        },
      },
      include: {
        technologies: true,
        features: true,
        images: true,
      },
    });

    return ok(project, 201);
  } catch (error) {
    return internalError(error);
  }
}
