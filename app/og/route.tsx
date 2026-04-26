import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"
import { absoluteUrl } from "@/lib/site"

export const runtime = "edge"

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const postTitle = searchParams.get("title") || "Dimitris Kountanis"

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundImage: `url(${absoluteUrl("/ob-bg.png")})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          marginTop: -200,
          marginLeft: 190,
          marginRight: 190,
          display: "flex",
          fontSize: 130,
          fontFamily: "sans-serif",
          letterSpacing: "-0.05em",
          fontStyle: "normal",
          color: "white",
          lineHeight: "120px",
          whiteSpace: "pre-wrap",
        }}
      >
        {postTitle}
      </div>
    </div>,
    {
      width: 1920,
      height: 1080,
    },
  )
}
