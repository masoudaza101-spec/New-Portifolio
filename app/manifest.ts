import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "AZA",
    description: site.metaDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#04060a",
    theme_color: "#04060a",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
