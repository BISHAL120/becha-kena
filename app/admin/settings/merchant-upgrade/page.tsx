import { Separator } from "@/components/ui/separator";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import db from "@/prisma/db";
import AllHistoryTable from "./comonents/allHistory";

const History = async () => {
  const history = await db.merchantSettings.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto py-5">
      <div className="mb-1 flex justify-between items-center">
        <div className="">
          <div className="text-3xl font-semibold">
            History ({history.length})
          </div>
          <div className="text-base text-gray-600 font-semibold">
            Merchant Account Activation Pricing history
          </div>
        </div>
        <div>
          <Link href="/admin/settings/merchant-upgrade/new">
            <Button size={"lg"}>
              <Plus /> Add New
            </Button>
          </Link>
        </div>
      </div>
      <Separator className="bg-slate-700" />
      <div>
        <AllHistoryTable initialData={history} />
      </div>
    </div>
  );
};

export default History;
