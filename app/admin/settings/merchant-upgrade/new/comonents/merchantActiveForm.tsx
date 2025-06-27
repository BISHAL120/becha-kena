"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import LoadingSpinner from "@/components/ui/spinner";

import { useRouter } from "next/navigation";
import { Heading } from "../../comonents/heading";
import axios from "axios";

const formSchema = z.object({
  pricing: z.string().min(2, {
    message: "Set a pricing for account activation",
  }),
  limit: z.string().min(2, {
    message: "Set a limit for product count",
  }),
});

type MerchantActivationFormProps = z.infer<typeof formSchema>;

const MerchantActivationForm = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<MerchantActivationFormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pricing: "",
      limit: "",
    },
  });

  const onSubmit = async (data: MerchantActivationFormProps) => {
    try {
      setLoading(true);
      toast.loading("Uploading...");
      await axios.post("/api/admin/settings/merchant", data).then(() => {
        router.push("/admin/settings/merchant-upgrade");
        toast.dismiss();
        toast.success("Uploaded successfully");
        setLoading(false);
      });

      // eslint-disable-next-line
    } catch (error: any) {
      console.log(error);
      router.refresh();
      toast.dismiss();
      toast.error(error.response.data || "Something went wrong", {
        style: {
          background: "red",
          color: "#fff",
          padding: "8px",
          borderRadius: "8px",
        },
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={"New Pricing"}
          description={"Set new pricing for account activation"}
        />
      </div>
      <Separator className="dark:bg-slate-300 bg-black/60 mb-6" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="pricing"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Activation Charge..."
                      {...field}
                      className="dark:border-slate-300 border-black/60"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="limit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Limit</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product Limit..."
                      {...field}
                      className="dark:border-slate-300 border-black/60"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {loading && <LoadingSpinner />}
            Create
          </Button>
        </form>
      </Form>
    </>
  );
};

export default MerchantActivationForm;
