import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";
import PaymentButton from "./button";

const ActiveAccount = async (/* {
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
} */) => {
  // TODO: Make the backend functionality work properly
  /*   const { id } = await searchParams;
  const user = await db.user.findUnique({
    where: { id: id },
    select: { name: true, number: true },
  });

  const result = await db.idActiveSettings.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  }); */

  const benefits = [
    "Access All Product Details",
    "All Merchant Details Access",
    "Upload Your Own Product",
  ];

  return (
    <div className="max-w-2xl md:mx-auto mx-2 py-10 min-h-[calc(100vh-120px)]">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Active Your Account</h1>
        <p className="text-muted-foreground">Information and Benefits</p>
      </div>
      <div className=" mx-auto mt-6 space-y-2 font-semibold ">
        <div className="space-y-2">
          <ol>
            {benefits.map((benefit, index) => (
              <li key={index} className="text-muted-foreground flex gap-3">
                <CheckCircle2 size={20} /> {benefit}
              </li>
            ))}
          </ol>
        </div>
        <div className="flex justify-between items-center gap-2">
          <p className="text-muted-foreground">Name</p>
          <p className="text-blue-600">user Name</p>
        </div>
        <div className="flex justify-between items-center gap-2">
          <p className="text-muted-foreground">Number</p>
          <p className="text-blue-600">User Number</p>
        </div>
        <Separator />
        <div className="flex justify-between items-center gap-2">
          <p className="text-muted-foreground">Activation Charge</p>
          <p className="text-blue-600">
            {Intl.NumberFormat("bn-BD", {
              style: "currency",
              currency: "BDT",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(299)}
          </p>
        </div>
      </div>
      <PaymentButton />
    </div>
  );
};
export default ActiveAccount;
