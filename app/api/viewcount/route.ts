import { ipAddress } from "@vercel/functions"
import { type NextRequest, NextResponse } from "next/server"
import { safeRedis } from "@/app/lib/redis"

export const runtime = "edge"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const slug = body.slug as string | undefined
  if (!slug) {
    return new NextResponse("Slug not found", { status: 400 })
  }

  // Get IP address safely (handle localhost)
  // @vercel/functions ipAddress might fail on localhost without proper headers
  let ip: string = "localhost"
  try {
    const vercelIp = ipAddress(req)
    if (vercelIp && typeof vercelIp === "string") {
      ip = vercelIp
    }
  } catch (_error) {
    // Silently handle localhost/development environment
    // In production with Vercel, this will work correctly
  }

  // Hash the IP and turn it into a hex string
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip))
  const hash = Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")

  const isNew = await safeRedis.set(["deduplicate", hash, slug].join(":"), true, {
    nx: true,
    ex: 24 * 60 * 60,
  })

  // If not new visitor or Redis unavailable, still return success
  if (isNew === false) {
    return new NextResponse(null, { status: 202 })
  }

  // Increment view count (safe to call even if Redis is unavailable)
  await safeRedis.incr(["pageviews", "example", slug].join(":"))
  return new NextResponse(null, { status: 202 })
}
