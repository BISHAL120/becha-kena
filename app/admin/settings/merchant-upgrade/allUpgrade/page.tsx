import { Separator } from "@/components/ui/separator";
import db from "@/prisma/db";
import MerchantUpgradeTable from "./comonents/allActivation";

const AllMerchantUpgrade = async () => {
  const allUpgrade = await db.newMerchants.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto py-5">
      <div className="mb-1 flex justify-between items-center">
        <div className="">
          <div className="text-3xl font-semibold">
            Merchant Upgrade ({allUpgrade.length})
          </div>
          <div className="text-base text-gray-600 font-semibold">
            All Merchant Upgrade List & Details
          </div>
        </div>
      </div>
      <Separator className="bg-slate-700" />
      <div>
        <MerchantUpgradeTable initialData={allUpgrade} />
      </div>
    </div>
  );
};

export default AllMerchantUpgrade;
