import React from "react";

function LoadingSpinner({ size = "small", color = "gray-500" }) {
  const spinnerSize = {
    small: "w-4 h-4",
    medium: "w-6 h-6",
    large: "w-8 h-8",
  }[size];

  return (
    <svg
      className={`animate-spin ${spinnerSize} border-2 border-${color} border-t-transparent rounded-full mr-4`}
      viewBox="0 0 24 24"
    >
      {/* Empty SVG for circular animation */}
    </svg>
  );
}

export default LoadingSpinner;
