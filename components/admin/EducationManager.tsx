"use client";

import SimpleManager from "@/components/admin/SimpleManager";

type Education = {
  id: string;
  institution: string;
  qualification: string;
  field: string | null;
  startDate: string | null;
  endDate: string | null;
  description: string | null;
  order: number;
};

const toForm = (item: Education) => ({
  institution: item.institution,
  qualification: item.qualification,
  field: item.field ?? "",
  startDate: item.startDate ? item.startDate.slice(0, 10) : "",
  endDate: item.endDate ? item.endDate.slice(0, 10) : "",
  order: String(item.order ?? ""),
  description: item.description ?? "",
});

const toPayload = (form: Record<string, string | boolean>) => ({
  institution: form.institution,
  qualification: form.qualification,
  field: form.field || null,
  startDate: form.startDate || null,
  endDate: form.endDate || null,
  order: form.order === "" ? undefined : Number(form.order),
  description: form.description || null,
});

export default function EducationManager() {
  return (
    <SimpleManager
      apiPath="/api/education"
      title="Education"
      description="Academic background"
      fields={[
        { key: "institution", label: "Institution", required: true },
        { key: "qualification", label: "Qualification", required: true },
        { key: "field", label: "Field of study" },
        { key: "startDate", label: "Start date", type: "date", optional: true },
        { key: "endDate", label: "End date", type: "date", optional: true },
        { key: "order", label: "Order", type: "number" },
        {
          key: "description",
          label: "Description",
          type: "textarea",
          optional: true,
        },
      ]}
      defaultForm={{
        institution: "",
        qualification: "",
        field: "",
        startDate: "",
        endDate: "",
        order: "",
        description: "",
      }}
      toForm={toForm}
      toPayload={toPayload}
      itemTitle={(item) => `${item.qualification} — ${item.institution}`}
      itemSubtitle={(item) => {
        const parts = [
          item.field ? String(item.field) : "",
          item.startDate
            ? `${String(item.startDate).slice(0, 10)} → ${item.endDate ? String(item.endDate).slice(0, 10) : "Present"}`
            : "",
        ].filter(Boolean);
        return parts.join(" · ");
      }}
    />
  );
}
