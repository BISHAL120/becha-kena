import React from "react";

const Loading = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex justify-end items-center">
        <svg
          role="img"
          width="300"
          height="100"
          aria-labelledby="loading-aria"
          viewBox="0 0 200 100"
          preserveAspectRatio="none"
          className=""
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
              <rect x="48" y="45" rx="0" ry="0" width="354" height="51" />
              <rect x="221" y="148" rx="0" ry="0" width="2" height="0" />
              <rect x="183" y="267" rx="0" ry="0" width="3" height="1" />
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
        <svg
          role="img"
          width="300"
          height="100"
          aria-labelledby="loading-aria"
          viewBox="20 0 200 100"
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
              <rect x="48" y="45" rx="0" ry="0" width="354" height="51" />
              <rect x="221" y="148" rx="0" ry="0" width="2" height="0" />
              <rect x="183" y="267" rx="0" ry="0" width="3" height="1" />
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
      <div className="container mx-auto py-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div className="border rounded-lg pb-2 overflow-hidden" key={i}>
              <svg
                role="img"
                width="390"
                height="460"
                aria-labelledby="loading-aria"
                viewBox="6 10 400 460"
                preserveAspectRatio="none"
              >
                <title id="loading-aria">Loading...</title>
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  clipPath="url(#clipPath)"
                  style={{ fill: "url(#fill)" }}
                ></rect>
                <defs>
                  <clipPath id="clipPath">
                    <rect
                      x="12"
                      y="16"
                      rx="12"
                      ry="12"
                      width="243"
                      height="238"
                    />
                    <rect
                      x="22"
                      y="280"
                      rx="0"
                      ry="0"
                      width="202"
                      height="20"
                    />
                    <rect
                      x="22"
                      y="306"
                      rx="0"
                      ry="0"
                      width="140"
                      height="18"
                    />
                    <rect
                      x="66"
                      y="351"
                      rx="0"
                      ry="0"
                      width="166"
                      height="18"
                    />
                    <rect
                      x="65"
                      y="395"
                      rx="0"
                      ry="0"
                      width="147"
                      height="16"
                    />
                    <rect
                      x="26"
                      y="442"
                      rx="0"
                      ry="0"
                      width="105"
                      height="19"
                    />
                    <rect
                      x="201"
                      y="442"
                      rx="0"
                      ry="0"
                      width="43"
                      height="22"
                    />
                    <circle cx="41" cy="362" r="20" />
                    <circle cx="42" cy="402" r="16" />
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
        </div>
      </div>
    </div>
  );
};

export default Loading;
