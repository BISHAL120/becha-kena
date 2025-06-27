import { Separator } from "@/components/ui/separator";
import db from "@/prisma/db";
import AllActivationTable from "./comonents/allActivation";

const AllActivation = async () => {
  const allActivation = await db.newIdActive.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto py-5">
      <div className="mb-1 flex justify-between items-center">
        <div className="">
          <div className="text-3xl font-semibold">
            Activation ({allActivation.length})
          </div>
          <div className="text-base text-gray-600 font-semibold">
            All Account Activation History & Details
          </div>
        </div>
      </div>
      <Separator className="bg-slate-700" />
      <div>
        <AllActivationTable initialData={allActivation} />
      </div>
    </div>
  );
};

export default AllActivation;
