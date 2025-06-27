const Loading = () => {
  return (
    <div className="container md:mx-auto md:px-4 px-1 py-3 md:py-8">
      <div className="grid gap-2 md:gap-8 md:grid-cols-2">
        <div>
          <svg
            role="img"
            width="640"
            height="640"
            aria-labelledby="loading-aria"
            viewBox="0 0 640 640"
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
                <rect x="7" y="0" rx="0" ry="0" width="640" height="640" />
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
          <div className="mt-3 flex justify-start items-center gap-5">
            <svg
              role="img"
              width="100"
              height="100"
              aria-labelledby="loading-aria"
              viewBox="0 0 100 100"
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
                  <rect x="1" y="1" rx="0" ry="0" width="100" height="100" />
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
              width="100"
              height="100"
              aria-labelledby="loading-aria"
              viewBox="0 0 100 100"
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
                  <rect x="1" y="1" rx="0" ry="0" width="100" height="100" />
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
              width="100"
              height="100"
              aria-labelledby="loading-aria"
              viewBox="0 0 100 100"
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
                  <rect x="1" y="1" rx="0" ry="0" width="100" height="100" />
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
              width="100"
              height="100"
              aria-labelledby="loading-aria"
              viewBox="0 0 100 100"
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
                  <rect x="1" y="1" rx="0" ry="0" width="100" height="100" />
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
              width="100"
              height="100"
              aria-labelledby="loading-aria"
              viewBox="0 0 100 100"
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
                  <rect x="1" y="1" rx="0" ry="0" width="100" height="100" />
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
              width="100"
              height="100"
              aria-labelledby="loading-aria"
              viewBox="0 0 100 100"
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
                  <rect x="1" y="1" rx="0" ry="0" width="100" height="100" />
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
        <div className="flex flex-col gap-6 px-3 false">
          <svg
            role="img"
            width="640"
            height="20"
            aria-labelledby="loading-aria"
            viewBox="0 0 640 20"
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
                <rect x="7" y="0" rx="0" ry="0" width="640" height="20" />
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
          <div className="md:flex justify-between items-start ">
            <div>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <svg
                    role="img"
                    width="500"
                    height="28"
                    aria-labelledby="loading-aria"
                    viewBox="0 0 500 28"
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
                        <rect
                          x="7"
                          y="0"
                          rx="0"
                          ry="0"
                          width="220"
                          height="28"
                        />
                      </clipPath>
                      <linearGradient id="fill">
                        <stop
                          offset="0.599964"
                          stopColor="#e9e2e8"
                          stopOpacity="1"
                        >
                          <animate
                            attributeName="offset"
                            values="-2; -2; 1"
                            keyTimes="0; 0.25; 1"
                            dur="2s"
                            repeatCount="indefinite"
                          ></animate>
                        </stop>
                        <stop
                          offset="1.59996"
                          stopColor="#cdc1c1"
                          stopOpacity="1"
                        >
                          <animate
                            attributeName="offset"
                            values="-1; -1; 2"
                            keyTimes="0; 0.25; 1"
                            dur="2s"
                            repeatCount="indefinite"
                          ></animate>
                        </stop>
                        <stop
                          offset="2.59996"
                          stopColor="#e9e2e8"
                          stopOpacity="1"
                        >
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
                    width="500"
                    height="28"
                    aria-labelledby="loading-aria"
                    viewBox="0 0 500 28"
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
                        <rect
                          x="7"
                          y="0"
                          rx="0"
                          ry="0"
                          width="220"
                          height="28"
                        />
                      </clipPath>
                      <linearGradient id="fill">
                        <stop
                          offset="0.599964"
                          stopColor="#e9e2e8"
                          stopOpacity="1"
                        >
                          <animate
                            attributeName="offset"
                            values="-2; -2; 1"
                            keyTimes="0; 0.25; 1"
                            dur="2s"
                            repeatCount="indefinite"
                          ></animate>
                        </stop>
                        <stop
                          offset="1.59996"
                          stopColor="#cdc1c1"
                          stopOpacity="1"
                        >
                          <animate
                            attributeName="offset"
                            values="-1; -1; 2"
                            keyTimes="0; 0.25; 1"
                            dur="2s"
                            repeatCount="indefinite"
                          ></animate>
                        </stop>
                        <stop
                          offset="2.59996"
                          stopColor="#e9e2e8"
                          stopOpacity="1"
                        >
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
                <div className="flex justify-center items-center gap-2">
                  <svg
                    role="img"
                    width="50"
                    height="40"
                    aria-labelledby="loading-aria"
                    viewBox="0 0 50 40"
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
                        <rect
                          x="7"
                          y="0"
                          rx="0"
                          ry="0"
                          width="50"
                          height="30"
                        />
                      </clipPath>
                      <linearGradient id="fill">
                        <stop
                          offset="0.599964"
                          stopColor="#e9e2e8"
                          stopOpacity="1"
                        >
                          <animate
                            attributeName="offset"
                            values="-2; -2; 1"
                            keyTimes="0; 0.25; 1"
                            dur="2s"
                            repeatCount="indefinite"
                          ></animate>
                        </stop>
                        <stop
                          offset="1.59996"
                          stopColor="#cdc1c1"
                          stopOpacity="1"
                        >
                          <animate
                            attributeName="offset"
                            values="-1; -1; 2"
                            keyTimes="0; 0.25; 1"
                            dur="2s"
                            repeatCount="indefinite"
                          ></animate>
                        </stop>
                        <stop
                          offset="2.59996"
                          stopColor="#e9e2e8"
                          stopOpacity="1"
                        >
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
                    width="50"
                    height="40"
                    aria-labelledby="loading-aria"
                    viewBox="0 0 50 40"
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
                        <rect
                          x="7"
                          y="0"
                          rx="0"
                          ry="0"
                          width="220"
                          height="50"
                        />
                      </clipPath>
                      <linearGradient id="fill">
                        <stop
                          offset="0.599964"
                          stopColor="#e9e2e8"
                          stopOpacity="1"
                        >
                          <animate
                            attributeName="offset"
                            values="-2; -2; 1"
                            keyTimes="0; 0.25; 1"
                            dur="2s"
                            repeatCount="indefinite"
                          ></animate>
                        </stop>
                        <stop
                          offset="1.59996"
                          stopColor="#cdc1c1"
                          stopOpacity="1"
                        >
                          <animate
                            attributeName="offset"
                            values="-1; -1; 2"
                            keyTimes="0; 0.25; 1"
                            dur="2s"
                            repeatCount="indefinite"
                          ></animate>
                        </stop>
                        <stop
                          offset="2.59996"
                          stopColor="#e9e2e8"
                          stopOpacity="1"
                        >
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
              <svg
                role="img"
                width="200"
                height="20"
                aria-labelledby="loading-aria"
                viewBox="0 0 200 20"
                preserveAspectRatio="none"
                className="mt-2"
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
              <div className="flex items-center justify-between gap-4 mb-10 mt-3">
                <svg
                  role="img"
                  width="300"
                  height="35"
                  aria-labelledby="loading-aria"
                  viewBox="0 0 300 35"
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
                      <rect x="7" y="0" rx="0" ry="0" width="300" height="40" />
                    </clipPath>
                    <linearGradient id="fill">
                      <stop
                        offset="0.599964"
                        stopColor="#e9e2e8"
                        stopOpacity="1"
                      >
                        <animate
                          attributeName="offset"
                          values="-2; -2; 1"
                          keyTimes="0; 0.25; 1"
                          dur="2s"
                          repeatCount="indefinite"
                        ></animate>
                      </stop>
                      <stop
                        offset="1.59996"
                        stopColor="#cdc1c1"
                        stopOpacity="1"
                      >
                        <animate
                          attributeName="offset"
                          values="-1; -1; 2"
                          keyTimes="0; 0.25; 1"
                          dur="2s"
                          repeatCount="indefinite"
                        ></animate>
                      </stop>
                      <stop
                        offset="2.59996"
                        stopColor="#e9e2e8"
                        stopOpacity="1"
                      >
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
                  width="50"
                  height="20"
                  aria-labelledby="loading-aria"
                  viewBox="0 0 50 20"
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
                      <rect x="7" y="0" rx="0" ry="0" width="50" height="40" />
                    </clipPath>
                    <linearGradient id="fill">
                      <stop
                        offset="0.599964"
                        stopColor="#e9e2e8"
                        stopOpacity="1"
                      >
                        <animate
                          attributeName="offset"
                          values="-2; -2; 1"
                          keyTimes="0; 0.25; 1"
                          dur="2s"
                          repeatCount="indefinite"
                        ></animate>
                      </stop>
                      <stop
                        offset="1.59996"
                        stopColor="#cdc1c1"
                        stopOpacity="1"
                      >
                        <animate
                          attributeName="offset"
                          values="-1; -1; 2"
                          keyTimes="0; 0.25; 1"
                          dur="2s"
                          repeatCount="indefinite"
                        ></animate>
                      </stop>
                      <stop
                        offset="2.59996"
                        stopColor="#e9e2e8"
                        stopOpacity="1"
                      >
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
              <div>
                <div className="flex justify-between items-center">
                  <svg
                    role="img"
                    width="200"
                    height="50"
                    aria-labelledby="loading-aria"
                    viewBox="0 0 200 50"
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
                        <rect
                          x="7"
                          y="0"
                          rx="0"
                          ry="0"
                          width="220"
                          height="50"
                        />
                      </clipPath>
                      <linearGradient id="fill">
                        <stop
                          offset="0.599964"
                          stopColor="#e9e2e8"
                          stopOpacity="1"
                        >
                          <animate
                            attributeName="offset"
                            values="-2; -2; 1"
                            keyTimes="0; 0.25; 1"
                            dur="2s"
                            repeatCount="indefinite"
                          ></animate>
                        </stop>
                        <stop
                          offset="1.59996"
                          stopColor="#cdc1c1"
                          stopOpacity="1"
                        >
                          <animate
                            attributeName="offset"
                            values="-1; -1; 2"
                            keyTimes="0; 0.25; 1"
                            dur="2s"
                            repeatCount="indefinite"
                          ></animate>
                        </stop>
                        <stop
                          offset="2.59996"
                          stopColor="#e9e2e8"
                          stopOpacity="1"
                        >
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
                    width="135"
                    height="35"
                    aria-labelledby="loading-aria"
                    viewBox="0 0 135 35"
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
                        <rect
                          x="7"
                          y="0"
                          rx="0"
                          ry="0"
                          width="220"
                          height="35"
                        />
                      </clipPath>
                      <linearGradient id="fill">
                        <stop
                          offset="0.599964"
                          stopColor="#e9e2e8"
                          stopOpacity="1"
                        >
                          <animate
                            attributeName="offset"
                            values="-2; -2; 1"
                            keyTimes="0; 0.25; 1"
                            dur="2s"
                            repeatCount="indefinite"
                          ></animate>
                        </stop>
                        <stop
                          offset="1.59996"
                          stopColor="#cdc1c1"
                          stopOpacity="1"
                        >
                          <animate
                            attributeName="offset"
                            values="-1; -1; 2"
                            keyTimes="0; 0.25; 1"
                            dur="2s"
                            repeatCount="indefinite"
                          ></animate>
                        </stop>
                        <stop
                          offset="2.59996"
                          stopColor="#e9e2e8"
                          stopOpacity="1"
                        >
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
              <div className="mt-6 space-y-4">
                <svg
                  role="img"
                  width="620"
                  height="40"
                  aria-labelledby="loading-aria"
                  viewBox="0 0 620 40"
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
                      <rect x="7" y="0" rx="0" ry="0" width="220" height="40" />
                    </clipPath>
                    <linearGradient id="fill">
                      <stop
                        offset="0.599964"
                        stopColor="#e9e2e8"
                        stopOpacity="1"
                      >
                        <animate
                          attributeName="offset"
                          values="-2; -2; 1"
                          keyTimes="0; 0.25; 1"
                          dur="2s"
                          repeatCount="indefinite"
                        ></animate>
                      </stop>
                      <stop
                        offset="1.59996"
                        stopColor="#cdc1c1"
                        stopOpacity="1"
                      >
                        <animate
                          attributeName="offset"
                          values="-1; -1; 2"
                          keyTimes="0; 0.25; 1"
                          dur="2s"
                          repeatCount="indefinite"
                        ></animate>
                      </stop>
                      <stop
                        offset="2.59996"
                        stopColor="#e9e2e8"
                        stopOpacity="1"
                      >
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
                  width="620"
                  height="40"
                  aria-labelledby="loading-aria"
                  viewBox="0 0 620 40"
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
                      <rect x="7" y="0" rx="0" ry="0" width="220" height="40" />
                    </clipPath>
                    <linearGradient id="fill">
                      <stop
                        offset="0.599964"
                        stopColor="#e9e2e8"
                        stopOpacity="1"
                      >
                        <animate
                          attributeName="offset"
                          values="-2; -2; 1"
                          keyTimes="0; 0.25; 1"
                          dur="2s"
                          repeatCount="indefinite"
                        ></animate>
                      </stop>
                      <stop
                        offset="1.59996"
                        stopColor="#cdc1c1"
                        stopOpacity="1"
                      >
                        <animate
                          attributeName="offset"
                          values="-1; -1; 2"
                          keyTimes="0; 0.25; 1"
                          dur="2s"
                          repeatCount="indefinite"
                        ></animate>
                      </stop>
                      <stop
                        offset="2.59996"
                        stopColor="#e9e2e8"
                        stopOpacity="1"
                      >
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
                  width="620"
                  height="40"
                  aria-labelledby="loading-aria"
                  viewBox="0 0 620 40"
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
                      <rect x="7" y="0" rx="0" ry="0" width="220" height="40" />
                    </clipPath>
                    <linearGradient id="fill">
                      <stop
                        offset="0.599964"
                        stopColor="#e9e2e8"
                        stopOpacity="1"
                      >
                        <animate
                          attributeName="offset"
                          values="-2; -2; 1"
                          keyTimes="0; 0.25; 1"
                          dur="2s"
                          repeatCount="indefinite"
                        ></animate>
                      </stop>
                      <stop
                        offset="1.59996"
                        stopColor="#cdc1c1"
                        stopOpacity="1"
                      >
                        <animate
                          attributeName="offset"
                          values="-1; -1; 2"
                          keyTimes="0; 0.25; 1"
                          dur="2s"
                          repeatCount="indefinite"
                        ></animate>
                      </stop>
                      <stop
                        offset="2.59996"
                        stopColor="#e9e2e8"
                        stopOpacity="1"
                      >
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
              <div className="mt-6 space-y-2">
                <svg
                  role="img"
                  width="200"
                  height="24"
                  aria-labelledby="loading-aria"
                  viewBox="0 0 200 24"
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
                      <rect x="7" y="0" rx="0" ry="0" width="220" height="24" />
                    </clipPath>
                    <linearGradient id="fill">
                      <stop
                        offset="0.599964"
                        stopColor="#e9e2e8"
                        stopOpacity="1"
                      >
                        <animate
                          attributeName="offset"
                          values="-2; -2; 1"
                          keyTimes="0; 0.25; 1"
                          dur="2s"
                          repeatCount="indefinite"
                        ></animate>
                      </stop>
                      <stop
                        offset="1.59996"
                        stopColor="#cdc1c1"
                        stopOpacity="1"
                      >
                        <animate
                          attributeName="offset"
                          values="-1; -1; 2"
                          keyTimes="0; 0.25; 1"
                          dur="2s"
                          repeatCount="indefinite"
                        ></animate>
                      </stop>
                      <stop
                        offset="2.59996"
                        stopColor="#e9e2e8"
                        stopOpacity="1"
                      >
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
                  width="150"
                  height="24"
                  aria-labelledby="loading-aria"
                  viewBox="0 0 150 24"
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
                      <rect x="7" y="0" rx="0" ry="0" width="220" height="24" />
                    </clipPath>
                    <linearGradient id="fill">
                      <stop
                        offset="0.599964"
                        stopColor="#e9e2e8"
                        stopOpacity="1"
                      >
                        <animate
                          attributeName="offset"
                          values="-2; -2; 1"
                          keyTimes="0; 0.25; 1"
                          dur="2s"
                          repeatCount="indefinite"
                        ></animate>
                      </stop>
                      <stop
                        offset="1.59996"
                        stopColor="#cdc1c1"
                        stopOpacity="1"
                      >
                        <animate
                          attributeName="offset"
                          values="-1; -1; 2"
                          keyTimes="0; 0.25; 1"
                          dur="2s"
                          repeatCount="indefinite"
                        ></animate>
                      </stop>
                      <stop
                        offset="2.59996"
                        stopColor="#e9e2e8"
                        stopOpacity="1"
                      >
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
                  height="24"
                  aria-labelledby="loading-aria"
                  viewBox="0 0 300 24"
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
                      <rect x="7" y="0" rx="0" ry="0" width="220" height="24" />
                    </clipPath>
                    <linearGradient id="fill">
                      <stop
                        offset="0.599964"
                        stopColor="#e9e2e8"
                        stopOpacity="1"
                      >
                        <animate
                          attributeName="offset"
                          values="-2; -2; 1"
                          keyTimes="0; 0.25; 1"
                          dur="2s"
                          repeatCount="indefinite"
                        ></animate>
                      </stop>
                      <stop
                        offset="1.59996"
                        stopColor="#cdc1c1"
                        stopOpacity="1"
                      >
                        <animate
                          attributeName="offset"
                          values="-1; -1; 2"
                          keyTimes="0; 0.25; 1"
                          dur="2s"
                          repeatCount="indefinite"
                        ></animate>
                      </stop>
                      <stop
                        offset="2.59996"
                        stopColor="#e9e2e8"
                        stopOpacity="1"
                      >
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
                  width="120"
                  height="24"
                  aria-labelledby="loading-aria"
                  viewBox="0 0 120 24"
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
                      <rect x="7" y="0" rx="0" ry="0" width="220" height="24" />
                    </clipPath>
                    <linearGradient id="fill">
                      <stop
                        offset="0.599964"
                        stopColor="#e9e2e8"
                        stopOpacity="1"
                      >
                        <animate
                          attributeName="offset"
                          values="-2; -2; 1"
                          keyTimes="0; 0.25; 1"
                          dur="2s"
                          repeatCount="indefinite"
                        ></animate>
                      </stop>
                      <stop
                        offset="1.59996"
                        stopColor="#cdc1c1"
                        stopOpacity="1"
                      >
                        <animate
                          attributeName="offset"
                          values="-1; -1; 2"
                          keyTimes="0; 0.25; 1"
                          dur="2s"
                          repeatCount="indefinite"
                        ></animate>
                      </stop>
                      <stop
                        offset="2.59996"
                        stopColor="#e9e2e8"
                        stopOpacity="1"
                      >
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
              <div className="mt-6 space-y-6">
                <svg
                  role="img"
                  width="620"
                  height="40"
                  aria-labelledby="loading-aria"
                  viewBox="0 0 620 40"
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
                      <rect x="7" y="0" rx="0" ry="0" width="220" height="40" />
                    </clipPath>
                    <linearGradient id="fill">
                      <stop
                        offset="0.599964"
                        stopColor="#e9e2e8"
                        stopOpacity="1"
                      >
                        <animate
                          attributeName="offset"
                          values="-2; -2; 1"
                          keyTimes="0; 0.25; 1"
                          dur="2s"
                          repeatCount="indefinite"
                        ></animate>
                      </stop>
                      <stop
                        offset="1.59996"
                        stopColor="#cdc1c1"
                        stopOpacity="1"
                      >
                        <animate
                          attributeName="offset"
                          values="-1; -1; 2"
                          keyTimes="0; 0.25; 1"
                          dur="2s"
                          repeatCount="indefinite"
                        ></animate>
                      </stop>
                      <stop
                        offset="2.59996"
                        stopColor="#e9e2e8"
                        stopOpacity="1"
                      >
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
                  width="620"
                  height="40"
                  aria-labelledby="loading-aria"
                  viewBox="0 0 620 40"
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
                      <rect x="7" y="0" rx="0" ry="0" width="220" height="40" />
                    </clipPath>
                    <linearGradient id="fill">
                      <stop
                        offset="0.599964"
                        stopColor="#e9e2e8"
                        stopOpacity="1"
                      >
                        <animate
                          attributeName="offset"
                          values="-2; -2; 1"
                          keyTimes="0; 0.25; 1"
                          dur="2s"
                          repeatCount="indefinite"
                        ></animate>
                      </stop>
                      <stop
                        offset="1.59996"
                        stopColor="#cdc1c1"
                        stopOpacity="1"
                      >
                        <animate
                          attributeName="offset"
                          values="-1; -1; 2"
                          keyTimes="0; 0.25; 1"
                          dur="2s"
                          repeatCount="indefinite"
                        ></animate>
                      </stop>
                      <stop
                        offset="2.59996"
                        stopColor="#e9e2e8"
                        stopOpacity="1"
                      >
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
              <div className="mt-5 flex justify-center items-center gap-4">
                <svg
                  role="img"
                  width="40"
                  height="40"
                  aria-labelledby="loading-aria"
                  viewBox="0 0 40 40"
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
                      <circle cx="20" cy="21" r="25" />
                    </clipPath>
                    <linearGradient id="fill">
                      <stop
                        offset="0.599964"
                        stopColor="#e9e2e8"
                        stopOpacity="1"
                      >
                        <animate
                          attributeName="offset"
                          values="-2; -2; 1"
                          keyTimes="0; 0.25; 1"
                          dur="2s"
                          repeatCount="indefinite"
                        ></animate>
                      </stop>
                      <stop
                        offset="1.59996"
                        stopColor="#cdc1c1"
                        stopOpacity="1"
                      >
                        <animate
                          attributeName="offset"
                          values="-1; -1; 2"
                          keyTimes="0; 0.25; 1"
                          dur="2s"
                          repeatCount="indefinite"
                        ></animate>
                      </stop>
                      <stop
                        offset="2.59996"
                        stopColor="#e9e2e8"
                        stopOpacity="1"
                      >
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
                  width="40"
                  height="40"
                  aria-labelledby="loading-aria"
                  viewBox="0 0 40 40"
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
                      <circle cx="20" cy="21" r="25" />
                    </clipPath>
                    <linearGradient id="fill">
                      <stop
                        offset="0.599964"
                        stopColor="#e9e2e8"
                        stopOpacity="1"
                      >
                        <animate
                          attributeName="offset"
                          values="-2; -2; 1"
                          keyTimes="0; 0.25; 1"
                          dur="2s"
                          repeatCount="indefinite"
                        ></animate>
                      </stop>
                      <stop
                        offset="1.59996"
                        stopColor="#cdc1c1"
                        stopOpacity="1"
                      >
                        <animate
                          attributeName="offset"
                          values="-1; -1; 2"
                          keyTimes="0; 0.25; 1"
                          dur="2s"
                          repeatCount="indefinite"
                        ></animate>
                      </stop>
                      <stop
                        offset="2.59996"
                        stopColor="#e9e2e8"
                        stopOpacity="1"
                      >
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
                  width="40"
                  height="40"
                  aria-labelledby="loading-aria"
                  viewBox="0 0 40 40"
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
                      <circle cx="20" cy="21" r="25" />
                    </clipPath>
                    <linearGradient id="fill">
                      <stop
                        offset="0.599964"
                        stopColor="#e9e2e8"
                        stopOpacity="1"
                      >
                        <animate
                          attributeName="offset"
                          values="-2; -2; 1"
                          keyTimes="0; 0.25; 1"
                          dur="2s"
                          repeatCount="indefinite"
                        ></animate>
                      </stop>
                      <stop
                        offset="1.59996"
                        stopColor="#cdc1c1"
                        stopOpacity="1"
                      >
                        <animate
                          attributeName="offset"
                          values="-1; -1; 2"
                          keyTimes="0; 0.25; 1"
                          dur="2s"
                          repeatCount="indefinite"
                        ></animate>
                      </stop>
                      <stop
                        offset="2.59996"
                        stopColor="#e9e2e8"
                        stopOpacity="1"
                      >
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
        </div>
      </div>
    </div>
  );
};

export default Loading;
