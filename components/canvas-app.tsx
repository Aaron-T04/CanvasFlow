"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Toolbar from "@/components/toolbar"
import Canvas from "@/components/canvas"
import HelpModal from "@/components/help-modal"
import { useToast } from "@/hooks/use-toast"
import { useSoundEffects } from "@/hooks/use-sound-effects"

export default function CanvasApp() {
  const [color, setColor] = useState("#000000")
  const [brushSize, setBrushSize] = useState(5)
  const [isEraser, setIsEraser] = useState(false)
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const { toast } = useToast()
  const { playSound } = useSoundEffects()

  const handleColorChange = (newColor: string) => {
    setColor(newColor)
    setIsEraser(false)
    playSound("select")
    toast({
      title: "Color changed",
      description: `Selected color: ${newColor}`,
      duration: 1500,
    })
  }

  const handleBrushSizeChange = (size: number) => {
    setBrushSize(size)
    playSound("select")
  }

  const handleEraserToggle = () => {
    setIsEraser(!isEraser)
    playSound("select")
    toast({
      title: isEraser ? "Brush selected" : "Eraser selected",
      duration: 1500,
    })
  }

  const handleClearCanvas = () => {
    // This function will be passed to the Canvas component
    // The actual clearing happens there
    playSound("clear")
    toast({
      title: "Canvas cleared",
      description: "Your drawing has been cleared",
      duration: 2000,
    })
  }

  const handleDownload = () => {
    // This function will be passed to the Canvas component
    // The actual download happens there
    playSound("download")
    toast({
      title: "Drawing downloaded",
      description: "Your artwork has been saved",
      duration: 2000,
    })
  }

  const toggleHelpModal = () => {
    setIsHelpOpen(!isHelpOpen)
    playSound("select")
  }

  return (
    <div className="flex h-screen flex-col">
      <Navbar onHelpClick={toggleHelpModal} />
      <div className="flex flex-1 overflow-hidden">
        <Toolbar
          color={color}
          brushSize={brushSize}
          isEraser={isEraser}
          onColorChange={handleColorChange}
          onBrushSizeChange={handleBrushSizeChange}
          onEraserToggle={handleEraserToggle}
          onClearCanvas={handleClearCanvas}
          onDownload={handleDownload}
        />
        <Canvas
          color={color}
          brushSize={brushSize}
          isEraser={isEraser}
          onClearCanvas={handleClearCanvas}
          onDownload={handleDownload}
        />
      </div>
      <HelpModal isOpen={isHelpOpen} onClose={toggleHelpModal} />
    </div>
  )
}

