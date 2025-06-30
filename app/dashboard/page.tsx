import { auth } from "@/auth";
import { DashboardContent } from "@/components/dashboard/components/dashboard-content";
import db from "@/prisma/db";
// import { Merchant } from "@/components/merchant/types/merchant";
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

  if (!user || !user.id) {
    return redirect("/login");
  }

  const findUser = await db.user.findUnique({
    where: {
      id: user?.id,
    },
    select: {
      id: true,
      idDeactivationDate: true,
      role: true,
      isActive: true,
      interested: true,
      merchantDeactivationDate: true,
      saveMerchant: true,
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
      businessCategory: true,
      shopName: true,
      whatsAppNumber: true,
      productCount: true,
      createdAt: true,
    },
  });

  const Categories = await db.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  // Mock data for additional dashboard features

  /*   const findUser = await db.user.findUnique({
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
  }); */

  /*   const savedMerchants = await db.user.findMany({
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
  }); */

  // const Categories = await db.category.findMany();

  const UserObj = {
    id: user.id,
    name: user.name,
    image: user.image,
  };

  return (
    <DashboardContent
      user={UserObj}
      findUser={findUser}
      savedMerchants={savedMerchants}
      categories={Categories}
      um={um}
    />
  );
};

export default Dashboard;
