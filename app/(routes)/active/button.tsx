"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const PaymentButton = ({ id, disabled }: { id: string; disabled: boolean }) => {
  const router = useRouter();
  const handleClick = () => {
    toast.loading("Preparing payment...");
    axios
      .post("/api/payments/activeId/initiate", { id: id })
      .then((res) => {
        toast.dismiss();
        toast.success("Make Payment to confirm order");
        router.push(res.data.url);
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err.response.data.message);
        console.log(err);
      });
  };

  return (
    <div>
      <div className="mt-20">
        <Button
          disabled={disabled}
          onClick={() => handleClick()}
          className="w-full h-10 bg-indigo-600 dark:bg-indigo-800 dark:text-neutral-200"
        >
          Make Payment
        </Button>
      </div>
    </div>
  );
};

export default PaymentButton;
