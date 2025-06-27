import React from "react";

const Loading = () => {
  return (
    <div>
      <div className="pb-16">
        <div className="flex justify-between items-center">
          <svg
            role="img"
            width="270"
            height="55"
            aria-labelledby="loading-aria"
            viewBox="0 0 230 40"
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
              <clipPath id="clip-path2">
                <rect x="7" y="0" rx="0" ry="0" width="220" height="40" />
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
          <div className="flex justify-center items-center gap-5">
            <svg
              role="img"
              width="190"
              height="45"
              aria-labelledby="loading-aria"
              viewBox="0 0 230 40"
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
                <clipPath id="clip-path2">
                  <rect x="7" y="0" rx="0" ry="0" width="220" height="40" />
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
              width="190"
              height="45"
              aria-labelledby="loading-aria"
              viewBox="0 0 230 40"
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
                <clipPath id="clip-path2">
                  <rect x="7" y="0" rx="0" ry="0" width="220" height="40" />
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
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 14 }).map((_, index) => (
            <div key={index} className="border w-[310px] rounded-md">
              <svg
                role="img"
                width="310"
                height="400"
                aria-labelledby="loading-aria"
                viewBox="7 0 320 400"
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
                    <rect x="221" y="148" rx="0" ry="0" width="2" height="0" />
                    <rect
                      x="14"
                      y="10"
                      rx="0"
                      ry="0"
                      width="306"
                      height="186"
                    />
                    <rect
                      x="29"
                      y="221"
                      rx="0"
                      ry="0"
                      width="259"
                      height="26"
                    />
                    <rect x="30" y="253" rx="0" ry="0" width="16" height="16" />
                    <rect x="50" y="253" rx="0" ry="0" width="16" height="16" />
                    <rect x="70" y="253" rx="0" ry="0" width="16" height="16" />
                    <rect x="90" y="253" rx="0" ry="0" width="16" height="16" />
                    <rect
                      x="110"
                      y="253"
                      rx="0"
                      ry="0"
                      width="16"
                      height="16"
                    />
                    <rect
                      x="140"
                      y="253"
                      rx="0"
                      ry="0"
                      width="37"
                      height="15"
                    />
                    <rect x="32" y="297" rx="0" ry="0" width="0" height="1" />
                    <rect
                      x="28"
                      y="290"
                      rx="0"
                      ry="0"
                      width="240"
                      height="17"
                    />
                    <rect x="28" y="318" rx="0" ry="0" width="32" height="1" />
                    <rect
                      x="28"
                      y="318"
                      rx="0"
                      ry="0"
                      width="102"
                      height="15"
                    />
                    <rect
                      x="28"
                      y="350"
                      rx="0"
                      ry="0"
                      width="277"
                      height="42"
                    />
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
