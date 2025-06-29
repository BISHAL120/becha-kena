import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const NewsLetter = () => {
  return (
    <div>
      <section className="relative py-24 rounded-2xl bg-gradient-to-r from-[#3f65a5] to-[#1f40ae]">
        <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center text-white">
          <h2 className="mb-8 text-4xl font-bold">
            Get Newsletter Blog and article news
          </h2>
          <div className="flex w-full max-w-md items-center gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white/90 text-black"
            />
            <Button className="bg-primary hover:bg-primary/90">Join Now</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsLetter;
