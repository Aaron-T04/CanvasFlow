"use client"

import { useEffect, useRef } from "react"

type SoundType = "draw" | "select" | "clear" | "download"

export function useSoundEffects() {
  const audioRefs = useRef<Record<SoundType, HTMLAudioElement | null>>({
    draw: null,
    select: null,
    clear: null,
    download: null,
  })

  useEffect(() => {
    // Create audio elements
    audioRefs.current = {
      draw: new Audio("/sounds/draw.mp3"),
      select: new Audio("/sounds/select.mp3"),
      clear: new Audio("/sounds/clear.mp3"),
      download: new Audio("/sounds/download.mp3"),
    }

    // Set volume
    Object.values(audioRefs.current).forEach((audio) => {
      if (audio) {
        audio.volume = 0.3
      }
    })

    // Cleanup
    return () => {
      Object.values(audioRefs.current).forEach((audio) => {
        if (audio) {
          audio.pause()
          audio.src = ""
        }
      })
    }
  }, [])

  const playSound = (type: SoundType) => {
    const audio = audioRefs.current[type]
    if (audio) {
      // Reset the audio to start
      audio.currentTime = 0
      audio.play().catch((err) => {
        // Silently fail - this is likely due to user not interacting with the page yet
        console.log("Audio play failed:", err)
      })
    }
  }

  return { playSound }
}

