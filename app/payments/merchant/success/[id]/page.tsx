"use client";

import axios from "axios";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Pending from "./pending";
import PaymentFailed from "@/app/payments/fail/page";

export default function PaymentSuccess() {
  const [status, setStatus] = useState<"success" | "failed" | "">("");
  const searchParams = useSearchParams();
  const params = useParams();
  const paramsId = params.id;
  const id = searchParams.get("order_id");

  useEffect(() => {
    console.log(paramsId, id);
    axios
      .post(`/api/payments/merchant/success?id=${paramsId}`)
      .then((res) => {
        if (res.data.Data.isActive === true) {
          setStatus("success");
        } else {
          setStatus("failed");
        }
        console.log(res.data.Data.isActive);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [paramsId, id]);

  if (status === "") {
    return <Pending />;
  } else if (status === "failed") {
    return <PaymentFailed />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center"
        >
          <CheckCircle2 className="w-24 h-24 text-green-500" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold text-center mt-6 text-gray-800"
        >
          Payment Successful!
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 text-center mt-4"
        >
          Thank you for your purchase. Your payment has been processed
          successfully.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Transaction ID</span>
              <span className="text-gray-800 font-medium">{id}</span>
            </div>
            {/* <div className="flex justify-between items-center">
              <span className="text-gray-600">Amount Paid</span>
              <span className="text-gray-800 font-medium">$99.99</span>
            </div> */}
          </div>

          <Link href="/" className="block">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              Back to Home
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
