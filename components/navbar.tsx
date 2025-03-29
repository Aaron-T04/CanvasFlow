"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  onHelpClick: () => void
}

export default function Navbar({ onHelpClick }: NavbarProps) {
  return (
    <header className="border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-primary">CanvasFlow</h1>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={onHelpClick} aria-label="Help">
            <HelpCircle className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

