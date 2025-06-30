"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { storage } from "@/lib/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@prisma/client";
import axios from "axios";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  Check,
  ImagePlus,
  Loader2,
  UserIcon,
  Building2,
  MapPin,
  Phone,
  Globe,
  Camera,
  Upload,
  Save,
  ArrowLeft,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { object, z } from "zod";
import { Badge } from "../../ui/badge";
import { Checkbox } from "../../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Textarea } from "../../ui/textarea";

const formSchema = object({
  name: z.string().min(2),
  shopName: z.string().min(2),
  number: z
    .string()
    .min(11, "Complete The Number")
    .max(11, "Number should not exceed 11 digits")
    .regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi number"),
  secondaryNumber: z.string().optional(),
  whatsAppNumber: z.string().optional(),
  address: z.string().min(2),
  businessCategory: z.string().min(2).optional(),
  fbAccount: z.string().optional(),
  fbBnsPage: z.string().optional(),
  youtube: z.string().optional(),
  tikTok: z.string().optional(),
  instagram: z.string().optional(),
  website: z.string().optional(),
  deliveryPartner: z.string().array().optional(),
  interested: z.string().array().optional(),
  policy: z.string().max(1000).optional(),
  companySize: z.string().optional(),
  groupLink: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof formSchema>;

interface ProfileFormProps {
  initialData: User | null;
  Categories: { id: string; name: string }[] | null;
}

const EditProfile: React.FC<ProfileFormProps> = ({
  initialData,
  Categories,
}) => {
  const [profile, setProfile] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [bannerLoading, setBannerLoading] = useState(false);
  const [tempInterest, setTempInterest] = useState<string[]>(
    initialData?.interested || []
  );
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData ? initialData.name : "",
      shopName: initialData?.shopName ? initialData.shopName : "",
      number: initialData?.number ? initialData.number : "",
      whatsAppNumber: initialData?.whatsAppNumber
        ? initialData.whatsAppNumber
        : "",
      address: initialData?.address ? initialData.address : "",
      businessCategory: initialData?.businessCategory
        ? initialData.businessCategory
        : "",

      interested: tempInterest,
      policy: initialData?.policy ? initialData.policy : "",
      fbAccount: initialData?.fbAccount ? initialData.fbAccount : "",
      fbBnsPage: initialData?.fbBnsPage ? initialData.fbBnsPage : "",
      youtube: initialData?.youtube ? initialData.youtube : "",
      tikTok: initialData?.tikTok ? initialData.tikTok : "",
      instagram: initialData?.instagram ? initialData.instagram : "",
      website: initialData?.website ? initialData.website : "",
    },
  });

  const fieldCheck = () => {
    const businessCategory = form.getValues("businessCategory");

    if (!businessCategory) {
      return toast.error("Please Select a Business Category!");
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (values.secondaryNumber || values.whatsAppNumber) {
        const regex = /^01[3-9]\d{8}$/;
        if (values.secondaryNumber && !regex.test(values.secondaryNumber)) {
          toast.dismiss();
          toast.error("Invalid Secondary Number");
          return;
        }
        if (values.whatsAppNumber && !regex.test(values.whatsAppNumber)) {
          toast.dismiss();
          toast.error("Invalid WhatsApp Number");
          return;
        }
      }

      setLoading(true);
      toast.loading("Updating...");
      await axios.patch(`/api/user`, { id: initialData?.id, ...values });
      toast.dismiss();
      toast.success("Profile updated");
      setLoading(false);
      router.refresh();
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.dismiss();
      toast.error("Something went wrong");
    }
  }

  const handleBannerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    toast.loading("Uploading banner...");
    try {
      setBannerLoading(true);
      if (e.target.files && e.target.files[0]) {
        const fileTypeCheck = e.target.files[0];
        if (!fileTypeCheck.type.startsWith("image/")) {
          toast.dismiss();
          toast.error("Please select an image file.");
          return;
        }

        const file = e.target.files[0];
        if (initialData?.bannerImage) {
          const imageRef = ref(storage, initialData.bannerImage);
          await deleteObject(imageRef);
        }

        const fileName = uuidv4();
        const fileRef = ref(storage, `profile/${initialData?.id}/${fileName}`);
        const uploadTask = uploadBytesResumable(fileRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            setProgress(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
          },
          (error) => {
            console.error(error);
          },
          async () => {
            await getDownloadURL(fileRef).then(async (url) => {
              setBannerLoading(false);
              await axios.patch(`/api/user`, {
                ...initialData,
                bannerImage: url,
              });
              router.push(`/users/profile`);
              router.refresh();
              toast.dismiss();
              toast.success("Banner uploaded successfully.");
            });
          }
        );
      }
    } catch (error) {
      setBannerLoading(false);
      toast.dismiss();
      toast.error("Something went wrong. Please try again.");
      console.log(error);
    }
  };

  const handleProfileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    toast.loading("Uploading profile image...");
    try {
      setProfileLoading(true);
      if (e.target.files && e.target.files[0]) {
        const fileTypeCheck = e.target.files[0];
        if (!fileTypeCheck.type.startsWith("image/")) {
          toast.dismiss();
          toast.error("Please select an image file.");
          return;
        }

        const file = e.target.files[0];
        if (initialData?.image) {
          const imageRef = ref(storage, initialData.image);
          await deleteObject(imageRef);
        }

        const fileName = uuidv4();
        const fileRef = ref(storage, `profile/${initialData?.id}/${fileName}`);
        const uploadTask = uploadBytesResumable(fileRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            setProgress(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
          },
          (error) => {
            console.error(error);
          },
          async () => {
            await getDownloadURL(fileRef).then(async (url) => {
              setProfileLoading(false);
              await axios.patch(`/api/user`, {
                ...initialData,
                image: url,
              });
              router.push(`/users/profile`);
              router.refresh();
              toast.dismiss();
              toast.success("Profile uploaded successfully.");
            });
          }
        );
      }
    } catch (error) {
      setProfileLoading(false);
      toast.dismiss();
      toast.error("Something went wrong. Please try again.");
      console.log(error);
    }
  };

  const message = `আমি আমার ব্যবসা জন্য একটি ওয়েবসাইট বানাতে চাচ্ছি। এই বিসয়ে আরও জানতে চাচ্ছি।`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Modern Header */}
      <div className="sticky top-[150px] z-50 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="lg:hidden">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Edit Profile
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Update your business information
                </p>
              </div>
            </div>
            <Button
              type="submit"
              form="profileForm"
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
            id="profileForm"
          >
            {/* Images Section */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="h-5 w-5 text-emerald-600" />
                  <span>Profile Images</span>
                </CardTitle>
                <CardDescription>
                  Upload your profile and banner images to make your profile
                  stand out
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Banner Image */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Banner Image</Label>
                  <div className="relative">
                    {(banner || initialData?.bannerImage) && (
                      <div className="relative h-48 md:h-64 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <Image
                          src={
                            banner
                              ? URL.createObjectURL(banner)
                              : initialData?.bannerImage || ""
                          }
                          alt="Banner"
                          fill
                          className="object-cover"
                        />
                        {banner && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-3 right-3"
                            onClick={() => setBanner(null)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    )}

                    <div className="mt-4">
                      <Input
                        id="banner"
                        type="file"
                        accept="image/*"
                        onChange={handleBannerChange}
                        disabled={bannerLoading}
                        className="hidden"
                      />
                      <label htmlFor="banner">
                        <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:border-emerald-500 transition-colors bg-gray-50 dark:bg-gray-800/50">
                          {bannerLoading ? (
                            <div className="text-center">
                              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-emerald-600" />
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Uploading... {progress.toFixed(0)}%
                              </p>
                              <Progress
                                value={progress}
                                className="w-32 mt-2"
                              />
                            </div>
                          ) : (
                            <div className="text-center">
                              <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Click to upload banner
                              </p>
                              <p className="text-xs text-gray-500">
                                PNG, JPG up to 10MB
                              </p>
                            </div>
                          )}
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Profile Image */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Profile Image</Label>
                  <div className="flex items-start space-x-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 border-4 border-white dark:border-gray-700 shadow-lg">
                        {profile || initialData?.image ? (
                          <Image
                            src={
                              profile
                                ? URL.createObjectURL(profile)
                                : initialData?.image || ""
                            }
                            alt="Profile"
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <UserIcon className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      {profile && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                          onClick={() => setProfile(null)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>

                    <div className="flex-1">
                      <Input
                        id="profile"
                        type="file"
                        accept="image/*"
                        onChange={handleProfileChange}
                        disabled={profileLoading}
                        className="hidden"
                      />
                      <label htmlFor="profile">
                        <Button
                          type="button"
                          variant="outline"
                          disabled={profileLoading}
                          className="cursor-pointer bg-transparent"
                          asChild
                        >
                          <div>
                            {profileLoading ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Uploading...
                              </>
                            ) : (
                              <>
                                <ImagePlus className="h-4 w-4 mr-2" />
                                Change Photo
                              </>
                            )}
                          </div>
                        </Button>
                      </label>
                      {profileLoading && (
                        <div className="mt-2">
                          <Progress value={progress} className="w-full" />
                          <p className="text-xs text-gray-500 mt-1">
                            {progress.toFixed(0)}% uploaded
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <UserIcon className="h-5 w-5 text-emerald-600" />
                  <span>Basic Information</span>
                </CardTitle>
                <CardDescription>
                  Your personal and business details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shopName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your business name"
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Address</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your complete business address"
                          disabled={loading}
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-emerald-600" />
                  <span>Contact Information</span>
                </CardTitle>
                <CardDescription>How customers can reach you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Mobile Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="01XXXXXXXXX"
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="secondaryNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Secondary Number (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="01XXXXXXXXX"
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="whatsAppNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WhatsApp Number (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="01XXXXXXXXX"
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="groupLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WhatsApp Group Link (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://chat.whatsapp.com/..."
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-emerald-600" />
                  <span>Location</span>
                </CardTitle>
                <CardDescription>
                  Your business location details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6"></CardContent>
            </Card>

            {/* Business Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5 text-emerald-600" />
                  <span>Business Details</span>
                </CardTitle>
                <CardDescription>
                  Information about your business
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="businessCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Category</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-1 md:grid-cols-2 gap-3"
                        >
                          {Categories?.map((category) => (
                            <FormItem
                              key={category.id}
                              className="flex items-center space-x-3 space-y-0 rounded-lg border p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                              <FormControl>
                                <RadioGroupItem value={category.name} />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer flex-1">
                                {category.name}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companySize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Size</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                          {[
                            {
                              value: "5-10",
                              label: "Micro Enterprise",
                              desc: "Less than 10 employees",
                            },
                            {
                              value: "10-50",
                              label: "Small Business",
                              desc: "10-50 employees",
                            },
                            {
                              value: "50-250",
                              label: "Medium Enterprise",
                              desc: "50-250 employees",
                            },
                            {
                              value: "250-500",
                              label: "Large Corporation",
                              desc: "250+ employees",
                            },
                          ].map((size) => (
                            <FormItem
                              key={size.value}
                              className="flex items-center space-x-3 space-y-0 rounded-lg border p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                              <FormControl>
                                <RadioGroupItem value={size.value} />
                              </FormControl>
                              <div className="flex-1 cursor-pointer">
                                <FormLabel className="font-medium cursor-pointer">
                                  {size.label}
                                </FormLabel>
                                <p className="text-sm text-gray-500 mt-1">
                                  {size.desc}
                                </p>
                              </div>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="policy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Policy</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your return policy, terms of service, or other business policies..."
                          disabled={loading}
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Interests */}
            <Card>
              <CardHeader>
                <CardTitle>Interested Categories</CardTitle>
                <CardDescription>
                  Select categories you&apos;re interested in for better
                  recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {tempInterest.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium mb-3 block">
                      Selected Interests
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {tempInterest.map((interest, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="px-3 py-1 cursor-pointer hover:bg-red-100 hover:text-red-700 transition-colors"
                          onClick={() => {
                            setTempInterest((prev) =>
                              prev.filter((item) => item !== interest)
                            );
                            form.setValue(
                              "interested",
                              tempInterest.filter((item) => item !== interest)
                            );
                          }}
                        >
                          {Categories?.find((c) => c.id === interest)?.name}
                          <X className="h-3 w-3 ml-2" />
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="interested"
                  render={() => (
                    <FormItem>
                      <FormLabel>Available Categories</FormLabel>
                      <FormControl>
                        <ScrollArea className="h-64 border rounded-lg p-4">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {Categories?.filter(
                              (category) => !tempInterest.includes(category.id)
                            ).map((category) => (
                              <Badge
                                key={category.id}
                                variant="outline"
                                className="px-3 py-2 cursor-pointer hover:bg-emerald-50 hover:border-emerald-300 transition-colors justify-center"
                                onClick={() => {
                                  if (!tempInterest.includes(category.id)) {
                                    setTempInterest((prev) => [
                                      ...prev,
                                      category.id,
                                    ]);
                                    form.setValue(
                                      "interested",
                                      (
                                        form.getValues("interested") || []
                                      ).concat(category.id)
                                    );
                                  }
                                }}
                              >
                                {category.name}
                                <Check className="h-3 w-3 ml-2" />
                              </Badge>
                            ))}
                          </div>
                        </ScrollArea>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Delivery Partners */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Partners</CardTitle>
                <CardDescription>
                  Select your preferred delivery partners
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="deliveryPartner"
                  render={() => (
                    <FormItem>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Categories?.map((category) => (
                          <FormField
                            key={category.id}
                            control={form.control}
                            name="deliveryPartner"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-3 space-y-0 rounded-lg border p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(category.id)}
                                    onCheckedChange={(checked) => {
                                      const currentValue = Array.isArray(
                                        field.value
                                      )
                                        ? field.value
                                        : [];
                                      return checked
                                        ? field.onChange([
                                            ...currentValue,
                                            category.id,
                                          ])
                                        : field.onChange(
                                            currentValue.filter(
                                              (value) => value !== category.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer flex-1">
                                  {category.name}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-emerald-600" />
                  <span>Online Presence</span>
                </CardTitle>
                <CardDescription>
                  Your social media and website links
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fbAccount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facebook Profile</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://facebook.com/yourprofile"
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fbBnsPage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facebook Business Page</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://facebook.com/yourpage"
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://instagram.com/youraccount"
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="youtube"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>YouTube Channel</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://youtube.com/yourchannel"
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tikTok"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>TikTok</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://tiktok.com/@youraccount"
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <div className="flex space-x-2">
                            <Input
                              placeholder="https://yourwebsite.com"
                              disabled={loading}
                              className="flex-1"
                              {...field}
                            />
                            <Link
                              href={`https://wa.me/+8801623939834?text=${message}`}
                              target="_blank"
                            >
                              <Button
                                type="button"
                                variant="outline"
                                className="whitespace-nowrap bg-transparent"
                              >
                                Get Website
                              </Button>
                            </Link>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Save Button for Mobile */}
            <div className="lg:hidden">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3"
                onClick={() => fieldCheck()}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditProfile;
