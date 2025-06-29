"use client";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Plus, Trash2, CheckCircle, Save } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const benefitSchema = z.object({
  benefits: z
    .array(
      z.object({
        title: z.string().min(1, "Title is required"),
      })
    )
    .min(1, "At least one benefit is required"),
});

type BenefitFormValues = z.infer<typeof benefitSchema>;

const BenefitsPage = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const router = useRouter();

  const form = useForm<BenefitFormValues>({
    resolver: zodResolver(benefitSchema),
    defaultValues: {
      benefits: [{ title: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "benefits",
  });

  const onSubmit = async (data: BenefitFormValues) => {
    setIsSaving(true);
    toast.loading("Saving benefits...");
    console.log(data.benefits);
    axios
      .post("/api/admin/benefits", data.benefits)
      .then((res) => {
        setIsSaving(false);
        setSaveSuccess(true);
        toast.dismiss();
        router.push("/admin/benefits/history");
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        setIsSaving(false);
        toast.dismiss();
        toast.error(err.response.data.message);
      });
  };

  const watchedBenefits = form.watch("benefits");
  const validBenefits = watchedBenefits.filter(
    (benefit) => benefit.title.trim() !== ""
  );

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Benefits Manager
              </h1>
              <p className="text-gray-600">
                Add and manage your organization&apos;s benefits
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => append({ title: "" })}
                className="flex items-center gap-2 hover:text-white duration-300 transition-colors"
              >
                <Plus size={16} />
                Add Benefit
              </Button>
              <Button
                type="submit"
                onClick={form.handleSubmit(onSubmit)}
                disabled={isSaving || fields.length === 0}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save All Benefits
                  </>
                )}
              </Button>
            </div>
          </div>

          {saveSuccess && (
            <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg flex items-center gap-2 text-green-800">
              <CheckCircle size={16} />
              Benefits saved successfully!
            </div>
          )}

          <Separator className="mb-8" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Benefits Preview */}
          <div className="lg:col-span-1">
            <Card className="sticky top-2">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-lg">
                  Benefits Preview
                  <Badge variant="secondary" className="ml-2">
                    {validBenefits.length}{" "}
                    {validBenefits.length === 1 ? "benefit" : "benefits"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className=" max-h-96 overflow-y-auto">
                  {validBenefits.length > 0 ? (
                    validBenefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 py-1.5 bg-gray-50 rounded-lg"
                      >
                        <CheckCircle
                          size={16}
                          className="text-green-500 mt-0.5 flex-shrink-0"
                        />
                        <p className="text-sm font-medium text-gray-800 leading-relaxed">
                          {benefit.title}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-400 mb-2">
                        <CheckCircle size={32} className="mx-auto" />
                      </div>
                      <p className="text-gray-500 text-sm">
                        No benefits added yet
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Benefits Form */}
          <div className="lg:col-span-2">
            <Form {...form}>
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <Card
                    key={field.id}
                    className="transition-all duration-200 hover:shadow-md"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg font-medium">
                          Benefit #{index + 1}
                        </CardTitle>
                        {fields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => remove(index)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control}
                        name={`benefits.${index}.title`}
                        render={({ field: formField }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Benefit Title
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., Health Insurance, Flexible Working Hours, Professional Development"
                                className="mt-1"
                                {...formField}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                ))}

                {fields.length === 0 && (
                  <Card className="border-dashed border-2 border-gray-300">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Plus size={48} className="text-gray-400 mb-4" />
                      <p className="text-gray-500 text-lg mb-4">
                        No benefits added
                      </p>
                      <Button
                        type="button"
                        onClick={() => append({ title: "" })}
                        variant="outline"
                      >
                        Add Your First Benefit
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </Form>
          </div>
        </div>

        {/* Quick Add Section */}
        {fields.length > 0 && (
          <div className="mt-8 text-center">
            <Button
              type="button"
              variant="ghost"
              onClick={() => append({ title: "" })}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              <Plus size={16} className="mr-2" />
              Add Another Benefit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BenefitsPage;
