import "dotenv/config";
import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";
import { projects } from "../data/projects";
import { experiences } from "../data/experience";
import { education } from "../data/education";
import { socialLinks } from "../data/social-links";

const skillSeed = [
  { category: "Frontend", name: "Next.js" },
  { category: "Frontend", name: "React" },
  { category: "Frontend", name: "TypeScript" },
  { category: "Frontend", name: "JavaScript" },
  { category: "Backend", name: "Prisma" },
  { category: "Mobile", name: "Java" },
  { category: "Mobile", name: "Android" },
  { category: "Mobile", name: "Firebase" },
  { category: "Database", name: "MySQL" },
  { category: "Database", name: "TiDB" },
  { category: "Database", name: "SQLite" },
  { category: "Tools", name: "Git" },
  { category: "Tools", name: "GitHub" },
];

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.log("[seed] ADMIN_EMAIL / ADMIN_PASSWORD not set — skipping admin user.");
    return;
  }

  const normalized = email.toLowerCase().trim();
  const existing = await prisma.user.findUnique({ where: { email: normalized } });

  if (existing) {
    if (existing.role !== "admin") {
      await prisma.user.update({ where: { id: existing.id }, data: { role: "admin" } });
      console.log("[seed] Promoted existing user to admin:", normalized);
    } else {
      console.log("[seed] Admin already exists:", normalized);
    }
    return;
  }

  await auth.api.signUpEmail({
    body: {
      email: normalized,
      password,
      name: process.env.ADMIN_NAME?.trim() || "Aza Masoud",
    },
  });
  await prisma.user.update({
    where: { email: normalized },
    data: { role: "admin" },
  });
  console.log("[seed] Created admin user:", normalized);
}

async function seedPortfolio() {
  await prisma.analyticsEvent.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.projectFeature.deleteMany();
  await prisma.projectImage.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.education.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.socialLink.deleteMany();
  await prisma.project.deleteMany();
  await prisma.technology.deleteMany();

  for (const [index, project] of projects.entries()) {
    await prisma.project.create({
      data: {
        slug: project.slug,
        title: project.title,
        description: project.description,
        category: project.category,
        year: Number(project.year),
        role: project.role,
        problem: project.problem,
        solution: project.solution,
        challenges: project.challenges,
        result: project.result,
        process: project.process,
        image: project.image,
        liveUrl: project.liveUrl === "#" ? null : project.liveUrl,
        githubUrl: project.githubUrl,
        featured: index === 0,
        published: true,
        order: index,
        technologies: {
          connectOrCreate: project.technologies.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
        features: {
          create: project.features.map((title, featureIndex) => ({
            title,
            order: featureIndex,
          })),
        },
        images: {
          create: [
            {
              imageUrl: project.image,
              altText: `${project.title} — ${project.description}`,
              order: 0,
            },
          ],
        },
      },
    });
  }
  console.log(`[seed] Seeded ${projects.length} projects.`);

  await prisma.skill.createMany({
    data: skillSeed.map((skill, index) => ({
      ...skill,
      order: index,
      visible: true,
    })),
  });
  console.log(`[seed] Seeded ${skillSeed.length} skills.`);

  for (const [index, entry] of experiences.entries()) {
    await prisma.experience.create({
      data: {
        title: entry.title,
        organization: entry.organization,
        startDate: new Date(entry.startDate),
        endDate: entry.endDate ? new Date(entry.endDate) : null,
        description: entry.description,
        current: entry.current,
        order: entry.order ?? index,
      },
    });
  }
  console.log(`[seed] Seeded ${experiences.length} experience entries.`);

  for (const [index, entry] of education.entries()) {
    await prisma.education.create({
      data: {
        institution: entry.institution,
        qualification: entry.qualification,
        field: entry.field,
        startDate: entry.startDate ? new Date(entry.startDate) : null,
        endDate: entry.endDate ? new Date(entry.endDate) : null,
        description: entry.description,
        order: entry.order ?? index,
      },
    });
  }
  console.log(`[seed] Seeded ${education.length} education entries.`);

  await prisma.socialLink.createMany({
    data: socialLinks.map((link, index) => ({
      platform: link.platform,
      url: link.url,
      icon: link.icon,
      visible: true,
      order: link.order ?? index,
    })),
  });
  console.log(`[seed] Seeded ${socialLinks.length} social links.`);
}

async function main() {
  await seedAdmin();
  await seedPortfolio();
  console.log("[seed] Done.");
}

main()
  .catch((error) => {
    console.error("[seed] Failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
