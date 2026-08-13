import { prisma } from "@/lib/prisma";
import { projects as staticProjects, type Project } from "@/data/projects";
import {
  experiences as staticExperiences,
  type ExperienceItem,
} from "@/data/experience";
import { education as staticEducation, type EducationItem } from "@/data/education";
import {
  socialLinks as staticSocialLinks,
  type SocialLinkItem,
} from "@/data/social-links";

type ProjectWithRelations = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  year: number;
  role: string;
  problem: string;
  solution: string;
  challenges: string;
  result: string;
  process: unknown;
  image: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  published: boolean;
  order: number;
  technologies: { name: string }[];
  features: { title: string; order: number }[];
};

function mapProject(project: ProjectWithRelations): Project {
  const process = Array.isArray(project.process)
    ? (project.process as string[])
    : [];
  return {
    id: project.slug,
    slug: project.slug,
    title: project.title,
    description: project.description,
    category: project.category,
    year: String(project.year),
    role: project.role,
    technologies: project.technologies.map((tech) => tech.name),
    image: project.image ?? "/images/kemi-faiba.jpg",
    features: project.features
      .slice()
      .sort((a, b) => a.order - b.order)
      .map((feature) => feature.title),
    problem: project.problem,
    solution: project.solution,
    challenges: project.challenges,
    result: project.result,
    process,
    liveUrl: project.liveUrl ?? "#",
    githubUrl: project.githubUrl ?? "https://github.com/azamasoud",
  };
}

const projectInclude = {
  technologies: { select: { name: true }, orderBy: { name: "asc" as const } },
  features: { select: { title: true, order: true }, orderBy: { order: "asc" as const } },
};

export async function getProjects(): Promise<Project[]> {
  try {
    const rows = await prisma.project.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      include: projectInclude,
    });
    if (rows.length === 0) return staticProjects;
    return rows.map(mapProject);
  } catch {
    return staticProjects;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const row = await prisma.project.findUnique({
      where: { slug },
      include: projectInclude,
    });
    if (!row) return staticProjects.find((project) => project.slug === slug) ?? null;
    return mapProject(row);
  } catch {
    return staticProjects.find((project) => project.slug === slug) ?? null;
  }
}

export async function getProjectSlugs(): Promise<string[]> {
  try {
    const rows = await prisma.project.findMany({
      where: { published: true },
      select: { slug: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
    if (rows.length === 0) return staticProjects.map((project) => project.slug);
    return rows.map((row) => row.slug);
  } catch {
    return staticProjects.map((project) => project.slug);
  }
}

export async function getExperience(): Promise<ExperienceItem[]> {
  try {
    const rows = await prisma.experience.findMany({
      orderBy: [{ current: "desc" }, { startDate: "desc" }],
    });
    if (rows.length === 0) return staticExperiences;
    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      organization: row.organization,
      startDate: row.startDate.toISOString().slice(0, 10),
      endDate: row.endDate ? row.endDate.toISOString().slice(0, 10) : null,
      description: row.description,
      current: row.current,
      order: row.order,
    }));
  } catch {
    return staticExperiences;
  }
}

export async function getEducation(): Promise<EducationItem[]> {
  try {
    const rows = await prisma.education.findMany({ orderBy: { order: "asc" } });
    if (rows.length === 0) return staticEducation;
    return rows.map((row) => ({
      id: row.id,
      institution: row.institution,
      qualification: row.qualification,
      field: row.field ?? "",
      startDate: row.startDate ? row.startDate.toISOString().slice(0, 10) : null,
      endDate: row.endDate ? row.endDate.toISOString().slice(0, 10) : null,
      description: row.description,
      order: row.order,
    }));
  } catch {
    return staticEducation;
  }
}

export async function getSocialLinks(): Promise<SocialLinkItem[]> {
  try {
    const rows = await prisma.socialLink.findMany({
      where: { visible: true },
      orderBy: { order: "asc" },
    });
    if (rows.length === 0) return staticSocialLinks;
    return rows.map((row) => ({
      id: row.id,
      platform: row.platform,
      url: row.url,
      icon: row.icon ?? row.platform.toLowerCase(),
      order: row.order,
    }));
  } catch {
    return staticSocialLinks;
  }
}
