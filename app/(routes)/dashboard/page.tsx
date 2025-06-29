import { auth } from "@/auth";
import { MerchantCard } from "@/components/client/merchantCard";
// import { Merchant } from "@/components/merchant/types/merchant";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import db from "@/prisma/db";
import {
  Award,
  BellDot,
  Box,
  ChartNoAxesCombinedIcon,
  Container,
  EditIcon,
  RssIcon,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const Dashboard = async ({
  searchParams,
}: {
  searchParams: Promise<{
    um: string;
  }>;
}) => {
  const { um = "aa" } = await searchParams;
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return redirect("/login");
  }

  const findUser = await db.user.findUnique({
    where: {
      id: user?.id,
    },
    select: {
      id: true,
      saveMerchant: true,
      role: true,
      interested: true,
      isActive: true,
      idDeactivationDate: true,
      merchantDeactivationDate: true,
    },
  });

  const savedMerchants = await db.user.findMany({
    where: {
      id: {
        in: findUser?.saveMerchant,
      },
    },
    select: {
      id: true,
      name: true,
      ratingCount: true,
      ratingTotal: true,
      address: true,
      number: true,
      image: true,
      bannerImage: true,
    },
  });

  const Categories = await db.category.findMany();

  return (
    <div>
      <div className="py-1 mt-4 rounded-md bg-indigo-50 border-indigo-500 flex items-center justify-center border">
        {findUser?.isActive && findUser.idDeactivationDate >= new Date() ? (
          <p className="py-2 px-4 font-semibold text-base">
            {findUser.isActive ? (
              <>
                <span>Your id is </span>
                <span className="text-indigo-400 font-semibold">
                  activated,
                </span>
              </>
            ) : (
              "Active Your Id, "
            )}{" "}
            You are{" "}
            {findUser.role.join(", ") + (findUser.role.length > 1 ? "," : "")}
          </p>
        ) : (
          <Link
            href={`/active?id=${user?.id}`}
            className="bg-indigo-500 px-4 py-2 text-white rounded-lg"
          >
            Click Here to activate your account
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-2 py-3">
        <Link className="" href={`/users/${user?.id}`}>
          <Card className="w-full h-full max-w-sm mx-auto dark:bg-background shadow-md dark:shadow-white/20">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{user?.name}</h3>
                <div>
                  <Avatar>
                    <AvatarImage
                      className="object-cover"
                      src={`${user?.image}`}
                    />
                    <AvatarFallback>{user?.name?.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              View Profile Details
            </CardContent>
          </Card>
        </Link>
        <Link className="" href={`/users/edit`}>
          <Card className="w-full h-fit max-w-sm mx-auto dark:bg-background shadow-md dark:shadow-white/20">
            <CardHeader className="pb-4 h-[80px]">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Edit Your Profile</h3>
                <div>
                  <EditIcon className="h-6 w-6" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Click here to edit your profile
            </CardContent>
          </Card>
        </Link>
        <Link className="" href={`/dashboard/boosting`}>
          <Card className="w-full h-fit max-w-sm mx-auto dark:bg-background shadow-md dark:shadow-white/20">
            <CardHeader className="pb-4 h-[80px]">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Boosting</h3>
                <div>
                  <ChartNoAxesCombinedIcon className="h-6 w-6" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Boost Your Product in Facebook
            </CardContent>
          </Card>
        </Link>
        <Link className="" href={`/dashboard/products?page=1&per_page=10`}>
          <Card className="w-full h-fit max-w-sm mx-auto dark:bg-background shadow-md dark:shadow-white/20">
            <CardHeader className="pb-4 h-[80px]">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">All Product</h3>
                <div>
                  <Container className="h-6 w-6" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Open all Listed Products
            </CardContent>
          </Card>
        </Link>
        {findUser?.isActive && findUser.idDeactivationDate >= new Date() ? (
          <Link
            href={`${
              findUser?.role.includes("MERCHANT") &&
              findUser.isActive &&
              findUser.merchantDeactivationDate >= new Date()
                ? "#"
                : `/upgrade?id=${user?.id}`
            }`}
          >
            <div
              className={`" ${
                um === "idActive"
                  ? " p-0.5 border  rounded-[15px] bg-gradient-to-r from-[#5568f6] to-[#50f32f]"
                  : ""
              }`}
            >
              <Card className="w-full h-fit max-w-sm mx-auto dark:bg-background shadow-md dark:shadow-white/20">
                <CardHeader className="pb-4 h-[80px]">
                  <div className="flex justify-between items-center">
                    <h3
                      className={`text-lg font-semibold ${
                        um === "idActive" ? "gradient-text2" : ""
                      }`}
                    >
                      {findUser?.role.includes("MERCHANT") &&
                      findUser.isActive &&
                      findUser.merchantDeactivationDate >= new Date()
                        ? "Active Merchant"
                        : "Upgrade to Merchant"}
                    </h3>
                    <div>
                      <RssIcon className="h-6 w-6" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent
                  className={`text-muted-foreground ${
                    um === "idActive" ? "gradient-text" : ""
                  }`}
                >
                  {findUser?.role.includes("MERCHANT") &&
                  findUser.isActive &&
                  findUser.merchantDeactivationDate >= new Date()
                    ? "Merchant ID is Activated"
                    : "Upgrade to Merchant"}
                </CardContent>
              </Card>
            </div>
          </Link>
        ) : (
          <Link href={`/active?id=${user?.id}`}>
            <div
              className={`${
                um === "idActive"
                  ? " p-0.5 border  rounded-[15px] bg-gradient-to-r from-[#5568f6] to-[#50f32f]"
                  : ""
              }`}
            >
              <Card
                className={`w-full h-fit max-w-sm mx-auto dark:bg-background shadow-md dark:shadow-white/20`}
              >
                <CardHeader className="pb-4 h-[80px]">
                  <div className="flex justify-between items-center">
                    <h3
                      className={`text-lg font-semibold ${
                        um === "idActive" ? "gradient-text2" : ""
                      }`}
                    >
                      {findUser?.role.includes("MERCHANT") &&
                      findUser.isActive &&
                      findUser.idDeactivationDate >= new Date()
                        ? "Account Activated"
                        : "Activate Id"}
                    </h3>
                    <div>
                      <RssIcon className="h-6 w-6" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent
                  className={`text-muted-foreground ${
                    um === "idActive" ? "gradient-text" : ""
                  }`}
                >
                  {findUser?.role.includes("MERCHANT") &&
                  findUser.isActive &&
                  findUser.idDeactivationDate >= new Date()
                    ? "You are a Merchant Now"
                    : "Active Your Account"}
                </CardContent>
              </Card>
            </div>
          </Link>
        )}
        <Link className="" href={`/dashboard/notification`}>
          <Card className="w-full h-fit max-w-sm mx-auto dark:bg-background shadow-md dark:shadow-white/20">
            <CardHeader className="pb-4 h-[80px]">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Notification</h3>
                <div>
                  <BellDot className="h-6 w-6" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              View All Notification and Updates
            </CardContent>
          </Card>
        </Link>
        <Link className="" href={`/dashboard/orders`}>
          <Card className="w-full h-fit max-w-sm mx-auto dark:bg-background shadow-md dark:shadow-white/20">
            <CardHeader className="pb-4 h-[80px]">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Orders</h3>
                <div>
                  <Box className="h-6 w-6" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              View All Your Orders
            </CardContent>
          </Card>
        </Link>
        <Link
          className={` ${
            um === "idActive"
              ? ""
              : "p-0.5 border rounded-[15px] bg-gradient-to-r from-blue-600 via-pink-300 to-yellow-500"
          }`}
          href={`https://wa.me/+8801623939834?text=আমি আমার ব্যবসা জন্য একটি ওয়েবসাইট বানাতে চাচ্ছি। এই বিসয়ে আরও জানতে চাচ্ছি।`}
          target="_blank"
        >
          <Card className=" dark:bg-background shadow-md dark:shadow-white/20">
            <CardHeader className="">
              <div className="flex justify-between items-center">
                <h3
                  className={`text-lg font-semibold ${
                    um === "idActive" ? "" : "gradient-text2"
                  }`}
                >
                  Order Website
                </h3>
                <div>
                  <Award className="h-6 w-6" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-5">
              <p
                className={`${
                  um === "idActive" ? "" : "gradient-text"
                } text-base font-semibold"`}
              >
                Boost Your Sell&apos;s and automate your Business
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
      <Separator />
      <div className="flex justify-between mt-10 mb-5">
        <h2 className="text-2xl font-semibold text-center w-full">
          Interested In
        </h2>
      </div>
      {!findUser?.interested ||
        (findUser?.interested.length === 0 && (
          <div className="text-center text-lg font-semibold text-gray-500">
            You didn&apos;t select any interest yet.
          </div>
        ))}
      <div className="flex items-center justify-center py-2 gap-2 flex-wrap">
        {findUser?.interested.map((interest, i) => (
          <div key={i} className="flex items-center justify-between">
            <Badge
              className="py-1 px-4 rounded-2xl text-sm font-semibold"
              variant={"secondary"}
            >
              {Categories?.find((c) => c.id === interest)?.name}
            </Badge>
          </div>
        ))}
      </div>
      <div className="text-2xl font-semibold mt-32 mb-4 text-center">
        Saved Merchants
      </div>
      {!findUser?.saveMerchant ||
        (findUser?.saveMerchant.length === 0 && (
          <div className="text-center text-lg font-semibold text-gray-500">
            {" "}
            You didn&apos;t save any Merchant yet.
          </div>
        ))}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {savedMerchants.map((merchant, idx) => (
          <MerchantCard key={idx} merchant={merchant} current={findUser} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
