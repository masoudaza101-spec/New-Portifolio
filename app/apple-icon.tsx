import { ImageResponse } from "next/og";

export const contentType = "image/png";
export const size = { width: 180, height: 180 };
export const alt = "AZ";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
        }}
      >
        <span
          style={{
            color: "#f5f5f5",
            fontSize: 72,
            fontWeight: 800,
            fontFamily: "Inter, sans-serif",
            letterSpacing: -2,
          }}
        >
          AZ
        </span>
      </div>
    ),
    { ...size }
  );
}
