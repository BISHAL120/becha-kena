"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
    <div className="py-4">
      <div className="space-y-4 mt-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      বুস্টিং ধরণ সিলেক্ট করুন:
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="সিলেক্ট করুন..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="group">
                          <div className="flex items-start gap-2">
                            <p>গ্রুপের সাথে বুস্ট করতে চাই</p>{" "}
                            <Users className="h-4 w-4" />
                          </div>
                        </SelectItem>
                        <SelectItem value="individual">
                          <div className="flex items-start gap-2">
                            <p>নিজের পেইজ বুস্ট করতে চাই</p>{" "}
                            <User className="h-4 w-4" />
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      ক্যাটাগরি সিলেক্ট করুন:
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="সিলেক্ট করুন..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="productLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      পছন্দের প্রডাক্ট লিংক: (ঐচ্ছিক)
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormDescription>সঠিক প্রোডাক্ট লিংক দিন</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      যোগাযোগের নাম্বার:
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="01XXXXXXXXX" {...field} />
                    </FormControl>
                    <FormDescription>সঠিক বাংলাদেশী নম্বর দিন</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        আইডিয়া/চাহিদা:
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="আপনার চাহিদা বা আইডিয়া লিখুন..."
                          className="h-40"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button
              disabled={loading}
              type="submit"
              className="w-full font-semibold"
              size={"lg"}
            >
              {loading && <Loader2 className="mr-2 h-6 w-6 animate-spin" />}
              সাবমিট করুন
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
