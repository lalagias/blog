"use client"

import { ImageDithering } from "@paper-design/shaders-react"

export function DitheredPortrait() {
  return (
    <div className="rounded-md w-48 h-48 overflow-hidden mb-4">
      <ImageDithering
        width="100%"
        height="100%"
        image="/dimitris-photo.jpg"
        colorBack="#000000"
        colorFront="#ffffff"
        colorHighlight="#ffffff"
        originalColors={false}
        inverted={false}
        type="4x4"
        size={2}
        colorSteps={2}
        fit="cover"
      />
    </div>
  )
}
