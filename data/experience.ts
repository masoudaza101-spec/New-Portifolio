export type ExperienceItem = {
  id: string;
  title: string;
  organization: string | null;
  startDate: string;
  endDate: string | null;
  description: string;
  current: boolean;
  order: number;
};

export const experiences: ExperienceItem[] = [
  {
    id: "exp-01",
    title: "Independent Software Developer",
    organization: null,
    startDate: "2026-01-01",
    endDate: null,
    description:
      "Building web and mobile applications for real-world business and community needs.",
    current: true,
    order: 0,
  },
];
