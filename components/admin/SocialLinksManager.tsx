"use client";

import SimpleManager from "@/components/admin/SimpleManager";

type SocialLink = {
  id: string;
  platform: string;
  url: string;
  icon: string | null;
  visible: boolean;
  order: number;
};

const toForm = (item: SocialLink) => ({
  platform: item.platform,
  url: item.url,
  icon: item.icon ?? "",
  order: String(item.order ?? ""),
  visible: item.visible,
});

const toPayload = (form: Record<string, string | boolean>) => ({
  platform: form.platform,
  url: form.url,
  icon: form.icon || null,
  order: form.order === "" ? undefined : Number(form.order),
  visible: form.visible,
});

export default function SocialLinksManager() {
  return (
    <SimpleManager
      apiPath="/api/social-links"
      title="Social Links"
      description="Links shown in the hero, contact section and footer"
      fields={[
        { key: "platform", label: "Platform", required: true, placeholder: "github" },
        { key: "url", label: "URL", required: true, placeholder: "https://github.com/…" },
        { key: "icon", label: "Icon key", optional: true },
        { key: "order", label: "Order", type: "number" },
        { key: "visible", label: "Visible", type: "checkbox" },
      ]}
      defaultForm={{
        platform: "",
        url: "",
        icon: "",
        order: "",
        visible: true,
      }}
      toForm={toForm}
      toPayload={toPayload}
      itemTitle={(item) => String(item.platform)}
      itemSubtitle={(item) => String(item.url)}
      itemBadges={(item) =>
        item.visible
          ? [{ label: "Visible", tone: "green" as const }]
          : [{ label: "Hidden", tone: "danger" as const }]
      }
    />
  );
}
