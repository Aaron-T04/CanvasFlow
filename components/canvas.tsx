"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSoundEffects } from "@/hooks/use-sound-effects";

interface Point {
  x: number;
  y: number;
  color: string;
  size: number;
  isEraser: boolean;
}

interface CanvasProps {
  color: string;
  brushSize: number;
  isEraser: boolean;
}

export default function Canvas({ color, brushSize, isEraser }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<Point[]>([]);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const { playSound } = useSoundEffects();

  // Handle canvas resize
  useEffect(() => {
    const updateCanvasSize = () => {
      const container = canvasRef.current?.parentElement;
      if (container) {
        setCanvasSize({
          width: container.clientWidth,
          height: container.clientHeight,
        });
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  // Initialize & redraw canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawPoints(ctx, points);
  }, [canvasSize, points]);

  // Clear canvas on event
  useEffect(() => {
    const handleClearCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      setPoints([]);
      playSound("clear");
    };

    window.addEventListener("clearCanvas", handleClearCanvas);
    return () => window.removeEventListener("clearCanvas", handleClearCanvas);
  }, []);

  // Download canvas on event
  useEffect(() => {
    const handleDownload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `canvasflow-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = dataURL;
      link.click();
      playSound("download");
    };

    window.addEventListener("downloadCanvas", handleDownload);
    return () => window.removeEventListener("downloadCanvas", handleDownload);
  }, []);

  const drawPoints = (ctx: CanvasRenderingContext2D, pointsToDraw: Point[]) => {
    for (let i = 0; i < pointsToDraw.length; i++) {
      const point = pointsToDraw[i];

      ctx.globalCompositeOperation = point.isEraser ? "destination-out" : "source-over";
      ctx.beginPath();
      ctx.arc(point.x, point.y, point.size / 2, 0, Math.PI * 2);
      ctx.fillStyle = point.color;
      ctx.fill();

      if (i > 0) {
        const prev = pointsToDraw[i - 1];
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(point.x, point.y);
        ctx.strokeStyle = point.color;
        ctx.lineWidth = point.size;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }
    }
  };

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    const newPoint = { x, y, color, size: brushSize, isEraser };
    setPoints((prev) => [...prev, newPoint]);
    playSound("draw");
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;
    const { x, y } = getCoordinates(e);
    const newPoint = { x, y, color, size: brushSize, isEraser };
    setPoints((prev) => [...prev, newPoint]);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = isEraser ? "destination-out" : "source-over";
    ctx.beginPath();
    ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    if (points.length > 0) {
      const prev = points[points.length - 1];
      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(x, y);
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const getCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();

    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-gray-50 p-4 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-full w-full overflow-hidden rounded-lg shadow-lg"
      >
        <canvas
          ref={canvasRef}
          className="absolute left-0 top-0 touch-none bg-white"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          width={canvasSize.width}
          height={canvasSize.height}
        />
      </motion.div>
    </div>
  );
}
