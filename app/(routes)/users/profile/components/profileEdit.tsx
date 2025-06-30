"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
import { Separator } from "@/components/ui/separator";
import { storage } from "@/lib/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Edit, ImagePlus, Loader2, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { object, z } from "zod";

const formSchema = object({
  name: z.string().min(2),
  shopName: z.string().min(2),
  number: z
    .string()
    .min(11, "Complete The Number")
    .max(11, "Number should not exceed 11 digits")
    .regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi number"),
  address: z.string().min(2),
});

type ProfileFormValues = z.infer<typeof formSchema>;

interface ProfileFormProps {
  initialData: {
    id: string;
    number: string | null;
    name: string;
    shopName: string | null;
    address: string | null;
    ratingCount: number;
    ratingTotal: number;
    emailVerified: Date | null;
    role: string[];
    image: string | null;
    bannerImage: string | null;
    createdAt: Date;
  } | null;
}

const ProfileEdit: React.FC<ProfileFormProps> = ({ initialData }) => {
  const [profile, setProfile] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [bannerLoading, setBannerLoading] = useState(false);
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
      address: initialData?.address ? initialData.address : "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    toast.loading("Updating...");
    try {
      setLoading(true);
      await axios.patch(`/api/user`, { id: initialData?.id, ...values });
      toast.dismiss();
      toast.success("Profile updated");
      setLoading(false);
      router.refresh();
      router.push(`/users/profile`);
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

  const removeProfile = () => {
    setProfile(null);
  };

  return (
    <div>
      <Drawer>
        <DrawerTrigger>
          <Edit className="text-indigo-600 dark:text-white" size={30} />
        </DrawerTrigger>
        <DrawerContent className="h-[calc(100vh-50px)] w-screen md:w-[80vw] mx-auto">
          <DrawerHeader className="flex justify-between items-center">
            <div>
              <DrawerTitle>Edit Profile</DrawerTitle>
              <DrawerDescription>
                {" "}
                Change your profile information
              </DrawerDescription>
            </div>
            <div>
              <Button type="submit" form="profileForm">
                Save
              </Button>
            </div>
          </DrawerHeader>
          <Separator />
          <ScrollArea className="p-4 ">
            <div className="space-y-3 mt-5 mb-20">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 px-2 w-full"
                  id="profileForm"
                >
                  <div>
                    <Label>Banner image</Label>
                    {banner && (
                      <div className="relative h-[250px] md:h-[400px] rounded-md overflow-hidden flex justify-center items-center shadow-md">
                        <div className="z-10 absolute top-2 right-2">
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
                      <div className="h-[250px] md:h-[400px] rounded-md overflow-hidden mb-4 flex justify-center items-center shadow-md">
                        <Image
                          src={initialData.bannerImage}
                          alt="Banner Image"
                          width={400}
                          height={250}
                          className="w-full h-full object-cover"
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
                    <Label>Profile image</Label>
                    {profile && (
                      <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden mb-4 border dark:border-slate-300 border-black/60 flex justify-center items-center shadow-md">
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
                      <div className="w-[200px] h-[200px] rounded-md overflow-hidden mb-4 border dark:border-slate-300 border-black/60 flex justify-center items-center shadow-md">
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
                        <>
                          <Progress className="my-5" value={progress} />
                          {<p>{progress.toFixed(0)}% Upload Complete</p>}
                        </>
                      )}
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Change Name</FormLabel>
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
                        <FormLabel>Change Shop Name</FormLabel>
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
                        <FormLabel>Change Number</FormLabel>
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
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Change Address</FormLabel>
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
                </form>
              </Form>
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ProfileEdit;

// <div>
//   <Label>Banner Image</Label>
//   <div>
//     {banner && (
//       <div className="relative h-[250px] md:h-[400px] rounded-md overflow-hidden mb-4 border dark:border-slate-300 border-black/60 flex justify-center items-center shadow-md">
//         <div className="z-10 absolute top-2 right-2">
//           <Button
//             type="button"
//             onClick={() => removeBanner()}
//             className="bg-red-600 hover:bg-red-700 text-white"
//             size="sm"
//           >
//             <Trash className="h-4 w-4" />
//           </Button>
//         </div>
//         <Image
//           src={URL.createObjectURL(banner)}
//           alt="Preview"
//           width={400}
//           height={250}
//           className="w-full h-full object-cover"
//         />
//       </div>
//     )}

//     {/*  {profile && (
//             <>
//               <Progress
//                 className="mb-5 w-[200px]"
//                 value={progress}
//               />
//               {<p>{progress.toFixed(0)}% Upload Complete</p>}
//             </>
//           )} */}
//     <div className="w-[210px] overflow-hidden">
//       <Input
//         id="profile"
//         className="w-[300px] mt-10 hidden"
//         type="file"
//         onChange={handleBannerChange}
//       />
//       <label htmlFor="profile">
//         <div className="bg-[#f3f4f6] border text-black dark:border-slate-300 border-black/60 flex items-center w-[200px] px-3 py-2 rounded-lg">
//           <ImagePlus className="h-4 w-4 mr-2" />
//           Update
//         </div>
//       </label>
//     </div>
//   </div>
// </div>
// <div>
//   <Label>Profile Image</Label>
//   <div>
//     {profile && (
//       <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden mb-4 border dark:border-slate-300 border-black/60 flex justify-center items-center shadow-md">
//         <div className="z-10 absolute top-2 right-2">
//           <Button
//             type="button"
//             onClick={() => removeProfile()}
//             className="bg-red-600 hover:bg-red-700 text-white"
//             size="sm"
//           >
//             <Trash className="h-4 w-4" />
//           </Button>
//         </div>
//         <Image
//           src={URL.createObjectURL(profile)}
//           alt="Preview"
//           width={400}
//           height={250}
//           className="max-w-[200px] max-h-[200px] object-cover"
//         />
//       </div>
//     )}

//     {/*  {profile && (
//             <>
//               <Progress
//                 className="mb-5 w-[200px]"
//                 value={progress}
//               />
//               {<p>{progress.toFixed(0)}% Upload Complete</p>}
//             </>
//           )} */}
//     <div className="w-[210px] overflow-hidden">
//       <Input
//         id="banner"
//         className="w-[300px] mt-10 hidden"
//         type="file"
//         onChange={handleProfileChange}
//       />
//       <label htmlFor="banner">
//         <div className="bg-[#f3f4f6] border text-black dark:border-slate-300 border-black/60 flex items-center w-[200px] px-3 py-2 rounded-lg">
//           <ImagePlus className="h-4 w-4 mr-2" />
//           Update
//         </div>
//       </label>
//     </div>
//   </div>
// </div>
