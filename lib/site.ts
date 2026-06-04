export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.dkountanis.xyz"

export const siteName = "Dimitris Kountanis"

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString()
}

export function ogImageUrl(title = siteName) {
  return absoluteUrl(`/og?title=${encodeURIComponent(title)}`)
}
