"use client";

// TODO: Try to make it server components

import { Review } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { CircleChevronRight } from "lucide-react";
import { StarRating } from "./star-rating";
import { Card } from "../../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

const AllReview = ({ allReview }: { allReview: Review[] }) => {
  return (
    <div>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-5">
        {allReview.map((review) => (
          <Card key={review.id} className="p-4 h-full">
            <div className="flex items-start h-full gap-4">
              <div className="flex-1 h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center gap-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{review.userName}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground ">
                        {`${formatDistanceToNow(review.createdAt)} ago`}
                      </p>
                    </div>
                    <StarRating
                      className="justify-end"
                      rating={review.rating}
                    />
                  </div>

                  <p className="text-sm text-muted-foreground pt-3 line-clamp-3">
                    {review.comment}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-6">
                  <Dialog>
                    <DialogTrigger className="flex justify-center items-center gap-2 border text-sm font-semibold rounded-md px-2 py-1.5">
                      <p className="mt-0.5">View More</p>
                      <CircleChevronRight size={16} />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-lg pb-3">
                          Review Detail View.
                        </DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllReview;
