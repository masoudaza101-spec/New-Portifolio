"use client";

import SimpleManager from "@/components/admin/SimpleManager";

type Experience = {
  id: string;
  title: string;
  organization: string | null;
  startDate: string;
  endDate: string | null;
  description: string;
  current: boolean;
  order: number;
};

const toForm = (item: Experience) => ({
  title: item.title,
  organization: item.organization ?? "",
  startDate: item.startDate.slice(0, 10),
  endDate: item.endDate ? item.endDate.slice(0, 10) : "",
  current: item.current,
  order: String(item.order ?? ""),
  description: item.description,
});

const toPayload = (form: Record<string, string | boolean>) => ({
  title: form.title,
  organization: form.organization || null,
  startDate: form.startDate,
  endDate: form.current ? null : form.endDate || null,
  current: form.current,
  order: form.order === "" ? undefined : Number(form.order),
  description: form.description,
});

export default function ExperienceManager() {
  return (
    <SimpleManager
      apiPath="/api/experience"
      title="Experience"
      description="Career history shown on the homepage"
      fields={[
        { key: "title", label: "Title", required: true },
        { key: "organization", label: "Organization" },
        { key: "startDate", label: "Start date", type: "date", required: true },
        { key: "endDate", label: "End date", type: "date", optional: true },
        { key: "order", label: "Order", type: "number" },
        { key: "current", label: "Current role", type: "checkbox" },
        { key: "description", label: "Description", type: "textarea", required: true },
      ]}
      defaultForm={{
        title: "",
        organization: "",
        startDate: "",
        endDate: "",
        current: false,
        order: "",
        description: "",
      }}
      toForm={toForm}
      toPayload={toPayload}
      itemTitle={(item) => `${item.title}${item.organization ? ` — ${item.organization}` : ""}`}
      itemSubtitle={(item) => {
        const start = String(item.startDate).slice(0, 10);
        const end = item.endDate ? String(item.endDate).slice(0, 10) : "Present";
        return `${start} → ${end}`;
      }}
      itemBadges={(item) =>
        item.current ? [{ label: "Current", tone: "green" as const }] : []
      }
    />
  );
}
