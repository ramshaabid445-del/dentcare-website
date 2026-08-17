import React from "react";

export default function PricingIcon({ type = "standard", size = 24, color = "currentColor" }) {
  const shared = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };

  if (type === "standard") {
    return (
      <svg {...shared}>
        <circle cx="12" cy="8" r="6" />
        <path d="M9 13.5 7 22l5-3 5 3-2-8.5" />
      </svg>
    );
  }
  if (type === "pro") {
    return (
      <svg {...shared}>
        <path d="M3 8l4 3 5-7 5 7 4-3-2 11H5L3 8Z" />
        <path d="M5 21h14" />
      </svg>
    );
  }
  return (
    <svg {...shared}>
      <path d="M8 4h8v4a4 4 0 0 1-8 0V4Z" />
      <path d="M8 5H5a2 2 0 0 0 0 4h1.5" />
      <path d="M16 5h3a2 2 0 0 1 0 4h-1.5" />
      <path d="M12 12v4" />
      <path d="M9 20h6" />
      <path d="M12 16v4" />
    </svg>
  );
}