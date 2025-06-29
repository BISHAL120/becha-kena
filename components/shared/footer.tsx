"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Component() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <div className=" bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800">
      {/* Banner Section */}

      {/* Footer Section */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4">
          {/* Newsletter Section */}
          <div className="py-12 border-b border-gray-100 dark:border-gray-800">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
                Subscribe to our newsletter
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Get the latest deals, new arrivals, and exclusive offers
                delivered straight to your inbox.
              </p>
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              >
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-xl border-gray-200 dark:border-gray-700 focus:border-green-500 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
                  required
                />
                <Button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white rounded-xl px-8 transition-all duration-200 hover:scale-105 group"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {/* Brand Section */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    Becha Kena
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 max-w-md">
                    Your trusted online marketplace for quality products at
                    competitive prices. Shop with confidence on
                    Bangladesh&apos;s leading e-commerce platform.
                  </p>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors cursor-pointer">
                    <Mail className="w-5 h-5" />
                    <span>support@bechakena.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors cursor-pointer">
                    <Phone className="w-5 h-5" />
                    <span>+880 1234-567890</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors cursor-pointer">
                    <MapPin className="w-5 h-5" />
                    <span>Dhaka, Bangladesh</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-4">
                  {[
                    { icon: Facebook, href: "#", label: "Facebook" },
                    { icon: Twitter, href: "#", label: "Twitter" },
                    { icon: Linkedin, href: "#", label: "LinkedIn" },
                    { icon: Instagram, href: "#", label: "Instagram" },
                  ].map(({ icon: Icon, href, label }) => (
                    <Link
                      key={label}
                      href={href}
                      className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-green-500 dark:hover:bg-green-600 text-gray-600 dark:text-gray-300 hover:text-white rounded-full transition-all duration-200 hover:scale-110 hover:shadow-lg group"
                      aria-label={label}
                    >
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Shop */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 dark:text-white text-lg">
                  Shop
                </h3>
                <ul className="space-y-3">
                  {[
                    "New Arrivals",
                    "Best Sellers",
                    "Deals & Offers",
                    "Gift Cards",
                    "Categories",
                  ].map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200 hover:translate-x-1 inline-block"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* About Us */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 dark:text-white text-lg">
                  About Us
                </h3>
                <ul className="space-y-3">
                  {["Our Story", "Careers", "Press", "Sellers", "Partners"].map(
                    (item) => (
                      <li key={item}>
                        <Link
                          href="#"
                          className="text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200 hover:translate-x-1 inline-block"
                        >
                          {item}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Customer Service */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 dark:text-white text-lg">
                  Customer Service
                </h3>
                <ul className="space-y-3">
                  {[
                    "Help Center",
                    "Returns & Refunds",
                    "Shipping Info",
                    "Track Order",
                    "Contact Us",
                  ].map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200 hover:translate-x-1 inline-block"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="py-6 border-t border-gray-100 dark:border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                © {new Date().getFullYear()} Becha-Kena. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                <Link
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
