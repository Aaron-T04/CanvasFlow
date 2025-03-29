"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Brush,
  Eraser,
  Trash2,
  Download,
  Palette,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useSoundEffects } from "@/hooks/use-sound-effects";

interface ToolbarProps {
  color: string;
  brushSize: number;
  isEraser: boolean;
  onColorChange: (color: string) => void;
  onBrushSizeChange: (size: number) => void;
  onEraserToggle: () => void;
}

const COLORS = [
  "#000000",
  "#FFFFFF",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#FFA500",
  "#800080",
  "#008000",
  "#800000",
  "#008080",
  "#000080",
  "#FFC0CB",
];

export default function Toolbar({
  color,
  brushSize,
  isEraser,
  onColorChange,
  onBrushSizeChange,
  onEraserToggle,
}: ToolbarProps) {
  const [customColor, setCustomColor] = useState(color);
  const { playSound } = useSoundEffects();

  const handleCustomColorChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomColor(e.target.value);
  };

  const applyCustomColor = () => {
    onColorChange(customColor);
    playSound("select");
  };

  return (
    <TooltipProvider>
      <div className="flex w-20 flex-col items-center gap-4 border-r bg-muted/40 p-4">
        {/* 🎨 Color Picker */}
        <Popover>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                {/* eslint-disable-next-line react/no-inline-styles */}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-full p-0"
                  style={{ backgroundColor: color }}
                  title="Current brush color"
                  aria-label="Color picker"
                >
                  <Palette className="h-6 w-6 text-white mix-blend-difference" />
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Color Picker</p>
            </TooltipContent>
          </Tooltip>
          <PopoverContent className="w-64" side="right">
            <div className="grid grid-cols-5 gap-2">
              {COLORS.map((c) => (
                <button
                  key={c}
                  className={cn(
                    "h-8 w-8 rounded-full border border-muted-foreground/20",
                    color === c && "ring-2 ring-primary ring-offset-2"
                  )}
                  style={{ backgroundColor: c }}
                  onClick={() => {
                    onColorChange(c);
                    playSound("select");
                  }}
                  aria-label={`Select color ${c}`}
                  title={`Select color ${c}`}
                />
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <label htmlFor="custom-color" className="text-sm font-medium">
                Custom Color
              </label>
              <div className="flex gap-2">
                <input
                  id="custom-color"
                  type="color"
                  title="Pick a custom color"
                  value={customColor}
                  onChange={handleCustomColorChange}
                  className="h-8 w-8 cursor-pointer appearance-none rounded-md border-0 bg-transparent p-0"
                />
                <input
                  type="text"
                  placeholder="e.g. #FF6600"
                  value={customColor}
                  onChange={handleCustomColorChange}
                  className="flex-1 rounded-md border border-input bg-background px-3 py-1 text-sm"
                />
                <Button size="sm" onClick={applyCustomColor}>
                  Apply
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* 🖌️ Brush Size Slider */}
        <div className="flex w-full flex-col gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-col items-center gap-1">
                <Brush className="h-5 w-5 text-muted-foreground" />
                <Slider
                  value={[brushSize]}
                  min={1}
                  max={50}
                  step={1}
                  orientation="vertical"
                  className="h-24"
                  onValueChange={(value) => {
                    onBrushSizeChange(value[0]);
                    playSound("select");
                  }}
                />
                <span className="text-xs text-muted-foreground">
                  {brushSize}px
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Brush Size</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* ✏️ Eraser Toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={isEraser ? "default" : "outline"}
              size="icon"
              onClick={() => {
                onEraserToggle();
                playSound("select");
              }}
              className="h-12 w-12"
              aria-label="Eraser tool"
              aria-pressed={isEraser}
            >
              <Eraser className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Eraser</p>
          </TooltipContent>
        </Tooltip>

        {/* 🗑️ Clear Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                window.dispatchEvent(new Event("clearCanvas"));
                playSound("clear");
              }}
              className="h-12 w-12"
              aria-label="Clear canvas"
            >
              <Trash2 className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Clear Canvas</p>
          </TooltipContent>
        </Tooltip>

        {/* ⬇️ Download Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                window.dispatchEvent(new Event("downloadCanvas"));
                playSound("download");
              }}
              className="h-12 w-12"
              aria-label="Download drawing"
            >
              <Download className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Download</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
