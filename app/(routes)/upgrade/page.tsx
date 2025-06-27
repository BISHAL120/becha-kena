import { Separator } from "@/components/ui/separator";
import PaymentButton from "./button";
import db from "@/prisma/db";

const UpgradeToMerchant = async ({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) => {
  const { id } = await searchParams;
  const user = await db.user.findUnique({
    where: { id: id },
    select: { name: true, number: true },
  });

  const result = await db.merchantSettings.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="max-w-2xl md:mx-auto mx-2 py-10">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Upgrade To Merchant</h1>
        <p className="text-muted-foreground">Information and Benefits</p>
      </div>
      <div className=" mx-auto mt-6 space-y-3 font-semibold ">
        <div className="flex justify-between items-center gap-2">
          <p className="text-muted-foreground">Name:</p>
          <p className="text-blue-600">{user?.name}</p>
        </div>
        <div className="flex justify-between items-center gap-2">
          <p className="text-muted-foreground">Number:</p>
          <p className="text-blue-600">{user?.number}</p>
        </div>
        <div className="flex justify-between items-center gap-2">
          <p className="text-muted-foreground">Product Limit:</p>
          <p className="text-blue-600">{result?.productLimit}</p>
        </div>
        <Separator />
        <div className="flex justify-between items-center gap-2">
          <p className="text-muted-foreground">Total Price:</p>
          <p className="text-blue-600">
            {Intl.NumberFormat("bn-BD", {
              style: "currency",
              currency: "BDT",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(result?.price || 0)}
          </p>
        </div>
      </div>
      <PaymentButton id={id} />
    </div>
  );
};
export default UpgradeToMerchant;
