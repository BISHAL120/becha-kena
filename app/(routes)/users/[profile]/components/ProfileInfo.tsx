import { Button } from "@/components/ui/button";
import { Building2, MapPin, Phone, Star, Verified } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Session } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import ProfileEdit from "./profileEdit";

interface Props {
  userData: {
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
  rating: string;
  ratingCount: number | undefined;
  productCount: number | undefined;
  lastLogin: Session | null;
}

export function ProfileInfo({
  userData,
  rating,
  ratingCount,
  productCount,
  lastLogin,
}: Props) {
  const stars = rating.split(".");
  const starLength = Number(stars[0]) + (Number(stars[1]) > 5 ? 1 : 0);
  return (
    <div className="space-y-6">
      <div className="">
        <div className="relative flex flex-col items-center md:items-start">
          {/* Banner Image */}
          <div className="w-full h-[250px] md:h-[400px] rounded-md overflow-hidden mb-4 dark:border dark:border-slate-300 flex justify-center items-center shadow-md">
            <Image
              src={userData?.bannerImage || "/demoImage/placeholder.svg"}
              alt="Preview"
              width={400}
              height={250}
              quality={90}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute left-5 -bottom-1/3 -translate-y-1/2">
            <div className="relative">
              <Image
                src={userData?.image || "/demoImage/placeholder.svg"}
                width={128}
                height={128}
                alt="Kevin Smith"
                quality={95}
                className=" ring ring-white w-32 md:w-48 h-32 md:h-48 rounded-full object-cover"
              />
              {userData?.emailVerified && (
                <Verified
                  className="hidden md:flex absolute top-3 right-3 size-7 md:size-10"
                  fill="blue"
                  stroke="white"
                />
              )}
              <Badge
                className="flex md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 bg-background"
                variant="outline"
              >
                Verified
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center mr-5 md:mr-0 mt-5 -mb-5">
          <ProfileEdit initialData={userData} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6 px-2 md:px-0">
        <div className="w-full md:w-1/3 space-y-4 mt-5 bg-gray-300 dark:bg-slate-900 dark:text-white rounded-md p-4 md:p-6 shadow-md dark:shadow-blue-800">
          <div className=" text-center md:text-left">
            <div className="flex items-center gap-3 text-3xl md:text-4xl font-semibold">
              {" "}
              <Building2 />
              {userData?.shopName}
            </div>
            <div className="w-full text-muted-foreground mt-1">
              <span>Name:</span>{" "}
              <span className="text-primary">{userData?.name}</span>
            </div>
          </div>
          <div className="space-y-1 md:mx-0 justify-between text-sm ">
            <div className="flex items-center gap-3">
              <div className="min-w-[50px] text-muted-foreground">Role:</div>
              <div className="font-semibold">
                {userData?.role.map((role) => (
                  <span key={role} className="mr-2">
                    {role}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="min-w-[50px] text-muted-foreground">total:</div>
              <div className="font-semibold">{productCount} Products</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="min-w-[50px] text-muted-foreground">Joined:</div>
              <div className="font-semibold">
                {userData?.createdAt.toDateString()}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="min-w-[50px] text-muted-foreground">Login:</div>
              <div className="font-semibold">
                {formatDistanceToNow(lastLogin?.createdAt || new Date(), {
                  addSuffix: true,
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 space-y-5 mt-5 bg-gray-300 dark:bg-slate-900 dark:text-white rounded-md p-4 md:p-6 shadow-md dark:shadow-blue-800">
          <div className="space-y-2 mx-5 md:mx-0 ">
            <div>
              <h2 className="text-2xl font-semibold">Contact Information</h2>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span>{userData?.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>{userData?.number}</span>
            </div>
          </div>
          <Button className="w-full text-center px-3 py-2 bg-[#25d366]">
            <a href={`https://wa.me/+88${userData?.number}`} target="_blank">
              WhatsApp
            </a>
          </Button>
        </div>
        <div className="w-full flex flex-col justify-between md:w-1/3 space-y-5 mt-5 bg-gray-300 dark:bg-slate-900 dark:text-white rounded-md p-4 md:p-6 shadow-md dark:shadow-blue-800">
          <div className="space-y-2 mx-5 md:mx-0">
            <div>
              <div>
                <h2 className="text-2xl font-semibold">Review & Ratings</h2>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold">
                Total Review ({ratingCount})
              </p>
              <p className="text-sm font-semibold">
                {isNaN(Number(rating)) ? 0 : rating}
              </p>
            </div>
            <div className="flex items-center gap-2 ">
              {Array.from({ length: starLength }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-yellow-300 stroke-yellow-500"
                />
              ))}
              {starLength < 5 && <Star className="w-4 h-4 " />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
