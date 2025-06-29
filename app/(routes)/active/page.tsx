import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  getAllBenefits,
  GetIdActivationSettings,
} from "@/lib/data-layer/client/activePage";
import { getUserById } from "@/lib/data-layer/client/DataLayer";
import { CheckCircle2 } from "lucide-react";
import PaymentButton from "./button";

const ActiveAccount = async ({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) => {
  const { id } = await searchParams;

  if (!id) {
    return (
      <div className="min-h-[calc(100vh-120px)] flex items-center justify-center">
        <div className="text-center space-y-4">
          <svg
            className="w-24 h-24 mx-auto text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-700">User Not Found</h2>
          <p className="text-gray-500 max-w-md">
            We couldn&apos;t find a user matching ID: {id}. This could be due to
            an invalid ID or the user may have been deleted.
          </p>
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Please check the following:</p>
            <ul className="text-sm text-gray-500 list-disc list-inside">
              <li>Verify the user ID is correct</li>
              <li>Ensure the user exists in the system</li>
              <li>Check if you have proper access permissions</li>
            </ul>
          </div>
          <a
            href="/dashboard"
            className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Return to Dashboard
          </a>
        </div>
      </div>
    );
  }

  const user = await getUserById(id);
  const settings = await GetIdActivationSettings();
  const benefits = await getAllBenefits();

  return (
    <div className="max-w-2xl md:mx-auto mx-2 py-10 min-h-[calc(100vh-120px)]">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Active Your Account</h1>
        <p className="text-muted-foreground">Information and Benefits</p>
      </div>
      <div className="mx-auto mt-6 space-y-2 font-semibold">
        <div className="space-y-2">
          <ol>
            {benefits.map((benefit, index) => (
              <li key={index} className="text-muted-foreground flex gap-3">
                <CheckCircle2 size={20} /> {benefit.title}
              </li>
            ))}
          </ol>
        </div>
        <div className="flex justify-between items-center gap-2">
          <p className="text-muted-foreground">Name</p>
          <p className="text-blue-600">{user?.name}</p>
        </div>
        <div className="flex justify-between items-center gap-2">
          <p className="text-muted-foreground">Email</p>
          <p className="text-blue-600">{user?.email}</p>
        </div>
        <div className="flex justify-between items-center gap-2">
          <p className="text-muted-foreground">Number</p>
          {user?.number ? (
            <div className="flex items-center gap-2">
              <Input
                type="tel"
                defaultValue={user.number}
                className="w-48"
                disabled
              />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* <Input
                type="tel"
                placeholder="Enter your number"
                className="w-48"
              /> */}
              <a
                href={`/users/edit`}
                className="text-sm px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add Number
              </a>
            </div>
          )}
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
            }).format(settings?.price || 399)}
          </p>
        </div>
      </div>
      <PaymentButton id={id} disabled={!user?.number} />
    </div>
  );
};

export default ActiveAccount;
