import { Separator } from "@/components/ui/separator";
import React from "react";
import AllPartnersTable from "./comonents/allPartners";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import db from "@/prisma/db";

const Partners = async () => {
  const allPartners = await db.partner.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto py-5">
      <div className="mb-1 flex justify-between items-center">
        <div className="">
          <div className="text-3xl font-semibold">
            Partners ({allPartners.length})
          </div>
          <div className="text-base text-gray-600 font-semibold">
            Manage Partners for Your Store
          </div>
        </div>
        <div>
          <Link href="/admin/partners/new">
            <Button size={"lg"}>
              <Plus /> Add New
            </Button>
          </Link>
        </div>
      </div>
      <Separator className="bg-slate-700" />
      <div>
        <AllPartnersTable initialData={allPartners} />
      </div>
    </div>
  );
};

export default Partners;
