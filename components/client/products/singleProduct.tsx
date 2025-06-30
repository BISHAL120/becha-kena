"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Product, Review, User } from "@prisma/client";
import axios from "axios";
import {
  BadgeCheck,
  BookmarkMinusIcon,
  BookmarkPlusIcon,
  Download,
  Facebook,
  Linkedin,
  Phone,
  Star,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";
import DetailsButton from "../components/detailsButton";
import PromoteDrawer from "../components/promoteDialog";
import { StarRating } from "../components/star-rating";
import { ImageCarousel } from "../imageCarousel";
import AllReview from "../components/allReview";
import ProductReviewDialog from "../components/ratingDialog";

interface ExtendedProduct extends Product {
  merchant: User | null;
}

// Update Props Interface
interface ProductListProps {
  session: string | undefined;
  currentUser: {
    id: string;
    isActive: boolean;
    idDeactivationDate: Date;
  } | null;
  product: ExtendedProduct | null;
  allReview: Review[];
  similarProduct: Product[] | null;
}

const ProductDetails = ({
  session,
  currentUser,
  product,
  allReview,
  similarProduct,
}: ProductListProps) => {
  const router = useRouter();
  const message = `I am interested in this product.Name: ${product?.productName}, Price: ${product?.sellPrice}, Category: ${product?.categoryName}. Please let me know if this product is available.`;

  useEffect(() => {
    const increaseViewCount = async () => {
      if (process.env.NODE_ENV === "development") return;
      try {
        if (!product) return;
        await axios
          .patch("/api/product/viewCount", {
            id: product.id,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    };

    increaseViewCount();
  }, [product]);

  useEffect(() => {
    const draftProduct = async () => {
      if (currentUser) {
        if (
          currentUser.isActive &&
          currentUser.idDeactivationDate <= new Date()
        ) {
          await axios.post("/api/products/draft", { userId: currentUser?.id });
        }
      }
    };
    draftProduct();
  });

  if (!product) {
    setTimeout(() => {
      router.push("/products");
    }, 1000);

    return (
      <div className="h-[calc(100vh-200px)] flex justify-center items-center text-2xl text-muted-foreground">
        <div className="text-center space-y-3">
          <h2 className="font-semibold text-4xl">
            Please Double Check Product ID
          </h2>
          <h2>This Product Does Not Exist</h2>
          <p>Redirecting...</p>
        </div>
      </div>
    );
  }

  const handleSaveMerchant = async () => {
    toast.loading("Saving...");
    try {
      await axios
        .patch("/api/user/saveMerchant", {
          id: product.merchantId,
          saveId: product.merchantId,
          type: "save",
        })
        .then(() => {
          toast.dismiss();
          router.refresh();
          toast.success("Merchant Saved");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveMerchant = async () => {
    toast.loading("Removing...");
    try {
      await axios
        .patch("/api/user/saveMerchant", {
          id: product.merchantId,
          saveId: product.merchantId,
          type: "remove",
        })
        .then(() => {
          toast.dismiss();
          router.refresh();
          toast.success("Merchant Removed");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const downloadAllImages = async (imageLinks: string[]) => {
    toast.loading("Downloading images...");
    try {
      for (let i = 0; i < imageLinks.length; i++) {
        const response = await fetch("/api/downloadImage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: imageLinks[i], index: i + 1 }),
        });

        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.download = `image_${i + 1}.jpg`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        } else {
          console.error(`Failed to download image ${i + 1}`);
        }
      }
    } catch (error) {
      console.error("Error downloading images:", error);
    } finally {
      toast.dismiss();
      toast.success("All images downloaded successfully!");
    }
  };

  const fiveStar = allReview.filter((review) => review.rating === 5).length;
  const fourStar = allReview.filter((review) => review.rating === 4).length;
  const threeStar = allReview.filter((review) => review.rating === 3).length;
  const twoStar = allReview.filter((review) => review.rating === 2).length;
  const oneStar = allReview.filter((review) => review.rating === 1).length;

  const totalReviews = allReview.length;
  const fiveStarPercentage = Math.round((fiveStar / totalReviews) * 100);
  const fourStarPercentage = Math.round((fourStar / totalReviews) * 100);
  const threeStarPercentage = Math.round((threeStar / totalReviews) * 100);
  const twoStarPercentage = Math.round((twoStar / totalReviews) * 100);
  const oneStarPercentage = Math.round((oneStar / totalReviews) * 100);

  const rating = product.ratingTotal / product.ratingCount;

  return (
    <div>
      <div className="container md:mx-auto md:px-4 px-1 py-3 md:py-8">
        <div className="grid gap-2 md:gap-8 md:grid-cols-2">
          {/* Left Column - Product Images */}
          <div>
            <ImageCarousel
              images={product?.image || []}
              aspectRatio="square"
              className="sticky top-8"
            />
          </div>
          <div className="flex md:hidden justify-end mb-5">
            <div className="flex gap-2 md:hidden">
              <DetailsButton
                id={product?.id}
                userId={product.merchant?.id}
                name={product?.productName ?? ""}
                user={product.merchant}
              />
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div
            className={`flex flex-col gap-6 px-3 ${
              !session && currentUser?.isActive && ""
            }`}
          >
            {/* Product Info */}
            <div className="space-y-3 mb-8 ">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href={`/categories/${product.categoryName}`}
                    >
                      {product.categoryName}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{product.productName}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="md:flex justify-between items-start ">
                <div>
                  <h1 className="text-2xl font-bold">{product.productName}</h1>
                  <p className="text-sm text-muted-foreground">
                    {product.categoryName}
                  </p>
                </div>
                {/*  {session && ( */}
                <div className="hidden md:block">
                  <DetailsButton
                    id={product.id}
                    userId={product.merchant?.id}
                    name={product.productName ?? ""}
                    user={product.merchant}
                  />
                </div>
                {/*  )} */}
              </div>
              {/*  {session &&
                currentUser?.isActive &&
                currentUser.idDeactivationDate >= new Date() && ( */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">
                    {Intl.NumberFormat("bn-BD", {
                      style: "currency",
                      currency: "BDT",
                    }).format(product.sellPrice || 0)}
                  </p>
                  <p className="text-base font-semibold text-muted-foreground line-through">
                    {Intl.NumberFormat("bn-BD", {
                      style: "currency",
                      currency: "BDT",
                    }).format(product.price || 0)}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">
                      {isNaN(rating) ? "0.0" : rating.toFixed(1)}
                    </p>
                    <Star fill="#fbbf24" stroke="#fbbf24" className="w-5" />
                  </div>
                </div>
              </div>
              {/*   )} */}
            </div>
            {/* Seller Info */}
            {/* {session &&
              currentUser?.isActive &&
              currentUser.idDeactivationDate >= new Date() && ( */}
            <div className="flex items-center justify-between ">
              <Link
                href={`/users/profile/${product.merchantId}`}
                className="flex items-center gap-5"
              >
                <div className="relative">
                  <Avatar className="ring-2 ring-offset-2">
                    <AvatarImage
                      className="object-cover"
                      src="/demoImage/profile.jpg"
                    />
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>

                  <BadgeCheck
                    size={18}
                    fill="#8b5cf6"
                    stroke="white"
                    className="absolute -top-1 -right-1"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">
                    {product.merchant?.name}
                    <span>
                      <StarRating rating={rating} />
                    </span>
                  </h3>
                </div>
              </Link>

              {/* TODO: Add a loader when saving and disable the save and remove button */}
              {product.merchant?.saveMerchant?.includes(product.merchantId) ? (
                <Button
                  onClick={() => {
                    handleRemoveMerchant();
                  }}
                  className="text-sm bg-red-500 hover:bg-red-600 dark:text-white"
                >
                  Removed <BookmarkMinusIcon />
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    handleSaveMerchant();
                  }}
                  className="text-sm bg-blue-500 hover:bg-blue-600 dark:text-white"
                >
                  Save Seller <BookmarkPlusIcon />
                </Button>
              )}
            </div>
            {/*   )}  */}
            {/* Contact Buttons */}
            {/* {session &&
              currentUser?.isActive &&
              currentUser.idDeactivationDate >= new Date() && ( */}
            <div className="flex flex-col gap-4 mt-5">
              <Link
                href={`https://wa.me/+8801843432824?text=${message}`}
                target="_blank"
                className="w-full bg-green-500 hover:bg-green-600 flex justify-center items-center py-2 rounded-md text-white"
              >
                <Phone className="mr-2 h-4 w-4" /> WhatsApp
              </Link>
              <Button
                onClick={() => downloadAllImages(product.image || [])}
                variant="outline"
                className="w-full text-base h-10"
              >
                <Download className="h-5 w-5" /> Download All Images
              </Button>
              <ProductReviewDialog
                title="Product Review"
                userId={product.merchantId}
                Id={product.id}
                ratingType="product"
              />
            </div>
            {/*   )}  */}
            {/* Product Location SKU and Report Button */}
            {/* {session &&
              currentUser?.isActive &&
              currentUser.idDeactivationDate >= new Date() && ( */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-5">
                <p className="text-sm font-medium  min-w-20">Stock :</p>{" "}
                <p className="text-muted-foreground">{product.quantity}</p>
              </div>
              <div className="flex items-center gap-5">
                <p className="text-sm font-medium  min-w-20">Product ID :</p>{" "}
                <p className="text-muted-foreground">
                  {/* TODO: Add product SKU */}
                  {product.sku?.padStart(4, "0")}
                </p>
              </div>
              <div className="flex items-center gap-5">
                <p className="text-sm font-medium  min-w-20">Location :</p>{" "}
                <p className="text-muted-foreground">
                  {product.merchant?.address}
                </p>
              </div>

              <div className="flex items-center gap-5">
                <p className="text-sm font-medium  min-w-20">Total View :</p>{" "}
                <p className="text-muted-foreground">{product.views}</p>
              </div>
            </div>
            {/*   )} */}
            {/*  {!session && (
              <Link
                href={"/login"}
                className="text-2xl text-muted-foreground font-semibold min-h-[300px]"
              >
                প্রাইস/ডিটেলস দেখতে এখানে ক্লিক করুন
              </Link>
            )} */}
            {/* {session &&
              currentUser?.idDeactivationDate &&
              currentUser?.idDeactivationDate < new Date() &&
              !currentUser?.isActive && (
                <Link
                  href={"/dashboard?um=idActive"}
                  className="text-2xl text-muted-foreground font-semibold min-h-[300px]"
                >
                  প্রাইস/ডিটেলস দেখতে আইডি অ্যাক্টিভ করুণ
                </Link>
              )} */}
            {/* Report Button */}
            <Dialog>
              <DialogTrigger className="w-full h-10 flex justify-center items-center  gap-2 border  font-medium bg-background py-1.5 text-base mt-auto hover:bg-red-600 hover:text-white rounded-lg">
                Report (0)
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="pb-3">
                    Are you absolutely sure?
                  </DialogTitle>
                  <Textarea
                    className="min-h-32"
                    placeholder="Type your report..."
                  />
                  <div className="flex justify-end gap-2 pt-3">
                    <Button variant="outline">Cancel</Button>
                    <Button>Submit</Button>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <PromoteDrawer
              className="w-full justify-center py-[23px]  bg-indigo-600 hover:bg-indigo-700 text-base font-semibold"
              tittle="বিজ্ঞাপনটি বুস্ট করুন"
              productId={product.id}
              userId={product.merchantId}
            />
            <div className="flex justify-center items-center gap-4">
              <Link
                href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_APP_URL}/products/${product.productSlug}/?id=${product.id}`}
                target="_blank"
                className="w-10 h-10 flex justify-center items-center rounded-full border hover:bg-slate-800 hover:text-white"
              >
                <Facebook />
              </Link>
              <Link
                href={`https://x.com/share?url=${process.env.NEXT_PUBLIC_APP_URL}/products/${product.productSlug}/?id=${product.id}`}
                target="_blank"
                className="w-10 h-10 flex justify-center items-center rounded-full border hover:bg-slate-800 hover:text-white"
              >
                <Twitter />
              </Link>
              <Link
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${process.env.NEXT_PUBLIC_APP_URL}/products/${product.productSlug}/?id=${product.id}`}
                target="_blank"
                className="w-10 h-10 flex justify-center items-center rounded-full border hover:bg-slate-800 hover:text-white"
              >
                <Linkedin />
              </Link>
            </div>
          </div>
        </div>
        {/* Tabs */}
        <Tabs defaultValue="description" className="w-full py-10 px-1">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="policy">Merchant Info</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4">
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4">
            <div className="space-y-6 grid">
              {/* Rating Overview */}
              <div className="w-full flex justify-between items-center gap-5">
                <Card className="p-4 w-1/2 h-full">
                  <div className="flex flex-col  items-center gap-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold">
                        {isNaN(
                          Number(
                            (product.ratingTotal / product.ratingCount).toFixed(
                              1
                            )
                          )
                        )
                          ? 0
                          : Number(
                              (
                                product.ratingTotal / product.ratingCount
                              ).toFixed(1)
                            ).toFixed(1)}
                      </div>
                      <StarRating
                        rating={Number(
                          (product.ratingTotal / product.ratingCount).toFixed(1)
                        )}
                        size="lg"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Product Rating
                      </p>
                    </div>
                    <div className="flex-1 space-y-2 w-full">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center gap-2">
                          <div className="w-12 flex items-center gap-2 text-sm text-muted-foreground">
                            <span> {stars}</span> stars
                          </div>
                          <Progress
                            value={
                              stars === 5
                                ? fiveStarPercentage
                                : stars === 4
                                ? fourStarPercentage
                                : stars === 3
                                ? threeStarPercentage
                                : stars === 2
                                ? twoStarPercentage
                                : oneStarPercentage
                            }
                            className="h-2"
                          />
                          <div className="w-12 text-sm text-muted-foreground">
                            {stars === 5
                              ? isNaN(fiveStarPercentage)
                                ? 0
                                : fiveStarPercentage + "%"
                              : stars === 4
                              ? isNaN(fourStarPercentage)
                                ? 0
                                : fourStarPercentage + "%"
                              : stars === 3
                              ? isNaN(threeStarPercentage)
                                ? 0
                                : threeStarPercentage + "%"
                              : stars === 2
                              ? isNaN(twoStarPercentage)
                                ? 0
                                : twoStarPercentage + "%"
                              : isNaN(oneStarPercentage)
                              ? 0
                              : oneStarPercentage + "%"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
                <Card className="p-4 w-1/2 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-center">
                      Rate This Product
                    </h3>
                    <div className="w-2/3 mx-auto">
                      <label className="block text-sm font-medium mb-1 text-center">
                        Share your thoughts & Experience with this Product and
                        let other customers know about it
                      </label>
                      <div className="mx-auto text-base font-semibold text-center py-6">
                        Total Review Count: <span>{product.ratingCount}</span>
                      </div>
                      {/* <div className="flex justify-center ">
                        <StarRating
                          rating={Number(
                            (product.ratingTotal / product.ratingCount).toFixed(
                              1
                            )
                          )}
                          size="lg"
                        />
                      </div> */}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <ProductReviewDialog
                      className="w-full mx-auto bg-blue-600 hover:bg-blue-700 hover:text-slate-50 text-slate-100"
                      title="Product Review"
                      Id={product.id}
                      userId={product.merchantId}
                      userName={product.merchant?.name}
                      ratingType="product"
                    />
                  </div>
                </Card>
              </div>
              {/* Reviews List */}
              <AllReview allReview={allReview} />
              {/* Write Review Form */}
              {/* <ReviewBox productId={product.id} /> */}
            </div>
          </TabsContent>
          <TabsContent value="policy" className="mt-4">
            <div className="flex items-center gap-4 font-semibold">
              <p>Name: </p>
              <p className="text-sm text-muted-foreground">
                {product.merchant?.name}
              </p>
            </div>
            <div className="flex items-center gap-4 font-semibold">
              <p>Address: </p>
              <p className="text-sm text-muted-foreground">
                {product.merchant?.address}
              </p>
            </div>

            <div className="flex items-center gap-4 font-semibold">
              <p>Policy: </p>
              <p className="text-sm text-muted-foreground">
                {product.merchant?.policy}
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Similar Products */}
        <div className="mt-16 px-2">
          <h2 className="text-xl font-semibold md:text-2xl md:font-bold mb-6">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {similarProduct &&
              similarProduct.map((product, i) => (
                <Link
                  prefetch={true}
                  href={`/products/${product.productSlug}/?id=${product.id}`}
                  key={i}
                  className="flex"
                >
                  <Card className="overflow-hidden flex-1">
                    <div className="aspect-square">
                      <Image
                        src={product.image[0]}
                        width={600}
                        height={600}
                        alt={product.productName || "Product Image"}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium md:font-semibold text-base md:text-lg">
                        {product.productName &&
                          product.productName.slice(0, 25)}
                        {product.productName &&
                          product.productName.length > 25 &&
                          "..."}
                      </h3>
                      <div className="flex justify-between items-center">
                        <p className="text-sm">{product.categoryName}</p>
                        <p className="text-sm">
                          {isNaN(product.ratingTotal / product.ratingCount)
                            ? 0
                            : (
                                product.ratingTotal / product.ratingCount
                              ).toFixed(1)}
                        </p>
                      </div>
                      <div className="flex flex-col md:flex-row text-start md:items-center justify-between mt-1">
                        <p className="font-semibold mb-2 text-sm md:font-bold">
                          {Intl.NumberFormat("bn-BD", {
                            style: "currency",
                            currency: "BDT",
                          }).format(product.price || 0)}
                        </p>
                        <StarRating
                          rating={
                            isNaN(product.ratingTotal / product.ratingCount)
                              ? 0
                              : Math.round(
                                  product.ratingTotal / product.ratingCount
                                )
                          }
                          size="sm"
                        />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
