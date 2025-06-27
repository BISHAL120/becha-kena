"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated SVG Illustration */}
        <div className="relative">
          <svg
            className="w-64 h-64 mx-auto animate-pulse"
            viewBox="0 0 400 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background circles */}
            <circle
              cx="100"
              cy="150"
              r="50"
              className="fill-blue-100 dark:fill-blue-900/30"
              opacity="0.5"
            >
              <animate
                attributeName="r"
                values="50;60;50"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx="300"
              cy="150"
              r="40"
              className="fill-purple-100 dark:fill-purple-900/30"
              opacity="0.3"
            >
              <animate
                attributeName="r"
                values="40;50;40"
                dur="4s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Main 404 text */}
            <text
              x="200"
              y="180"
              textAnchor="middle"
              className="fill-slate-300 dark:fill-slate-600 text-8xl font-bold"
              style={{ fontSize: "72px", fontFamily: "system-ui" }}
            >
              404
            </text>

            {/* Floating elements */}
            <rect
              x="80"
              y="80"
              width="20"
              height="20"
              rx="4"
              className="fill-blue-400 dark:fill-blue-500"
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; 10,-10; 0,0"
                dur="2s"
                repeatCount="indefinite"
              />
            </rect>
            <circle
              cx="320"
              cy="100"
              r="8"
              className="fill-purple-400 dark:fill-purple-500"
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; -5,15; 0,0"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </circle>
            <polygon
              points="150,250 160,230 170,250"
              className="fill-green-400 dark:fill-green-500"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 160 240; 360 160 240"
                dur="8s"
                repeatCount="indefinite"
              />
            </polygon>
          </svg>
        </div>

        {/* Main content */}
        <div className="space-y-6">
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-300 animate-pulse">
            404
          </h1>

          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-slate-200">
              Oops! Page Not Found
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              The page you&apos;re looking for seems to have wandered off into
              the digital void. Don&apos;t worry, it happens to the best of us!
            </p>
          </div>

          {/* Call to action */}
          <div className="pt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50 dark:focus:ring-blue-400/50"
              role="button"
              aria-label="Return to homepage"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Take Me Home
            </Link>
          </div>

          {/* Additional help text */}
          <div className="pt-8 text-sm text-slate-500 dark:text-slate-500">
            <p>
              If you believe this is an error, please{" "}
              <a
                href="/contact"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors duration-200"
              >
                contact support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
