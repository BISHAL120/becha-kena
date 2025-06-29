"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@prisma/client";
import { Loader2, User, Users } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  type: z.string().min(2, {
    message: "ধরণ সিলেক্ট করুন",
  }),
  category: z.string().min(2, {
    message: "ক্যাটাগরি সিলেক্ট করুন:",
  }),
  productLink: z.string().url({
    message: "প্রোডাক্ট সঠিক লিঙ্ক দিন",
  }),
  number: z
    .string()
    .min(11, "Complete The Number")
    .max(11, "Number should not exceed 11 digits")
    .regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi number"),
  description: z.string().optional(),
});

interface BoostingFormProps {
  categories: Category[];
  userId: string | undefined;
}

export default function BoostingForm({
  categories,
  userId,
}: BoostingFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      category: "",
      productLink: "",
      number: "",
      description: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    toast.loading("Placing Order...");
    try {
      axios
        .post("/api/boosting", {
          ...values,
          userId,
        })
        .then((res) => {
          if (res.status === 200) {
            toast.dismiss();
            router.push("/dashboard");
            setLoading(false);
            toast.success("Boosting Order Placed Successfully", {
              duration: 5000,
              icon: "🚀",
            });
            form.reset();
          }
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          toast.dismiss();
          toast.error("Failed to Place Order");
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.dismiss();
      return toast.error("Failed to Place Order");
    }
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="bg-white/40 p-4 rounded-xl">
                      <FormLabel className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                        বুস্টিং ধরণ সিলেক্ট করুন:
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="mt-2 border-2 focus:ring-2 ring-purple-500">
                            <SelectValue placeholder="সিলেক্ট করুন..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="group">
                            <motion.div
                              className="flex items-center gap-3 p-1"
                              whileHover={{ x: 5 }}
                            >
                              <Users className="h-5 w-5 text-purple-500" />
                              <p>গ্রুপের সাথে বুস্ট করতে চাই</p>
                            </motion.div>
                          </SelectItem>
                          <SelectItem value="individual">
                            <motion.div
                              className="flex items-center gap-3 p-1"
                              whileHover={{ x: 5 }}
                            >
                              <User className="h-5 w-5 text-blue-500" />
                              <p>নিজের পেইজ বুস্ট করতে চাই</p>
                            </motion.div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="bg-white/40 p-4 rounded-xl">
                      <FormLabel className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                        ক্যাটাগরি সিলেক্ট করুন:
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="mt-2 border-2 focus:ring-2 ring-purple-500">
                            <SelectValue placeholder="সিলেক্ট করুন..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.name}>
                              <motion.p whileHover={{ x: 5 }}>
                                {category.name}
                              </motion.p>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FormField
                  control={form.control}
                  name="productLink"
                  render={({ field }) => (
                    <FormItem className="bg-white/40 p-4 rounded-xl">
                      <FormLabel className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                        পছন্দের প্রডাক্ট লিংক: (ঐচ্ছিক)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com"
                          {...field}
                          className="mt-2 border-2 focus:ring-2 ring-purple-500"
                        />
                      </FormControl>
                      <FormDescription className="text-sm text-gray-600 mt-1">
                        সঠিক প্রোডাক্ট লিংক দিন
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem className="bg-white/40 p-4 rounded-xl">
                      <FormLabel className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                        যোগাযোগের নাম্বার:
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="01XXXXXXXXX"
                          {...field}
                          className="mt-2 border-2 focus:ring-2 ring-purple-500"
                        />
                      </FormControl>
                      <FormDescription className="text-sm text-gray-600 mt-1">
                        সঠিক বাংলাদেশী নম্বর দিন
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                className="col-span-2"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="bg-white/40 p-4 rounded-xl">
                      <FormLabel className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                        আইডিয়া/চাহিদা:
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="আপনার চাহিদা বা আইডিয়া লিখুন..."
                          className="h-40 mt-2 border-2 focus:ring-2 ring-purple-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                disabled={loading}
                type="submit"
                className="w-full font-semibold bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-lg"
                size={"lg"}
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Loader2 className="mr-2 h-6 w-6" />
                  </motion.div>
                ) : null}
                সাবমিট করুন
              </Button>
            </motion.div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
}
