import { ImageResponse } from "next/og";

export const alt = "Aza Masoud — Information Systems & Web Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#04060a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-120px",
            left: "-80px",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,183,221,0.1) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              background: "#00d4ff",
              boxShadow: "0 0 12px rgba(0,212,255,0.8)",
            }}
          />
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "14px",
              color: "#94a3b8",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "72px",
            fontWeight: "700",
            color: "#f8fafc",
            lineHeight: "1.05",
            letterSpacing: "-0.02em",
            fontFamily: "Georgia, serif",
          }}
        >
          Aza
          <span
            style={{
              WebkitTextStroke: "1.5px #f8fafc",
              color: "transparent",
            }}
          >
            Masoud
          </span>
          <span style={{ color: "#00d4ff" }}>.</span>
        </div>
        <div
          style={{
            marginTop: "24px",
            fontSize: "22px",
            color: "#94a3b8",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            letterSpacing: "0.02em",
          }}
        >
          Information Systems & Web Developer — Tanzania
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "80px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "13px",
              color: "#64748b",
              letterSpacing: "0.05em",
            }}
          >
            azamasoud.pharmpay.co.tz
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
