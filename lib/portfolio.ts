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

export function getProjects(): Project[] {
  return staticProjects;
}

export function getProjectBySlug(slug: string): Project | null {
  return staticProjects.find((project) => project.slug === slug) ?? null;
}

export function getProjectSlugs(): string[] {
  return staticProjects.map((project) => project.slug);
}

export function getExperience(): ExperienceItem[] {
  return staticExperiences;
}

export function getEducation(): EducationItem[] {
  return staticEducation;
}

export function getSocialLinks(): SocialLinkItem[] {
  return staticSocialLinks;
}
