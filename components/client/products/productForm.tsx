"use client";

import type React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { storage } from "@/lib/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Category, Product, Tags } from "@prisma/client";
import axios from "axios";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  Loader2,
  TagIcon,
  Trash2,
  X,
  Upload,
  ImageIcon,
  DollarSign,
  Package,
  FileText,
  Settings,
  Eye,
  EyeOff,
} from "lucide-react";
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
  number: z
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
      number: initialData?.number || "",
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
    setIsLoading(true);
    toast.loading(loadingMessage);

    try {
      if (initialData) {
        if (deletedImages.length > 0) {
          for (const image of deletedImages) {
            const imageRef = ref(storage, image);
            deleteObject(imageRef);
          }
        }

        const uploadedUrls: string[] = [];

        if (images.length > 0) {
          const uploadPromises = Array.from(images).map((item) => {
            const fileRef = ref(storage, `products/${uuidv4()}`);
            const uploadTask = uploadBytesResumable(fileRef, item);

            return new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  setProgress(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  );
                },
                (error) => {
                  console.error(error);
                  reject(error);
                },
                async () => {
                  try {
                    const url = await getDownloadURL(fileRef);
                    uploadedUrls.push(url);
                    resolve();
                  } catch (error) {
                    console.error(error);
                    reject(error);
                  }
                }
              );
            });
          });

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
        if (!images) {
          return toast.error("Please Add Images!");
        }

        const uploadedUrls: string[] = [];

        const uploadPromises = Array.from(images).map((item) => {
          const fileRef = ref(storage, `products/${uuidv4()}`);
          const uploadTask = uploadBytesResumable(fileRef, item);

          return new Promise<void>((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                setProgress(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
              },
              (error) => {
                console.error(error);
                reject(error);
              },
              async () => {
                try {
                  const url = await getDownloadURL(fileRef);
                  uploadedUrls.push(url);
                  resolve();
                } catch (error) {
                  console.error(error);
                  reject(error);
                }
              }
            );
          });
        });

        await Promise.all(uploadPromises);

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.dismiss();
      setIsLoading(false);
      if (error?.status === 403) {
        toast.error("Product Limit Reached!");
      } else {
        toast.error("Failed to upload product");
      }
      console.error(error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png", ".webp", ".gif", ".tiff", ".svg"],
    },
    maxSize: 3 * 1024 * 1024,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            {initialData ? "Edit Product" : "Create New Product"}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            {initialData
              ? "Update your product details"
              : "Add a new product to your inventory"}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Package className="h-5 w-5 text-blue-600" />
                  Basic Information
                </CardTitle>
                <CardDescription>
                  Enter the essential details about your product
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="productName"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-base font-medium">
                          Product Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter product name"
                            className="h-12 text-base"
                            {...field}
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
                        <FormLabel className="text-base font-medium">
                          Contact Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="017********"
                            className="h-12 text-base"
                            {...field}
                          />
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
                        <FormLabel className="text-base font-medium">
                          Category
                        </FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            setCategoryId(value);
                            router.push(`?categoryId=${value}`);
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 text-base">
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
                </div>
              </CardContent>
            </Card>

            {/* Pricing & Inventory */}
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Pricing & Inventory
                </CardTitle>
                <CardDescription>
                  Set your product pricing and stock information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">
                          Regular Price
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
                            <Input
                              type="number"
                              placeholder="0.00"
                              className="h-12 text-base pl-10"
                              {...field}
                            />
                          </div>
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
                        <FormLabel className="text-base font-medium">
                          Sale Price
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
                            <Input
                              type="number"
                              placeholder="0.00"
                              className="h-12 text-base pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">
                          Stock Quantity
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            className="h-12 text-base"
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

            {/* Product Description */}
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <FileText className="h-5 w-5 text-purple-600" />
                  Product Description
                </CardTitle>
                <CardDescription>
                  Provide a detailed description of your product
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Describe your product features, benefits, and specifications..."
                          className="min-h-32 text-base resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Product Images */}
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <ImageIcon className="h-5 w-5 text-orange-600" />
                  Product Images
                </CardTitle>
                <CardDescription>
                  Upload high-quality images of your product (Max 5 images, 1MB
                  each)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                    isDragActive
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                      : "border-slate-300 dark:border-slate-600 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                      <Upload className="h-8 w-8 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
                        {isDragActive
                          ? "Drop images here"
                          : "Drag & drop images here"}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        or click to browse files
                      </p>
                    </div>
                    <div className="text-xs text-slate-400 dark:text-slate-500">
                      Supported formats: JPEG, PNG, WebP • Max 5 images • 3MB
                      each
                    </div>
                  </div>
                </div>

                {/* New Images Preview */}
                {images.length > 0 && (
                  <div>
                    <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-3">
                      New Images ({images.length})
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {images.map((file, index) => (
                        <div
                          key={index}
                          className="relative group rounded-lg overflow-hidden border-2 border-slate-200 dark:border-slate-700"
                        >
                          <Image
                            width={200}
                            height={200}
                            src={
                              URL.createObjectURL(file) || "/placeholder.svg"
                            }
                            alt={`preview ${index}`}
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => handleRemoveImage(file)}
                              className="h-8 w-8 p-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    {progress > 0 && (
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Upload Progress</span>
                          <span>{progress.toFixed(0)}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                    )}
                  </div>
                )}

                {/* Existing Images Preview */}
                {initialImages.length > 0 && (
                  <div>
                    <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-3">
                      Current Images ({initialImages.length})
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {initialImages.map((url, index) => (
                        <div
                          key={index}
                          className="relative group rounded-lg overflow-hidden border-2 border-slate-200 dark:border-slate-700"
                        >
                          <Image
                            width={200}
                            height={200}
                            src={url || "/placeholder.svg"}
                            alt={`current ${index}`}
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => handleRemoveInitialImage(url)}
                              className="h-8 w-8 p-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tags Section */}
            {(categoryId || initialData) && (
              <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <TagIcon className="h-5 w-5 text-pink-600" />
                    Product Tags
                  </CardTitle>
                  <CardDescription>
                    Add relevant tags to help customers find your product
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <FormLabel className="text-base font-medium">
                      Add Custom Tags
                    </FormLabel>
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleAddTag}
                      placeholder="Type a tag and press Enter"
                      className="h-12 text-base mt-2"
                    />
                  </div>

                  {tags.length > 0 && (
                    <div>
                      <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-3">
                        Selected Tags ({tags.length})
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="flex items-center gap-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                          >
                            {tag.name}
                            <X
                              className="h-4 w-4 cursor-pointer hover:text-red-600"
                              onClick={() => handleRemoveTag(tag.name)}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {allTags && allTags.length > 0 && (
                    <div>
                      <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-3">
                        Recommended Tags
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {allTags.map((tag, idx) =>
                          tags.find((t) => t.name === tag.name) ? null : (
                            <Badge
                              key={idx}
                              onClick={() => {
                                setTags((prev) => [
                                  ...prev,
                                  {
                                    name: tag.name,
                                    categoryId:
                                      categoryId ||
                                      initialData?.categoryId ||
                                      "",
                                  },
                                ]);
                              }}
                              variant="outline"
                              className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 px-3 py-2 rounded-full text-sm transition-colors"
                            >
                              {tag.name}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Settings */}
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Settings className="h-5 w-5 text-slate-600" />
                  Product Settings
                </CardTitle>
                <CardDescription>
                  Configure visibility and availability settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="published"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel
                          htmlFor="visibility"
                          className="text-base font-medium flex items-center gap-2"
                        >
                          {field.value ? (
                            <Eye className="h-4 w-4 text-green-600" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-slate-400" />
                          )}
                          Publish Product
                        </FormLabel>
                        <FormDescription>
                          {field.value
                            ? "Product is visible to customers"
                            : "Product is hidden from customers"}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Checkbox
                          id="visibility"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                size="lg"
                className="w-full md:w-auto min-w-48 h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                {saveButton}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProductForm;
