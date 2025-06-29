import { Button } from "@/components/ui/button";
import { Award, Download, Smartphone, Star, Users } from "lucide-react";
import Image from "next/image";
import React from "react";

const FooterBanner = () => {
  return (
    <div>
      <section
        className={`relative overflow-hidden transition-all duration-1000 translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        <div className="max-w-[1650px] mx-auto py-12 md:py-20">
          <div className="relative bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white dark:bg-gray-200 rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-white dark:bg-gray-200 rounded-full translate-x-24 translate-y-24"></div>
            </div>

            <div className="relative grid lg:grid-cols-4 gap-6 items-center">
              <div className="lg:col-span-3 text-white space-y-6">
                <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{"#1 Shopping Platform 2024"}</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Shop with Becha-Kena
                  <br />
                  <span className="text-green-200">
                    Get 20% off first purchase
                  </span>
                </h1>

                <p className="text-xl text-green-100 max-w-md">
                  Your one-stop destination for all your shopping needs. Join
                  millions of happy shoppers today.
                </p>

                {/* Stats */}
                <div className="flex gap-6 pt-4">
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-2xl font-bold">
                      <Users className="w-6 h-6" />
                      <span>1M+</span>
                    </div>
                    <p className="text-green-200 text-sm">Happy Customers</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-2xl font-bold">
                      <Award className="w-6 h-6" />
                      <span>4.8</span>
                    </div>
                    <p className="text-green-200 text-sm">Customer Rating</p>
                  </div>
                </div>

                {/* Download Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    size="lg"
                    className="bg-black dark:bg-gray-900 hover:bg-gray-800 text-white rounded-xl px-6 py-3 transition-all duration-200 hover:scale-105 hover:shadow-lg group"
                  >
                    <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                    Shop on App Store
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-green-600 dark:hover:bg-gray-200 dark:hover:text-green-700 rounded-xl px-6 py-3 transition-all duration-200 hover:scale-105 hover:shadow-lg group bg-transparent"
                  >
                    <Smartphone className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                    Shop on Play Store
                  </Button>
                </div>
              </div>

              {/* Phone Mockup */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative transform hover:scale-105 transition-transform duration-500">
                  <div className="w-fit h-fit bg-white dark:bg-gray-800 rounded-3xl p-2 shadow-2xl">
                    <div className="w-full h-full bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl overflow-hidden relative">
                      <Image
                        src="/assets/app interface.png"
                        alt="App Interface"
                        width={240}
                        height={360}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 bg-orange-500 text-white p-3 rounded-full shadow-lg animate-bounce">
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-pink-500 text-white p-3 rounded-full shadow-lg animate-pulse">
                    <Award className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FooterBanner;
