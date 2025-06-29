import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

// Sample video data - replace with your actual YouTube videos
const FEATURED_VIDEOS = [
  {
    id: "1",
    videoId: "yWRwdzdxKsQ", // Replace with actual YouTube video IDs
  },
  {
    id: "2",
    videoId: "xcdlUInKUyc", // Replace with actual YouTube video IDs
  },
  {
    id: "3",
    videoId: "2SXCR-43RjM", // Replace with actual YouTube video IDs
  },
  {
    id: "4",
    videoId: "_nNP3c9YrF8", // Replace with actual YouTube video IDs
  },
];

const VideoSection = () => {
  return (
    <section className="">
      <div className="">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-xl  font-semibold text-gray-900 dark:text-slate-100">
            Latest Videos on Channel
          </h2>
          <a
            href="https://www.youtube.com/@ProgrammingHeroCommunity"
            className="flex items-center gap-1 text-primary hover:underline mt-2 md:mt-0"
          >
            <span>Subscribe</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_VIDEOS.map((video) => (
            <Card
              key={video.id}
              className="p-0 shadow-2xl shadow-blue-400 overflow-hidden transition-all duration-300 hover:shadow-lg group h-full"
            >
              <div className="relative pt-[56.25%] overflow-hidden bg-gray-100">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                {/* <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div> */}
              </div>
            </Card>
          ))}
        </div>

        {/* Brand Logos Section */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-8 justify-items-center items-center">
            {[
              {
                name: "CAUDALIE",
                logo: "/assets/logos/logo1.png",
              },
              {
                name: "CeraVe",
                logo: "/assets/logos/logo2.png",
              },
              {
                name: "MIZON",
                logo: "/assets/logos/logo3.png",
              },
              {
                name: "PAYOT",
                logo: "/assets/logos/logo4.png",
              },
              {
                name: "SVR",
                logo: "/assets/logos/logo5.png",
              },
              {
                name: "TOCOBO",
                logo: "/assets/logos/logo6.png",
              },
              {
                name: "URIAGE",
                logo: "/assets/logos/logo7.png",
              },
            ].map((brand, index) => (
              <Card
                key={index}
                className="p-0 w-full h-full shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-0 flex items-center justify-center">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="w-[120px] h-[60px] object-contain"
                    width={120}
                    height={60}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
