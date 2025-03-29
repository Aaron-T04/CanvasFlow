"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Palette } from "lucide-react"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="mx-auto mb-6"
        >
          <Palette size={64} className="text-primary" />
        </motion.div>
        <h1 className="mb-2 text-4xl font-bold text-primary">CanvasFlow</h1>
        <p className="mb-6 text-muted-foreground">Unleash your creativity</p>

        <div className="relative h-2 w-64 overflow-hidden rounded-full bg-muted">
          <motion.div
            className="absolute left-0 top-0 h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{progress}%</p>
      </motion.div>
    </div>
  )
}

