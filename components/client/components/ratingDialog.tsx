"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Loader2, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const StarRating = ({
  rating,
  setRating,
}: {
  rating: number;
  setRating: (rating: number) => void;
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="w-full flex justify-center items-center ">
      {[1, 2, 3, 4, 5].map((star) => (
        <Button
          key={star}
          variant="ghost"
          className={`p-0 w-10 transition-colors hover:text-yellow-400 hover:bg-yellow-50 group `}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
        >
          <Star
            className={`"h-10 w-10 size-20 ${
              star <= (hoverRating || rating)
                ? "fill-current text-yellow-400"
                : "text-gray-300 hover:bg-yellow-50"
            }`}
          />
        </Button>
      ))}
    </div>
  );
};

export default function ProductReviewDialog({
  title,
  ratingType,
  Id,
  userId,
  userName,
  className,
}: {
  title: string;
  ratingType: "user" | "product";
  Id: string;
  userId: string;
  userName?: string;
  className?: string;
}) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    try {
      setIsLoading(true);
      if (ratingType === "product") {
        axios
          .post("/api/product/rating", {
            userId: userId,
            productId: Id,
            userName: userName,
            comment: review,
            rating,
          })
          .then((res) => {
            setIsLoading(false);
            console.log(res.data.Data);
            router.refresh();
            toast.success(`${rating} Star Review Submitted Successfully`);
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(err.response.data);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={`font-medium text-base ${className}`}
          variant="outline"
        >
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>
            Share your thoughts and rate your experience.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-center">
            <StarRating rating={rating} setRating={setRating} />
          </div>
          <Textarea
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={4}
          />
        </div>
        <DialogFooter>
          <Button
            disabled={isLoading}
            className="w-full"
            onClick={handleSubmit}
          >
            {isLoading && <Loader2 className="mr-2 h-6 w-6 animate-spin" />}{" "}
            Submit Review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
