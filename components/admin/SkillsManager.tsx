"use client";

import SimpleManager from "@/components/admin/SimpleManager";

type Skill = {
  id: string;
  category: string;
  name: string;
  icon: string | null;
  order: number;
  visible: boolean;
};

const toForm = (item: Skill) => ({
  category: item.category,
  name: item.name,
  icon: item.icon ?? "",
  order: String(item.order ?? ""),
  visible: item.visible,
});

const toPayload = (form: Record<string, string | boolean>) => ({
  category: form.category,
  name: form.name,
  icon: form.icon || null,
  order: form.order === "" ? undefined : Number(form.order),
  visible: form.visible,
});

export default function SkillsManager() {
  return (
    <SimpleManager
      apiPath="/api/skills"
      title="Skills"
      description="Technical skills grouped by category"
      fields={[
        { key: "category", label: "Category", required: true, placeholder: "Frontend" },
        { key: "name", label: "Skill", required: true, placeholder: "Next.js" },
        { key: "icon", label: "Icon key", optional: true },
        { key: "order", label: "Order", type: "number" },
        { key: "visible", label: "Visible", type: "checkbox" },
      ]}
      defaultForm={{
        category: "",
        name: "",
        icon: "",
        order: "",
        visible: true,
      }}
      toForm={toForm}
      toPayload={toPayload}
      itemTitle={(item) => String(item.name)}
      itemSubtitle={(item) => String(item.category)}
      itemBadges={(item) =>
        item.visible
          ? [{ label: "Visible", tone: "green" as const }]
          : [{ label: "Hidden", tone: "danger" as const }]
      }
    />
  );
}
