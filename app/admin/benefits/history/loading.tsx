import React from "react";

const Loading = () => {
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-300 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
