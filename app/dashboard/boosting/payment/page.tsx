import { auth } from "@/auth";
import { BoostPayment } from "@/components/dashboard/boosting/boost-payment";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";

const BoostPaymentPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    productId: string;
    package: string;
    duration: string;
    price: string;
  }>;
}) => {
  const {
    productId,
    package: packageType,
    duration,
    price,
  } = await searchParams;
  const session = await auth();
  const user = session?.user;

  if (!user || !productId || !packageType || !duration || !price) {
    return redirect("/dashboard/boosting");
  }

  // Mock product data - replace with actual product query
  const products = [
    {
      id: "1",
      name: "Wireless Bluetooth Headphones",
      price: 89.99,
      image: "/placeholder.svg?height=200&width=200",
      category: "Electronics",
      description: "High-quality wireless headphones with noise cancellation",
    },
    {
      id: "2",
      name: "Smart Fitness Watch",
      price: 199.99,
      image: "/placeholder.svg?height=200&width=200",
      category: "Electronics",
      description: "Advanced fitness tracking with heart rate monitor",
    },
    {
      id: "3",
      name: "Premium Phone Case",
      price: 24.99,
      image: "/placeholder.svg?height=200&width=200",
      category: "Accessories",
      description: "Durable protection with elegant design",
    },
  ];

  const product = products.find((p) => p.id === productId);

  if (!product) {
    notFound();
  }

  const boostOrder = {
    productId,
    product,
    packageType: packageType as "standard" | "premium",
    duration: Number.parseInt(duration) as 3 | 7 | 15,
    price: Number.parseFloat(price),
    orderId: `BOOST-${Date.now()}`,
    createdAt: new Date(),
  };

  return (
    <div className="flex min-h-screen w-full">
      <BoostPayment boostOrder={boostOrder} user={user} />
    </div>
  );
};

export default BoostPaymentPage;
