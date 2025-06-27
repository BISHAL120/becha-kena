"use client";

import Calender from "@/components/ui/calender";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { format } from "date-fns";
import { ArrowUpNarrowWide, Calendar, Loader2, Rocket, X } from "lucide-react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

type PackageType = {
  name: string;
  type: "STANDARD" | "PREMIUM";
  duration: string;
  price: string;
  startDate: Date;
};

const PromoteDrawer = ({
  tittle,
  className,
  productId,
  userId,
}: {
  tittle: string;
  productId: string;
  userId: string;
  className?: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [section, setSection] = useState<"premium" | "standard" | "">();
  const [premiumDate, setPremiumDate] = useState(new Date());
  const [standardDate, setStandardDate] = useState(new Date());
  const [number, setNumber] = useState<string | undefined>("");
  const router = useRouter();

  const isValid = /^01[3-9]\d{8}$/.test(number || "");

  const [premiumPackage, setPremiumPackage] = useState<PackageType>({
    name: "Premium",
    type: "PREMIUM",
    duration: "7",
    price: "1646",
    startDate: premiumDate,
  });
  const [standardPackage, setStandardPackage] = useState<PackageType>({
    name: "Standard",
    type: "STANDARD",
    duration: "7",
    price: "295",
    startDate: standardDate,
  });

  const onSubmit = (data: PackageType) => {
    try {
      setLoading(true);
      toast.loading("Placing Order...");
      let endDate = null;
      if (data.type === "STANDARD") {
        endDate = new Date(
          premiumDate.getTime() +
            Number(standardPackage.duration) * 24 * 60 * 60 * 1000
        );
      } else {
        endDate = new Date(
          premiumDate.getTime() +
            Number(premiumPackage.duration) * 24 * 60 * 60 * 1000
        );
      }

      const finaData = {
        ...data,
        endTime: endDate,
        productId: productId,
        userId: userId,
        number: number,
      };
      console.log(finaData);
      setLoading(false);

      axios
        .post("/api/product/promote", finaData)
        .then((res) => {
          setLoading(false);
          toast.dismiss();
          toast.success("Make Payment to confirm order");
          router.push(res.data.url);
        })
        .catch((err) => {
          setLoading(false);
          toast.dismiss();
          toast.error("Failed to Place Order");
          console.log(err);
        });
    } catch (error) {
      setLoading(false);
      toast.dismiss();
      console.log(error);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger>
        <div
          className={`flex items-center gap-3 rounded-lg text-center text-primary-foreground shadow h-9 px-4 py-2  dark:text-white  ${className}`}
        >
          <Rocket className="h-4 w-4" />
          {tittle}
        </div>
      </DrawerTrigger>
      <DrawerContent className="h-[calc(100vh-50px)] w-full md:w-[80vw] mx-auto">
        <DrawerHeader className="space-y-1 flex justify-center items-center mb-2">
          <div className="text-center">
            <DrawerTitle className=" text-2xl font-semibold">
              আপনার বিজ্ঞাপন আকর্ষণীয় করুন!
            </DrawerTitle>
            <DrawerDescription className="">
              অ্যাড বুস্টিং করে ৩০ গুণ পর্যন্ত বেশি রেসপন্স পান। পছন্দের অপশন
              নির্বাচন করুন।
            </DrawerDescription>
          </div>
        </DrawerHeader>
        <ScrollArea className="h-[calc(100vh-100px)]">
          <div>
            <div className="max-w-3xl mx-auto flex flex-col  gap-5 px-3 p-4 rounded-lg border shadow-md pt-10">
              <Label className="text-lg font-semibold w-full">
                Contact Number
              </Label>
              <Input
                placeholder="আপনার মোবাইল নাম্বার লিখুন"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                maxLength={11}
              />
              {!isValid && (
                <p style={{ color: "red" }}>
                  Enter valid Bangladeshi mobile number!
                </p>
              )}
            </div>
            {isValid && (
              <div className="space-y-8">
                {section !== "standard" && (
                  <div className="relative max-w-3xl mx-auto flex flex-col  gap-5 px-3 p-4 rounded-lg border shadow-md ">
                    <div className="w-full max-w-3xl mx-auto">
                      <div
                        onClick={() => setSection("premium")}
                        className="w-full flex items-center space-x-2"
                      >
                        <div className="w-full text-center space-y-3">
                          <div className="w-full flex justify-center items-center">
                            <div className="flex justify-start gap-2 items-end text-base font-bold ">
                              <label
                                htmlFor="terms1"
                                className="text-xl font-bold"
                              >
                                স্পটলাইট
                              </label>
                              <Rocket
                                strokeWidth={2.5}
                                size={20}
                                className=" -rotate-45"
                              />
                            </div>
                          </div>
                          <p className="text-base font-medium text-muted-foreground">
                            <span className="font-semibold text-base dark:text-slate-100 text-slate-900 leading-6 block mb-1">
                              ৳ ১,০৯৫ থেকে শুরু,
                            </span>{" "}
                            <span>
                              {" "}
                              প্রিমিয়াম স্লটে বিজ্ঞাপন দিয়ে আপনার সেল বুস্ট
                              করুন।
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    {section === "premium" && (
                      <>
                        <div className="p-4 w-full flex flex-col justify-around">
                          <RadioGroup
                            onValueChange={(value) =>
                              setPremiumPackage((prev) => ({
                                ...prev,
                                duration: value.split("-")[0],
                                price: value.split("-")[1],
                              }))
                            }
                            defaultValue="7-1646"
                            className="space-y-0.5 w-full max-w-lg mx-auto"
                          >
                            <div className="flex items-center space-x-2">
                              <div className="w-full flex items-center justify-between gap-1">
                                <span className="flex items-center gap-1">
                                  <RadioGroupItem value="3-1095" id="r1" />
                                  <Label
                                    className="text-base cursor-pointer font-semibold"
                                    htmlFor="r1"
                                  >
                                    ৩ দিন
                                  </Label>
                                </span>
                                <Separator className="w-1/2 bg-slate-800" />
                                <Label
                                  className="text-base cursor-pointer font-semibold"
                                  htmlFor="r1"
                                >
                                  {Intl.NumberFormat("bn-BD", {
                                    style: "currency",
                                    currency: "BDT",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  }).format(1095)}
                                </Label>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-full flex items-center justify-between gap-1">
                                <span className="flex items-center gap-1">
                                  <RadioGroupItem value="7-1646" id="r2" />
                                  <Label
                                    className="text-base cursor-pointer font-semibold"
                                    htmlFor="r2"
                                  >
                                    ৭ দিন
                                  </Label>
                                </span>
                                <Separator className="w-1/2 bg-slate-800" />
                                <Label
                                  className="text-base cursor-pointer font-semibold "
                                  htmlFor="r2"
                                >
                                  {Intl.NumberFormat("bn-BD", {
                                    style: "currency",
                                    currency: "BDT",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  }).format(Number(1645))}
                                </Label>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-full flex items-center justify-between gap-1">
                                <span className="flex items-center gap-1">
                                  <RadioGroupItem value="15-2740" id="r3" />
                                  <Label
                                    className="text-base cursor-pointer font-semibold"
                                    htmlFor="r3"
                                  >
                                    ১৫দিন
                                  </Label>
                                </span>
                                <Separator className="w-1/2 bg-slate-800" />
                                <Label
                                  className="text-base cursor-pointer font-semibold"
                                  htmlFor="r3"
                                >
                                  {Intl.NumberFormat("bn-BD", {
                                    style: "currency",
                                    currency: "BDT",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  }).format(Number(2740))}
                                </Label>
                              </div>
                            </div>
                          </RadioGroup>
                        </div>
                        <div className="w-full max-w-lg mx-auto">
                          <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">
                              বুস্ট শিডিউল করুন
                            </h2>
                            <Dialog>
                              <DialogTrigger className={``}>
                                <Calendar size={26} strokeWidth={1.5} />
                              </DialogTrigger>
                              <DialogContent className="bg-transparent border-none">
                                <DialogHeader>
                                  <DialogTitle />
                                  <div className="flex justify-center items-center">
                                    <Calender
                                      setSelectedDate={setPremiumDate}
                                      selectedDate={premiumDate}
                                    />
                                  </div>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          </div>

                          <div className="mb-2">
                            <p className="flex justify-between w-full text-base font-medium text-muted-foreground">
                              <span>বুস্টিং শুরুর তারিখঃ </span>
                              <span className="text-primary">
                                {format(premiumDate, "p - P")}
                              </span>
                            </p>
                          </div>

                          <div>
                            <p className="flex justify-between w-full text-base font-medium text-muted-foreground">
                              <span> বুস্টিং শেষ তারিখঃ</span>
                              <span className="text-primary">
                                {format(
                                  new Date(
                                    premiumDate.getTime() +
                                      Number(premiumPackage.duration) *
                                        24 *
                                        60 *
                                        60 *
                                        1000
                                  ),
                                  "p - P"
                                )}
                              </span>
                            </p>
                          </div>
                          <div className="py-10">
                            <div className="text-xl font-bold mb-4">
                              এক নজরে পেমেন্ট
                            </div>
                            <div>
                              {/* <div>আর্জেন্ট ({premiumPackage.duration} দিন)</div> */}
                              <div className="mb-2">
                                <p className="flex justify-between items-center w-full text-base font-medium text-muted-foreground">
                                  <span>
                                    আর্জেন্ট ({premiumPackage.duration} দিন)
                                  </span>
                                  <span className="text-base text-primary cursor-pointer font-semibold">
                                    {Intl.NumberFormat("bn-BD", {
                                      style: "currency",
                                      currency: "BDT",
                                      minimumFractionDigits: 0,
                                      maximumFractionDigits: 0,
                                    }).format(Number(premiumPackage.price))}
                                  </span>
                                </p>
                              </div>
                              <Separator className="bg-slate-800" />
                              <div className="mt-2">
                                <p className="flex justify-between items-center w-full text-base font-medium text-muted-foreground">
                                  <span className="text-primary font-semibold">
                                    সর্বমোট:{" "}
                                  </span>
                                  <span className="text-base text-primary cursor-pointer font-semibold">
                                    {Intl.NumberFormat("bn-BD", {
                                      style: "currency",
                                      currency: "BDT",
                                      minimumFractionDigits: 0,
                                      maximumFractionDigits: 0,
                                    }).format(Number(premiumPackage.price))}
                                  </span>
                                </p>
                              </div>
                              <div className="mt-10">
                                <Button
                                  onClick={() => {
                                    onSubmit(premiumPackage);
                                    setSection("");
                                  }}
                                  disabled={loading}
                                  className="w-full"
                                >
                                  {loading && (
                                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                                  )}{" "}
                                  Place Order
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {section === "premium" && (
                      <div className="absolute top-4 -right-5 w-full flex justify-end px-10">
                        <Button
                          onClick={() => {
                            setSection("");
                          }}
                          disabled={loading}
                          className="hover:bg-white hover:text-black dark:bg-white dark:text-black text-white shadow-none border"
                        >
                          <X className=" h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                )}
                {section !== "premium" && (
                  <div className="relative max-w-3xl mx-auto flex flex-col  gap-5 px-3 p-4 rounded-lg border shadow-md ">
                    <div className="w-full max-w-3xl mx-auto">
                      <div
                        onClick={() => setSection("standard")}
                        className="w-full flex items-center space-x-2"
                      >
                        <div className="w-full text-center space-y-3">
                          <div className="w-full flex justify-center items-center">
                            <div className="flex justify-start  items-center gap-2 text-base font-bold ">
                              <label
                                htmlFor="terms1"
                                className="text-xl font-bold"
                              >
                                আর্জেন্ট
                              </label>
                              <ArrowUpNarrowWide strokeWidth={2.5} size={20} />
                            </div>
                          </div>
                          <p className="text-base font-medium text-muted-foreground">
                            <span className="font-semibold text-base dark:text-slate-100 text-slate-900 leading-6 block mb-1">
                              ৳ ১৯৫ থেকে শুরু,
                            </span>{" "}
                            <span>
                              {" "}
                              আর্জেন্ট স্লটে বিজ্ঞাপন দিয়ে আপনার সেল বুস্ট করুন।
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    {section === "standard" && (
                      <>
                        <div className="p-4 w-full flex flex-col justify-around">
                          <RadioGroup
                            onValueChange={(value) =>
                              setStandardPackage((prev) => ({
                                ...prev,
                                duration: value.split("-")[0],
                                price: value.split("-")[1],
                              }))
                            }
                            defaultValue="7-295"
                            className="space-y-0.5 w-full max-w-lg mx-auto"
                          >
                            <div className="flex items-center space-x-2">
                              <div className="w-full flex items-center justify-between gap-1">
                                <span className="flex items-center gap-1">
                                  <RadioGroupItem value="3-195" id="r1" />
                                  <Label
                                    className="text-base cursor-pointer font-semibold"
                                    htmlFor="r1"
                                  >
                                    ৩ দিন
                                  </Label>
                                </span>
                                <Separator className="w-1/2 bg-slate-800" />
                                <Label
                                  className="text-base cursor-pointer font-semibold"
                                  htmlFor="r1"
                                >
                                  {Intl.NumberFormat("bn-BD", {
                                    style: "currency",
                                    currency: "BDT",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  }).format(Number(195))}
                                </Label>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-full flex items-center justify-between gap-1">
                                <span className="flex items-center gap-1">
                                  <RadioGroupItem value="7-295" id="r2" />
                                  <Label
                                    className="text-base cursor-pointer font-semibold"
                                    htmlFor="r2"
                                  >
                                    ৭ দিন
                                  </Label>
                                </span>
                                <Separator className="w-1/2 bg-slate-800" />
                                <Label
                                  className="text-base cursor-pointer font-semibold "
                                  htmlFor="r2"
                                >
                                  {Intl.NumberFormat("bn-BD", {
                                    style: "currency",
                                    currency: "BDT",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  }).format(Number(295))}
                                </Label>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-full flex items-center justify-between gap-1">
                                <span className="flex items-center gap-1">
                                  <RadioGroupItem value="15-490" id="r3" />
                                  <Label
                                    className="text-base cursor-pointer font-semibold"
                                    htmlFor="r3"
                                  >
                                    ১৫দিন
                                  </Label>
                                </span>
                                <Separator className="w-1/2 bg-slate-800" />
                                <Label
                                  className="text-base cursor-pointer font-semibold"
                                  htmlFor="r3"
                                >
                                  {Intl.NumberFormat("bn-BD", {
                                    style: "currency",
                                    currency: "BDT",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  }).format(Number(490))}
                                </Label>
                              </div>
                            </div>
                          </RadioGroup>
                        </div>
                        <div className="w-full max-w-lg mx-auto">
                          <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">
                              বুস্ট শিডিউল করুন
                            </h2>
                            <Dialog>
                              <DialogTrigger className={``}>
                                <Calendar size={26} strokeWidth={1.5} />
                              </DialogTrigger>
                              <DialogContent className="bg-transparent border-none">
                                <DialogHeader>
                                  <DialogTitle />
                                  <div className="flex justify-center items-center">
                                    <Calender
                                      setSelectedDate={setStandardDate}
                                      selectedDate={standardDate}
                                    />
                                  </div>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          </div>

                          <div className="mb-2">
                            <p className="flex justify-between w-full text-base font-medium text-muted-foreground">
                              <span>বুস্টিং শুরুর তারিখঃ </span>
                              <span className="text-primary">
                                {format(standardDate, "p - P")}
                              </span>
                            </p>
                          </div>

                          <div>
                            <p className="flex justify-between w-full text-base font-medium text-muted-foreground">
                              <span> বুস্টিং শেষ তারিখঃ</span>
                              <span className="text-primary">
                                {format(
                                  new Date(
                                    standardDate.getTime() +
                                      Number(standardPackage.duration) *
                                        24 *
                                        60 *
                                        60 *
                                        1000
                                  ),
                                  "p - P"
                                )}
                              </span>
                            </p>
                          </div>
                          <div className="py-10">
                            <div className="text-xl font-bold mb-4">
                              এক নজরে পেমেন্ট
                            </div>
                            <div>
                              {/* <div>আর্জেন্ট ({premiumPackage.duration} দিন)</div> */}
                              <div className="mb-2">
                                <p className="flex justify-between items-center w-full text-base font-medium text-muted-foreground">
                                  <span>
                                    আর্জেন্ট ({standardPackage.duration} দিন)
                                  </span>
                                  <span className="text-base text-primary cursor-pointer font-semibold">
                                    {Intl.NumberFormat("bn-BD", {
                                      style: "currency",
                                      currency: "BDT",
                                      minimumFractionDigits: 0,
                                      maximumFractionDigits: 0,
                                    }).format(Number(standardPackage.price))}
                                  </span>
                                </p>
                              </div>
                              <Separator className="bg-slate-800" />
                              <div className="mt-2">
                                <p className="flex justify-between items-center w-full text-base font-medium text-muted-foreground">
                                  <span className="text-primary font-semibold">
                                    সর্বমোট:{" "}
                                  </span>
                                  <span className="text-base text-primary cursor-pointer font-semibold">
                                    {Intl.NumberFormat("bn-BD", {
                                      style: "currency",
                                      currency: "BDT",
                                      minimumFractionDigits: 0,
                                      maximumFractionDigits: 0,
                                    }).format(Number(standardPackage.price))}
                                  </span>
                                </p>
                              </div>
                              <div className="mt-10">
                                <Button
                                  onClick={() => {
                                    onSubmit(standardPackage);
                                    setSection("");
                                  }}
                                  disabled={loading}
                                  className="w-full"
                                >
                                  {loading && (
                                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                                  )}
                                  Place Order Place Order
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {section === "standard" && (
                      <div className="absolute top-4 -right-5 w-full flex justify-end px-10">
                        <Button
                          onClick={() => {
                            setSection("");
                          }}
                          disabled={loading}
                          className="hover:bg-white hover:text-black dark:bg-white dark:text-black text-white shadow-none border"
                        >
                          <X className=" h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default PromoteDrawer;
