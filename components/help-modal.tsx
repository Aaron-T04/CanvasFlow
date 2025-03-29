"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Brush, Eraser, Trash2, Download, Palette, Moon, HelpCircle } from "lucide-react"

interface HelpModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ToolInfo {
  icon: React.ReactNode
  name: string
  description: string
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const tools: ToolInfo[] = [
    {
      icon: <Palette className="h-5 w-5" />,
      name: "Color Picker",
      description: "Choose from preset colors or create your own custom color",
    },
    {
      icon: <Brush className="h-5 w-5" />,
      name: "Brush Size",
      description: "Adjust the size of your brush using the slider",
    },
    {
      icon: <Eraser className="h-5 w-5" />,
      name: "Eraser",
      description: "Erase parts of your drawing",
    },
    {
      icon: <Trash2 className="h-5 w-5" />,
      name: "Clear Canvas",
      description: "Clear the entire canvas to start fresh",
    },
    {
      icon: <Download className="h-5 w-5" />,
      name: "Download",
      description: "Save your artwork as a PNG image",
    },
    {
      icon: <Moon className="h-5 w-5" />,
      name: "Theme Toggle",
      description: "Switch between light and dark mode",
    },
    {
      icon: <HelpCircle className="h-5 w-5" />,
      name: "Help",
      description: "Open this help modal to learn about the tools",
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>CanvasFlow Help</DialogTitle>
          <DialogDescription>Learn how to use the tools in CanvasFlow</DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {tools.map((tool, index) => (
            <div key={index} className="flex items-start gap-3 rounded-lg border p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">{tool.icon}</div>
              <div>
                <h3 className="font-medium">{tool.name}</h3>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
              </div>
            </div>
          ))}

          <div className="mt-6 rounded-lg border p-4">
            <h3 className="mb-2 font-medium">Tips & Tricks</h3>
            <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
              <li>Use a larger brush size for backgrounds and smaller for details</li>
              <li>Try different colors to create gradients and shading</li>
              <li>The eraser can help refine edges and fix mistakes</li>
              <li>Save your work frequently by downloading your artwork</li>
              <li>Switch to dark mode for a different drawing experience</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

