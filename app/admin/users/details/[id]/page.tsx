import MerchantDetails from "@/components/admin/aceternity Ui/users/merchantDetails";
import db from "@/prisma/db";
import React from "react";

const Merchant = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const getMerchant = await db.user.findUnique({
    where: {
      id: id,
    },
    select: {
      ratingCount: true,
      ratingTotal: true,
      image: true,
      bannerImage: true,
      name: true,
      shopName: true,
      businessCategory: true,
      companySize: true,
      address: true,
      division: true,
      district: true,
      number: true,
      whatsAppNumber: true,
      website: true,
      fbAccount: true,
      fbBnsPage: true,
      instagram: true,
      youtube: true,
      tikTok: true,
      groupLink: true,
      isActive: true,
      role: true,
      productLimit: true,
      createdAt: true,
    },
  });

  return (
    <div className="">
      <MerchantDetails merchant={getMerchant} />
    </div>
  );
};

export default Merchant;
