"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { storage } from "@/lib/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Product, Tags } from "@prisma/client";
import axios from "axios";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Loader2, TagIcon, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { Checkbox } from "../../ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Progress } from "../../ui/progress";
import { ScrollArea } from "../../ui/scroll-area";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  sellerEmail: z
    .string()
    .min(11, "Complete The Number")
    .max(11, "Number should not exceed 11 digits")
    .regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi number"),
  price: z.string().min(1, "Price is required"),
  sellPrice: z.string().min(1, "Sell Price is required"),
  category: z.string().min(1, "Category is required"),
  quantity: z.string().min(1, "Stock Quantity is required"),
  description: z.string().min(1, "Description is required"),
  published: z.boolean().optional(),
});

interface ProductFormProps {
  userId: string | undefined;
  categories?: Category[] | null;
  allTags?: Tags[] | null;
  initialData: Product | null;
}

type TTags = {
  name: string;
  categoryId: string;
};

// const recommendedTags = ["Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5"];

const ProductForm: React.FC<ProductFormProps> = ({
  userId,
  categories,
  initialData,
  allTags,
}) => {
  const initialTags: TTags[] =
    initialData?.tags.map((tag) => ({
      name: tag || "",
      categoryId: initialData.categoryId || "",
    })) || [];

  const [images, setImages] = useState<File[]>([]);
  const [initialImages, setInitialImages] = useState<string[]>(
    initialData?.image || []
  );
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || "");
  const [tags, setTags] = useState<TTags[]>(initialTags || []);
  const [tagInput, setTagInput] = useState("");
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const saveButton = initialData ? "Save Changes" : "Create Product";
  const loadingMessage = initialData
    ? "Updating Product..."
    : "Creating Product...";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: initialData?.productName || "",
      sellerEmail: initialData?.sellerEmail || "",
      description: initialData?.description || "",
      price: initialData?.price ? initialData?.price.toString() : "",
      sellPrice: initialData?.sellPrice
        ? initialData?.sellPrice.toString()
        : "",
      category: initialData?.categoryId || "",
      quantity: initialData?.quantity ? initialData?.quantity.toString() : "",
      published: initialData ? initialData?.published : true,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Here you would typically send the data to your backend
    setIsLoading(true);
    toast.loading(loadingMessage);
    try {
      if (initialData) {
        if (deletedImages.length > 0) {
          for (const image of deletedImages) {
            const imageRef = ref(storage, image);

            // Delete the file
            deleteObject(imageRef);
          }
        }

        const uploadedUrls: string[] = []; // Temporary array to store uploaded URLs

        if (images.length > 0) {
          const uploadPromises = Array.from(images).map((item) => {
            const fileRef = ref(storage, `products/${uuidv4()}`);
            const uploadTask = uploadBytesResumable(fileRef, item);

            return new Promise<void>((resolve, reject) => {
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
                  reject(error);
                },
                async () => {
                  // Get the download URL
                  try {
                    const url = await getDownloadURL(fileRef);
                    uploadedUrls.push(url); // Accumulate uploaded URLs
                    resolve();
                  } catch (error) {
                    console.error(error);
                    reject(error);
                  }
                }
              );
            });
          });

          // Wait for all uploads to complete
          await Promise.all(uploadPromises);
        }

        const finalImageArray = initialImages.filter(
          (image) => !deletedImages.includes(image)
        );
        const finalCategoryName = categoryId
          ? categories?.find((c) => c.id === categoryId)?.name
          : initialData.categoryName;
        const finalCategoryId = categoryId
          ? categories?.find((c) => c.id === categoryId)?.id
          : initialData.categoryId;

        const finalData = {
          ...data,
          id: initialData.id,
          categoryName: finalCategoryName,
          categoryId: finalCategoryId,
          image: [...uploadedUrls, ...finalImageArray],
          tags: [...tags],
        };

        axios
          .patch("/api/product", finalData)
          .then((res) => {
            if (res.status === 200) {
              toast.dismiss();
              setIsLoading(false);
              router.push("/dashboard/products");
              router.refresh();
              toast.success(res.data.message);
            }
          })
          .catch((error) => {
            toast.dismiss();
            setIsLoading(false);
            toast.error(`${error.response.data.message}`);
            console.error(error);
          });
      } else {
        const uploadedUrls: string[] = []; // Temporary array to store uploaded URLs

        const uploadPromises = Array.from(images).map((item) => {
          const fileRef = ref(storage, `products/${uuidv4()}`);
          const uploadTask = uploadBytesResumable(fileRef, item);

          return new Promise<void>((resolve, reject) => {
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
                reject(error);
              },
              async () => {
                // Get the download URL
                try {
                  const url = await getDownloadURL(fileRef);
                  uploadedUrls.push(url); // Accumulate uploaded URLs
                  resolve();
                } catch (error) {
                  console.error(error);
                  reject(error);
                }
              }
            );
          });
        });

        // Wait for all uploads to complete
        await Promise.all(uploadPromises);

        // Now you can send the data to your backend
        const finalData = {
          ...data,
          userId,
          categoryName: categories?.find((c) => c.id === categoryId)?.name,
          images: uploadedUrls,
          tags: [...tags],
        };
        axios
          .post("/api/product", finalData)
          .then((res) => {
            if (res.status === 200) {
              toast.dismiss();
              setIsLoading(false);
              router.push("/dashboard/products");
              router.refresh();
              toast.success(res.data.message);
            }
          })
          .catch((error) => {
            toast.dismiss();
            setIsLoading(false);
            router.push("/dashboard/products");
            router.refresh();
            toast.error(`${error.response.data.message}`);
            console.error(error);
          });
      }
      // eslint-disable-next-line
    } catch (error: any) {
      toast.dismiss();
      setIsLoading(false);
      if (error?.status === 403) {
        toast.error("Product Limit Reached!");
      } else {
        toast.error("Failed to upload product ccccccc");
      }
      console.error(error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png", ".webp", ".gif", ".tiff", ".svg"],
    },
    maxSize: 1 * 1024 * 1024, // 1MB
    onDrop: (acceptedFiles) => {
      if (initialData) {
        if (initialImages.length >= 5) {
          return toast.error("Please Delete Existing Image to Add New. Max 5");
        }
        if (images.length + initialImages.length >= 5) {
          return toast.error("Max Image Quantity Reached. Max 5");
        }

        setImages((prev) =>
          [...acceptedFiles, ...prev].slice(
            0,
            5 - (images.length + initialImages.length)
          )
        );
      } else {
        setImages((prev) => [...acceptedFiles, ...prev].slice(0, 5));
      }
    },
  });

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();

      setTags([
        ...tags,
        {
          name: tagInput.trim(),
          categoryId: categoryId,
        },
      ]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag.name !== tagToRemove));
  };

  const handleRemoveImage = (file: File) => {
    setImages((prev) => prev.filter((f) => f.name !== file.name));
  };

  const handleRemoveInitialImage = (image: string) => {
    setDeletedImages((prev) => [...prev, image]);
    const modifiedArray = initialImages.filter((url) => url !== image);
    setInitialImages(modifiedArray);
  };

  return (
    <div className="px-2">
      <h1 className="text-2xl font-bold mb-6">Upload New Product</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Product Name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sellerEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sellPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sell Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Sell Price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setCategoryId(value);
                    router.push(`?categoryId=${value}`);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <ScrollArea className="h-80">
                      {categories?.map((category, idx) => (
                        <SelectItem key={idx} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Stock Quantity"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="published"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Publish this Product</FormLabel>
                  <FormDescription>
                    Uncheck if Out of Stock or you want to hide this product
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Description"
                    className="h-32"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-2">
            <Label>Product Images</Label>
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-300 p-6 text-center cursor-pointer"
            >
              <input {...getInputProps()} />
              <p>Drag & drop some images here, or click to select files</p>
              <p className="text-sm text-gray-500">
                Max 5 images, 1MB each. Supported formats: JPEG, PNG, WebP
              </p>
            </div>
          </div>
          <div className="col-span-2">
            {images.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-4">
                {images.map((file, index) => (
                  <div
                    className="relative border border-gray-300 p-2 rounded"
                    key={index}
                  >
                    <Image
                      width={96}
                      height={96}
                      src={URL.createObjectURL(file)}
                      alt={`preview ${index}`}
                      className="w-40 h-40 object-cover rounded"
                    />
                    <Trash2
                      className="absolute top-1 text-white right-1 bg-red-500 rounded-md p-1  cursor-pointer"
                      onClick={() => handleRemoveImage(file)}
                    />
                  </div>
                ))}
              </div>
            )}
            {images.length > 0 && (
              <div className="mt-4">
                <Progress className="mb-5" value={progress} />
                <p>{progress.toFixed(0)}% Upload Complete</p>
              </div>
            )}
          </div>
          {initialImages.length > 0 && (
            <div className="col-span-2">
              <FormLabel>Uploaded Product Image</FormLabel>
              <div className="mt-4 flex flex-wrap gap-4">
                {initialImages.map((url, index) => (
                  <div
                    className="relative border border-gray-300 p-2 rounded"
                    key={index}
                  >
                    <Image
                      width={96}
                      height={96}
                      src={url}
                      alt={`preview ${index}`}
                      className="w-40 h-40 object-cover rounded"
                    />
                    <Trash2
                      className="absolute top-1 right-1 bg-red-500 rounded-md p-1 text-white  cursor-pointer"
                      onClick={() => handleRemoveInitialImage(url)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {!initialData && categoryId && (
            <div className="col-span-2">
              <Label htmlFor="tags" className="flex items-center gap-3 pb-3">
                Tags <TagIcon />
              </Label>
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Add tags and press Enter"
                className="p-5 h-10 w-full mb-5"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {tags.map((tag, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="flex px-3 py-1 bg-gray-300 hover:bg-slate-400 dark:bg-background dark:border-slate-500 rounded-3xl items-center gap-1"
                  >
                    {tag.name}
                    <X
                      className="h-5 w-5 cursor-pointer"
                      onClick={() => handleRemoveTag(tag.name)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {initialData && (
            <div className="col-span-2">
              <Label htmlFor="tags" className="flex items-center gap-3 pb-3">
                Tags <TagIcon />
              </Label>
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Add tags and press Enter"
                className="p-5 h-10 w-full mb-5"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {tags.map((tag, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="flex px-3 py-1 bg-gray-300 hover:bg-slate-400 dark:bg-background dark:border-slate-500 rounded-3xl items-center gap-1"
                  >
                    {tag.name}
                    <X
                      className="h-5 w-5 cursor-pointer"
                      onClick={() => handleRemoveTag(tag.name)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {categoryId && (
            <div className="mt-8 mb-5">
              <h2 className="text-2xl font-semibold">
                Category Recommended Tags:
              </h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {allTags &&
                  allTags.map((tag, idx) =>
                    tags.find((t) => t.name === tag.name) ? null : (
                      <Badge
                        key={idx}
                        onClick={() => {
                          setTags((prev) => [
                            ...prev,
                            {
                              name: tag.name,
                              categoryId: categoryId
                                ? categoryId
                                : (initialData && initialData.categoryId) || "",
                            },
                          ]);
                        }}
                        variant="secondary"
                        className="flex capitalize px-3 py-1 cursor-pointer bg-gray-300 hover:bg-slate-400 dark:bg-background dark:border-slate-500 rounded-3xl items-center gap-1"
                      >
                        {tag.name}
                      </Badge>
                    )
                  )}
              </div>
            </div>
          )}
          <Button
            size={"lg"}
            disabled={isLoading}
            type="submit"
            className="w-full py-8 bg-slate-900 dark:bg-white/60 dark:hover:bg-neutral-300 dark:text-slate-900 text-xl disabled:text-muted-foreground font-semibold col-span-2"
          >
            {isLoading && <Loader2 className="mr-2 h-6 w-6 animate-spin" />}
            {saveButton}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
