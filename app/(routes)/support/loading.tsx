import React from "react";

const Loading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center items-center mx-auto py-10">
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className="border w-[420px] h-[230px] rounded-md">
          <svg
            role="img"
            width="420"
            height="220"
            aria-labelledby="loading-aria"
            viewBox="0 0 420 220"
            preserveAspectRatio="none"
          >
            <title id="loading-aria">Loading...</title>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              clipPath="url(#clip-path)"
              style={{ fill: "url(#fill)" }}
            ></rect>
            <defs>
              <clipPath id="clip-path">
                <circle cx="66" cy="55" r="32" />
                <rect x="111" y="36" rx="0" ry="0" width="249" height="37" />
                <rect x="34" y="103" rx="0" ry="0" width="252" height="19" />
                <rect x="35" y="129" rx="0" ry="0" width="234" height="20" />
                <rect x="35" y="169" rx="0" ry="0" width="117" height="40" />
              </clipPath>
              <linearGradient id="fill">
                <stop offset="0.599964" stopColor="#e9e2e8" stopOpacity="1">
                  <animate
                    attributeName="offset"
                    values="-2; -2; 1"
                    keyTimes="0; 0.25; 1"
                    dur="2s"
                    repeatCount="indefinite"
                  ></animate>
                </stop>
                <stop offset="1.59996" stopColor="#cdc1c1" stopOpacity="1">
                  <animate
                    attributeName="offset"
                    values="-1; -1; 2"
                    keyTimes="0; 0.25; 1"
                    dur="2s"
                    repeatCount="indefinite"
                  ></animate>
                </stop>
                <stop offset="2.59996" stopColor="#e9e2e8" stopOpacity="1">
                  <animate
                    attributeName="offset"
                    values="0; 0; 3"
                    keyTimes="0; 0.25; 1"
                    dur="2s"
                    repeatCount="indefinite"
                  ></animate>
                </stop>
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
      )
    </div>
  );
};

export default Loading;
