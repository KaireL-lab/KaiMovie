import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0089ff, #0055cc)",
          borderRadius: "6px",
          fontFamily: "Arial Black, Arial, sans-serif",
        }}
      >
        <span style={{ fontSize: 22, fontWeight: 900, color: "white" }}>K</span>
      </div>
    ),
    { ...size }
  );
}
