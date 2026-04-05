"use client";

import { useState, useRef, useEffect } from "react";
import "@/ui/styles/atoms/rotationWheel.atom.scss";

interface RotationWheelProps {
  value: number;
  onChange: (angle: number) => void;
}

export default function RotationWheel({ value, onChange }: RotationWheelProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateAngle(e);
  };

  const updateAngle = (e: React.MouseEvent | MouseEvent) => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;

    onChange(Math.round(angle));
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      updateAngle(e);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 360) * circumference;

  const thumbAngle = (value * Math.PI) / 180;
  const thumbX = 70 + radius * Math.cos(thumbAngle - Math.PI / 2);
  const thumbY = 70 + radius * Math.sin(thumbAngle - Math.PI / 2);

  return (
    <div className="circular-slider-container">
      <svg
        ref={svgRef}
        className="circular-slider"
        viewBox="0 0 140 140"
        width="140"
        height="140"
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
        onMouseDown={handleMouseDown}
      >
        {/* Background circle */}
        <circle cx="70" cy="70" r="60" fill="none" stroke="rgb(68, 68, 68)" strokeWidth="2" />

        {/* Progress circle */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="progress-circle"
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "70px 70px",
          }}
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(150, 150, 150)" />
            <stop offset="100%" stopColor="rgb(100, 100, 100)" />
          </linearGradient>
        </defs>

        {/* Center display */}
        <circle cx="70" cy="70" r="35" fill="rgb(45, 45, 45)" />

        {/* Center text */}
        <text
          x="70"
          y="75"
          textAnchor="middle"
          dominantBaseline="middle"
          className="center-text"
        >
          {value}°
        </text>

        {/* Thumb */}
        <circle
          cx={thumbX}
          cy={thumbY}
          r="6"
          fill="rgb(200, 200, 200)"
          stroke="rgb(255, 255, 255)"
          strokeWidth="2"
          className="thumb"
          style={{
            filter: isDragging ? "drop-shadow(0 0 8px rgba(200, 200, 200, 0.8))" : "drop-shadow(0 0 4px rgba(200, 200, 200, 0.4))",
          }}
        />
      </svg>
    </div>
  );
}


