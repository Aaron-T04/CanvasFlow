"use client"

import { useState, useEffect } from "react"
import LoadingScreen from "@/components/loading-screen"
import CanvasApp from "@/components/canvas-app"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return <main className="min-h-screen">{isLoading ? <LoadingScreen /> : <CanvasApp />}</main>
}

