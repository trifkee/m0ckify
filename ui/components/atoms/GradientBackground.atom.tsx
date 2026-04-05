"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";

interface GradientBackgroundProps {
  color: string;
  gradientColor: string;
  gradientAngle: number;
  gradientColorStop: number;
}

export default function GradientBackground({
  color,
  gradientColor,
  gradientAngle,
  gradientColorStop,
}: GradientBackgroundProps) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    const rad = (gradientAngle * Math.PI) / 180;
    const cx = 256;
    const cy = 256;
    const r = 362; // half-diagonal of 512x512

    const x1 = cx + r * Math.cos(rad + Math.PI);
    const y1 = cy + r * Math.sin(rad + Math.PI);
    const x2 = cx + r * Math.cos(rad);
    const y2 = cy + r * Math.sin(rad);

    const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
    const stops = gradientColorStop / 100;
    gradient.addColorStop(0, color);
    gradient.addColorStop(stops, gradientColor);
    gradient.addColorStop(1, gradientColor);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    return new THREE.CanvasTexture(canvas);
  }, [color, gradientColor, gradientAngle, gradientColorStop]);

  useEffect(() => {
    return () => {
      texture.dispose();
    };
  }, [texture]);

  return <primitive object={texture} attach="background" />;
}
