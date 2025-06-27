"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const PaymentButton = ({ id }: { id: string }) => {
  const router = useRouter();
  const handleClick = () => {
    toast.loading("Preparing payment...");
    axios
      .post("/api/payments/merchant/initiate", { id: id })
      .then((res) => {
        toast.dismiss();
        toast.success("Make Payment to confirm order");
        console.log(res.data);
        router.push(res.data.url);
      })
      .catch((err) => {
        toast.dismiss();
        toast.error("Something went wrong");
        console.log(err);
      });
  };

  return (
    <div>
      <div className="mt-20">
        <Button onClick={() => handleClick()} className="w-full h-10">
          Upgrade Now
        </Button>
      </div>
    </div>
  );
};

export default PaymentButton;
