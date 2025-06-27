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
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { storage } from "@/lib/firebase";
import { Districts } from "@/lib/placeList";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import axios from "axios";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Check, ImagePlus, Loader2, Trash, Trash2 } from "lucide-react";
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
import { Separator } from "../../ui/separator";
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
  division: z.string().min(1).optional(),
  district: z.string().optional(),
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

  const uploadButton = initialData ? "Change Image" : "Upload Image";
  const uploadingMessage = initialData ? "Updating" : "Uploading";

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData ? initialData.name : "",
      shopName: initialData?.shopName ? initialData.shopName : "",
      number: initialData?.number ? initialData.number : "",
      /* secondaryNumber: initialData?.secondaryNumber
        ? initialData.secondaryNumber
        : "", */
      whatsAppNumber: initialData?.whatsAppNumber
        ? initialData.whatsAppNumber
        : "",
      address: initialData?.address ? initialData.address : "",
      businessCategory: initialData?.businessCategory
        ? initialData.businessCategory
        : "",
      division: initialData?.division ? initialData.division : "",
      district: initialData?.district ? initialData.district : "",
      deliveryPartner: initialData?.deliveryPartner
        ? initialData.deliveryPartner
        : [],
      interested: tempInterest,
      policy: initialData?.policy ? initialData.policy : "",
      fbAccount: initialData?.fbAccount ? initialData.fbAccount : "",
      fbBnsPage: initialData?.fbBnsPage ? initialData.fbBnsPage : "",
      youtube: initialData?.youtube ? initialData.youtube : "",
      tikTok: initialData?.tikTok ? initialData.tikTok : "",
      instagram: initialData?.instagram ? initialData.instagram : "",
      website: initialData?.website ? initialData.website : "",
      companySize: initialData?.companySize ? initialData.companySize : "",
      groupLink: initialData?.groupLink ? initialData.groupLink : "",
    },
  });

  const fieldCheck = () => {
    const division = form.getValues("division");
    const businessCategory = form.getValues("businessCategory");

    if (!division) {
      return toast.error("Please Select your Division!");
    }
    if (!businessCategory) {
      return toast.error("Please Select a Business Category!");
    }

    // If both fields have values, you can proceed with further logic here
  };

  // 2. Define a submit handler.
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
    toast.loading(uploadingMessage);
    toast.dismiss();
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
            // Calculate progress (optional)
            setProgress(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
          },
          (error) => {
            // Handle errors
            console.error(error);
          },
          async () => {
            // Get the download URL
            await getDownloadURL(fileRef).then(async (url) => {
              setBannerLoading(false);

              await axios.patch(`/api/user`, {
                ...initialData,
                bannerImage: url,
              });
              router.push(`/users/${initialData?.number}`);
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

  const removeBanner = () => {
    setBanner(null);
  };
  const handleProfileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    toast.loading(uploadingMessage);
    toast.dismiss();
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
            // Calculate progress (optional)
            setProgress(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
          },
          (error) => {
            // Handle errors
            console.error(error);
          },
          async () => {
            // Get the download URL
            await getDownloadURL(fileRef).then(async (url) => {
              setProfileLoading(false);

              await axios.patch(`/api/user`, {
                ...initialData,
                image: url,
              });
              router.push(`/users/${initialData?.number}`);
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

  const removeProfile = () => {
    setProfile(null);
  };

  const message = `আমি আমার ব্যবসা জন্য একটি ওয়েবসাইট বানাতে চাচ্ছি। এই বিসয়ে আরও জানতে চাচ্ছি।`;

  return (
    <div className="">
      <div className="min-h-[calc(100vh-50px)]">
        <div className="z-10 sticky top-0 left-0 w-full px-4 bg-indigo-400 mt-2 rounded-lg p-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-4xl font-bold dark:text-black">
                Edit Profile
              </div>
              <div className=" dark:text-black">
                {" "}
                Change your profile information
              </div>
            </div>

            <div onClick={() => fieldCheck()}>
              <Button type="submit" form="profileForm">
                Save
              </Button>
            </div>
          </div>
          <Separator className="h-0.5 bg-slate-700" />
        </div>
        <ScrollArea className="p-4 ">
          <div className="space-y-3 mt-5 mb-20">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 px-2 w-full"
                id="profileForm"
              >
                <div>
                  <Label className="text-2xl text-indigo-500">
                    Banner image
                  </Label>
                  {banner && (
                    <div className=" h-[250px] md:h-[400px] rounded-md overflow-hidden flex justify-center items-center shadow-md">
                      <div className="z-10 absolute top-2 right-2 border">
                        <Button
                          type="button"
                          onClick={() => removeBanner()}
                          className="bg-red-600 hover:bg-red-700 text-white"
                          size="sm"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      <Image
                        src={URL.createObjectURL(banner)}
                        alt="Banner Image"
                        width={400}
                        height={250}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {initialData?.bannerImage && banner === null && (
                    <div className="h-[250px] md:h-[400px] rounded-md mt-3 overflow-hidden mb-4 flex justify-center items-center shadow-md">
                      <Image
                        src={initialData.bannerImage}
                        alt="Banner Image"
                        width={400}
                        height={250}
                        className="w-full h-full object-cover border border-slate-700 p-0.5 rounded-md"
                      />
                    </div>
                  )}
                  <div className="w-[210px] overflow-hidden">
                    <Input
                      id="banner"
                      disabled={bannerLoading}
                      className="w-[300px] hidden"
                      type="file"
                      onChange={handleBannerChange}
                    />
                    <label htmlFor="banner">
                      <div
                        className={`bg-[#f3f4f6] mt-2 ${
                          bannerLoading && "cursor-not-allowed"
                        } border text-black dark:border-slate-300 border-black/60 flex items-center w-[200px] px-3 py-2 rounded-lg`}
                      >
                        {bannerLoading ? (
                          <div className="flex justify-center items-center gap-1">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                            {uploadingMessage}
                          </div>
                        ) : (
                          <div>{uploadButton}</div>
                        )}
                      </div>
                    </label>
                    {bannerLoading && (
                      <>
                        <Progress className="my-5 " value={progress} />
                        {<p>{progress.toFixed(0)}% Upload Complete</p>}
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-2xl text-indigo-500">
                    Profile image
                  </Label>
                  {profile && (
                    <div className=" w-[200px] h-[200px] rounded-md overflow-hidden mb-4 border dark:border-slate-300 border-black/60 flex justify-center items-center shadow-md">
                      <div className="z-10 absolute top-2 right-2">
                        <Button
                          type="button"
                          onClick={() => removeProfile()}
                          className="bg-red-600 hover:bg-red-700 text-white"
                          size="sm"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      <Image
                        src={URL.createObjectURL(profile)}
                        alt="Profile Image"
                        width={400}
                        height={250}
                        className="max-w-[200px] max-h-[200px] object-cover"
                      />
                    </div>
                  )}

                  {initialData?.image && profile === null && (
                    <div className="w-[200px] h-[200px] mt-3 rounded-md overflow-hidden mb-4 border dark:border-slate-300 border-black/60 flex justify-center items-center shadow-md">
                      <Image
                        src={initialData.image}
                        alt="Profile Image"
                        width={400}
                        height={250}
                        className="max-w-[200px] max-h-[200px] object-cover"
                      />
                    </div>
                  )}

                  <div className="w-[210px] overflow-hidden">
                    <Input
                      id="profile"
                      disabled={loading}
                      className="w-[300px] hidden"
                      type="file"
                      onChange={handleProfileChange}
                    />
                    <label htmlFor="profile">
                      <div className="bg-[#f3f4f6] mt-2 border text-black dark:border-slate-300 border-black/60 flex items-center w-[200px] px-3 py-2 rounded-lg">
                        <ImagePlus className="h-4 w-4 mr-2" />
                        {uploadButton}
                      </div>
                    </label>
                    {profileLoading && (
                      <div>
                        <Progress className="my-5" value={progress} />
                        {<p>{progress.toFixed(0)}% Upload Complete</p>}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-2xl text-indigo-500">
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Owner name"
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
                    name="shopName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-2xl text-indigo-500">
                          Shop Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Shop name"
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
                    name="number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-2xl text-indigo-500 ">
                          Mobile Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Mobile Number"
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
                    name="secondaryNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-2xl text-indigo-500">
                          Second Mobile Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Secondary Number"
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
                    name="whatsAppNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-2xl text-indigo-500 ">
                          WhatsApp Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="WhatsApp Number"
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
                    name="fbAccount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-2xl text-indigo-500">
                          Facebook Account
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Facebook Account"
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
                    name="fbBnsPage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-2xl text-indigo-500">
                          Facebook Business Page
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Facebook Business Page"
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
                    name="youtube"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-2xl text-indigo-500">
                          Youtube
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Youtube Chanel"
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
                    name="instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-2xl text-indigo-500">
                          Instagram
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Instagram Account"
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
                    name="tikTok"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-2xl text-indigo-500">
                          TikTok
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="TikTok Account"
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
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-2xl text-indigo-500">
                          Website URL
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-4 w-full">
                            <Input
                              disabled={loading}
                              placeholder="Website URL"
                              {...field}
                              className="dark:border-slate-300 border-black/60"
                            />
                            <Link
                              href={`https://wa.me/+8801623939834?text=${message}`}
                              target="_blank"
                              className="dark:bg-[#f3f4f6] bg-indigo-400 text-white border dark:text-black dark:border-slate-300 border-white/60 flex items-center justify-center w-[200px] px-3 py-2 rounded-lg text-center font-medium cursor-pointer "
                            >
                              Buy Website
                            </Link>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="division"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-2xl text-indigo-500">
                        Merchant Division
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={"Barishal"} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Barishal
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={"Chattogram"} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Chattogram
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={"Dhaka"} />
                            </FormControl>
                            <FormLabel className="font-normal">Dhaka</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={"Rajshahi"} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Rajshahi
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={"Khulna"} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Khulna
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={"Rangpur"} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Rangpur
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={"Mymensingh"} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Mymensingh
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={"Sylhet"} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Sylhet
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-2xl text-indigo-500">
                        Merchant District
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                        >
                          {Districts.map((dis, idx) => (
                            <FormItem
                              key={idx}
                              className="flex items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <RadioGroupItem value={dis} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {dis}
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
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-2xl text-indigo-500">
                        Full Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Shop Address"
                          {...field}
                          className="dark:border-slate-300 border-black/60"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {tempInterest.length ? (
                  <div className="pb-4">
                    <FormLabel className="text-2xl text-indigo-500">
                      Interested Categories
                    </FormLabel>
                    <ScrollArea className="mt-5 flex flex-wrap gap-3">
                      <div className="flex flex-wrap gap-x-3 gap-y-4">
                        {tempInterest.map((interest, i) => (
                          <div
                            key={i}
                            onClick={() => {
                              setTempInterest((prev) =>
                                prev.filter((item) => item !== interest)
                              );
                              form.setValue(
                                "interested",
                                tempInterest.filter((item) => item !== interest)
                              );
                            }}
                            className="flex items-center justify-between w-fit cursor-pointer"
                          >
                            <Badge
                              className="py-1 px-2 flex gap-3 items-center rounded-2xl text-sm font-semibold"
                              variant={"secondary"}
                            >
                              {Categories?.find((c) => c.id === interest)?.name}
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                ) : (
                  <div>
                    <FormLabel className="text-2xl text-indigo-500">
                      Interested Categories
                    </FormLabel>
                    <p className="text-muted-foreground text-base font-medium pt-1">
                      No interested categories selected. Please select your
                      interested categories
                    </p>
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="interested"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-2xl text-indigo-500">
                        Select Interests
                      </FormLabel>
                      <FormControl>
                        <ScrollArea className="h-[310px] border mt-4 p-2 rounded-xl flex flex-wrap gap-3">
                          <div className="flex flex-wrap gap-x-3 gap-y-4">
                            {Categories?.map((category, i) => (
                              <div
                                key={i}
                                onClick={() => {
                                  if (
                                    !tempInterest.includes(`category ${i + 1}`)
                                  ) {
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
                                  } else
                                    toast.error("Category already exists!");
                                }}
                                className={`"flex items-center justify-between w-fit cursor-pointer ${
                                  tempInterest.includes(category.id)
                                    ? "hidden"
                                    : ""
                                }`}
                              >
                                <Badge
                                  className="py-1 px-2 flex gap-3 items-center rounded-2xl text-sm font-semibold"
                                  variant={"secondary"}
                                >
                                  {category.name}
                                  <Check className="h-4 w-4" />
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="businessCategory"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-2xl text-indigo-500">
                        Business Category
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                          {Categories?.map((category) => (
                            <FormItem
                              key={category.id}
                              className="flex items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <RadioGroupItem value={category.name} />
                              </FormControl>
                              <FormLabel className="font-normal">
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
                  name="deliveryPartner"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-2xl text-indigo-500">
                          Delivery Partner
                        </FormLabel>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Categories?.map((category) => (
                          <FormField
                            key={category.id}
                            control={form.control}
                            name="deliveryPartner"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={category.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(
                                        category.id
                                      )}
                                      onCheckedChange={(checked) => {
                                        const currentValue =
                                          typeof field.value === "string"
                                            ? [field.value]
                                            : field.value;

                                        return checked && currentValue
                                          ? field.onChange([
                                              ...currentValue,
                                              category.id,
                                            ])
                                          : field.onChange(
                                              currentValue?.filter(
                                                (value: string) =>
                                                  value !== category.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {category.name}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="policy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-2xl text-indigo-500">
                        Business Policy
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={loading}
                          placeholder="Provide your return/business policy. (max 500 characters)"
                          {...field}
                          className="dark:border-slate-300 border-black/60 h-32"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companySize"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-2xl text-indigo-500">
                        Company Size
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={"5-10"} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Micro: Less than 10 employees
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={"10-50"} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Small: Less than 50 employees
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={"50-250"} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Medium: 50 to 250 employees
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={"250-500"} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Large: More than 250 employees
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
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
                      <FormLabel className="text-2xl text-indigo-500">
                        WhatsApp Group
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="আপনার গ্রুপের লিংক দিন"
                          {...field}
                          className="dark:border-slate-300 border-black/60"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default EditProfile;
