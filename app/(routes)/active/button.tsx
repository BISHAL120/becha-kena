"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PaymentButton = (/* { id }: { id: string } */) => {
  /* const router = useRouter();
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
  }; */

  return (
    <div>
      <div className="mt-20">
        <Button
          onClick={() => toast.success("Payment Successful")}
          className="w-full h-10 bg-indigo-600 dark:bg-indigo-800 dark:text-neutral-200"
        >
          Make Payment
        </Button>
      </div>
    </div>
  );
};

export default PaymentButton;
