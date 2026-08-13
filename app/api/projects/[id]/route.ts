import { prisma } from "@/lib/prisma";
import {
  internalError,
  notFound,
  ok,
  unauthorized,
  validationError,
} from "@/lib/api";
import { getAdminSession } from "@/lib/admin";
import { projectInputSchema } from "@/lib/validation";

export async function PUT(
  request: Request,
  ctx: RouteContext<"/api/projects/[id]">
) {
  try {
    const admin = await getAdminSession();
    if (!admin) return unauthorized();

    const { id } = await ctx.params;
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) return notFound("Project not found.");

    const body = await request.json().catch(() => null);
    const parsed = projectInputSchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error);

    const input = parsed.data;
    const technologies = input.technologies ?? [];

    const technologyIds = await Promise.all(
      technologies.map(async (name) => {
        const tech = await prisma.technology.upsert({
          where: { name },
          update: {},
          create: { name },
          select: { id: true },
        });
        return tech.id;
      })
    );

    const [project] = await prisma.$transaction([
      prisma.projectFeature.deleteMany({ where: { projectId: id } }),
      prisma.project.update({
        where: { id },
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
          technologies: {
            set: technologyIds.map((technologyId) => ({ id: technologyId })),
          },
          features: {
            create: (input.features ?? []).map((title, index) => ({
              title,
              order: index,
            })),
          },
        },
        include: {
          technologies: { orderBy: { name: "asc" } },
          features: { orderBy: { order: "asc" } },
          images: { orderBy: { order: "asc" } },
        },
      }),
    ]);

    return ok(project);
  } catch (error) {
    return internalError(error);
  }
}

export async function DELETE(
  _request: Request,
  ctx: RouteContext<"/api/projects/[id]">
) {
  try {
    const admin = await getAdminSession();
    if (!admin) return unauthorized();

    const { id } = await ctx.params;
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) return notFound("Project not found.");

    await prisma.project.delete({ where: { id } });
    return ok({ deleted: true });
  } catch (error) {
    return internalError(error);
  }
}
