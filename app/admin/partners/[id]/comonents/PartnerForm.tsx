"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ImagePlus, Trash } from "lucide-react";
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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import LoadingSpinner from "@/components/ui/spinner";
import { storage } from "@/lib/firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { Heading } from "../../comonents/heading";
import { Partner } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(2),
  image: z.string().nullable(),
});

type PartnerFormValues = z.infer<typeof formSchema>;

interface PartnerFormProps {
  initialData: Partner | null;
}

const PartnerForm: React.FC<PartnerFormProps> = ({ initialData }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState<File | null>(null);

  const title = initialData ? "Edit partner" : "Create partner";
  const uploadButton = initialData ? "Change Image" : "Upload Image";
  const description = initialData ? "Edit a partner." : "Add a new partner";
  const toastMessage = initialData ? "Partner updated." : "Partner created.";
  const action = initialData ? "Save changes" : "Create";
  const loadingMessage = initialData ? "Updating..." : "Creating...";
  const imageLoadingMessage = initialData
    ? "Click on save changes to update"
    : "Enter Name & Click on create";

  const form = useForm<PartnerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      image: "",
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileTypeCheck = e.target.files[0];
      if (!fileTypeCheck.type.startsWith("image/")) {
        toast.dismiss();
        toast.error("Please select an image file.");
        return;
      }
      const file = e.target.files[0];
      setImage(file);
      toast.loading(imageLoadingMessage);
    }
  };

  const onSubmit = async (data: PartnerFormValues) => {
    try {
      setLoading(true);
      /*  if (!image && !initialData) {
        toast.dismiss();
        setLoading(false);
        return toast.error("Please select an image file.", {
          style: {
            background: "red",
            color: "#fff",
            padding: "8px",
            borderRadius: "8px",
          },
        });
      } */
      toast.dismiss();
      toast.loading(loadingMessage);

      if (!initialData && !image) {
        // Update the database
        await axios.post(`/api/admin/partners`, data);
        router.push(`/admin/partners`);
        router.refresh();
        toast.dismiss();
        toast.success(toastMessage);
      }
      if (!initialData && image) {
        // Upload image to Firebase Storage
        const fileName = uuidv4();
        const fileRef = ref(storage, `partners/${fileName}`);
        const uploadTask = uploadBytesResumable(fileRef, image);
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
              data = {
                ...data,
                image: url,
              };

              // Update the database
              await axios.post(`/api/admin/partners`, data);
              router.push(`/admin/partners`);
              router.refresh();
              toast.dismiss();
              toast.success(toastMessage);
            });
          }
        );
      }

      // Delete image if new image is uploaded
      if (image && initialData) {
        if (image && initialData.image) {
          const imageRef = ref(storage, initialData.image);
          await deleteObject(imageRef);
        }

        const fileName = uuidv4();
        const fileRef = ref(storage, `partners/${fileName}`);
        const uploadTask = uploadBytesResumable(fileRef, image);
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
              data = {
                ...data,
                image: url,
              };

              await axios.patch(`/api/admin/partners`, {
                ...data,
                id: initialData.id,
              });
              router.push(`/admin/partners`);
              router.refresh();
              toast.dismiss();
              toast.success(toastMessage);
            });
          }
        );
      } else if (!image && initialData) {
        await axios.patch(`/api/admin/partners`, {
          ...data,
          id: initialData.id,
        });
        router.push(`/admin/partners`);
        router.refresh();
        toast.dismiss();
        toast.success(toastMessage);
      }
      //  else {
      //   if (!image) {
      //     toast.dismiss();
      //     toast.error("Please select an image file.", {
      //       style: {
      //         background: "red",
      //         color: "#fff",
      //         padding: "8px",
      //         borderRadius: "8px",
      //       },
      //     });
      //     return;
      //   }
      //   // Check if the file is an image
      //   if (!image.type.startsWith("image/")) {
      //     return toast.error("Please select an image file.", {
      //       style: {
      //         background: "red",
      //         color: "#fff",
      //         padding: "8px",
      //         borderRadius: "8px",
      //       },
      //     });
      //   }

      //   // Upload image to Firebase Storage
      //   const fileName = uuidv4();
      //   const fileRef = ref(storage, `categories/${fileName}`);
      //   const uploadTask = uploadBytesResumable(fileRef, image);
      //   uploadTask.on(
      //     "state_changed",
      //     (snapshot) => {
      //       // Calculate progress (optional)
      //       setProgress(
      //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      //       );
      //     },
      //     (error) => {
      //       // Handle errors
      //       console.error(error);
      //     },
      //     async () => {
      //       // Get the download URL
      //       await getDownloadURL(fileRef).then(async (url) => {
      //         setImageUrl(url);

      //         data = {
      //           ...data,
      //           image: url,
      //         };

      //         await axios.post(`/api/admin/categories`, data);
      //         router.push(`/categories`);
      //         router.refresh();
      //         toast.dismiss();
      //         toast.success(toastMessage);
      //       });
      //     }
      //   );
      // }
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

  const removeImage = () => {
    setImage(null);
    toast.dismiss();
  };

  /*   const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/admin/categories/${params.categoryId}`);
      router.push(`/categories`);
      router.refresh();
      toast.success("Category deleted.");
    } catch (error: any) {
      toast.error(
        "Make sure you removed all products using this category first.",
        {
          style: {
            background: "red",
            color: "#fff",
            padding: "8px",
            borderRadius: "8px",
          },
        }
      );
    } finally {
      setOpen(false);
    }
  }; */

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator className="dark:bg-slate-300 bg-black/60 mb-6" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel>Partner image (optional)</FormLabel>
                <FormControl>
                  <div>
                    {image && (
                      <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden mb-4 border dark:border-slate-300 border-black/60 flex justify-center items-center shadow-md">
                        <div className="z-10 absolute top-2 right-2">
                          <Button
                            type="button"
                            onClick={() => removeImage()}
                            className="bg-red-600 hover:bg-red-700 text-white"
                            size="sm"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                        <Image
                          src={URL.createObjectURL(image)}
                          alt="Preview"
                          width={400}
                          height={250}
                          className="max-w-[200px] max-h-[200px] object-cover"
                        />
                      </div>
                    )}

                    {initialData?.image && image === null && (
                      <div className="w-[200px] h-[200px] rounded-md overflow-hidden mb-4 border dark:border-slate-300 border-black/60 flex justify-center items-center shadow-md">
                        <Image
                          src={initialData.image}
                          alt="Preview sdfs sfsd"
                          width={400}
                          height={250}
                          className="max-w-[200px] max-h-[200px] object-cover"
                        />
                      </div>
                    )}
                    {image && (
                      <>
                        <Progress className="mb-5 w-[200px]" value={progress} />
                        {<p>{progress.toFixed(0)}% Upload Complete</p>}
                      </>
                    )}
                    <div className="w-[210px] overflow-hidden">
                      <Input
                        id="image"
                        className="w-[300px] mt-10 hidden"
                        type="file"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="image">
                        <div className="bg-[#f3f4f6] border text-black dark:border-slate-300 border-black/60 flex items-center w-[200px] px-3 py-2 rounded-lg">
                          <ImagePlus className="h-4 w-4 mr-2" />
                          {uploadButton}
                        </div>
                      </label>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Partner name"
                      {...field}
                      className="dark:border-slate-300 border-black/60"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            /*  onClick={() => {
              setTimeout(() => {
                setLoading(true);
              }, 100);
            }} */
            disabled={loading}
            className="ml-auto"
            type="submit"
          >
            {loading && <LoadingSpinner />}
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default PartnerForm;
