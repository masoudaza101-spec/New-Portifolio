export type EducationItem = {
  id: string;
  institution: string;
  qualification: string;
  field: string;
  startDate: string | null;
  endDate: string | null;
  description: string | null;
  order: number;
};

export const education: EducationItem[] = [
  {
    id: "edu-01",
    institution: "University of Dodoma",
    qualification: "BSc",
    field: "Information Systems",
    startDate: null,
    endDate: null,
    description: "BSc. Information Systems",
    order: 0,
  },
];
