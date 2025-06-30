import { auth } from "@/auth";
import { BoostPackageSelection } from "@/components/dashboard/boosting/boost-package-selection";
import { notFound, redirect } from "next/navigation";

const BoostPackageSelectionPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return redirect("/login");
  }

  // Mock product data - replace with actual product query
  const products = [
    {
      id: "1",
      name: "Wireless Bluetooth Headphones",
      price: 89.99,
      image: "/placeholder.svg?height=200&width=200",
      category: "Electronics",
      stock: 25,
      sales: 145,
      isActive: true,
      description: "High-quality wireless headphones with noise cancellation",
    },
    {
      id: "2",
      name: "Smart Fitness Watch",
      price: 199.99,
      image: "/placeholder.svg?height=200&width=200",
      category: "Electronics",
      stock: 12,
      sales: 89,
      isActive: true,
      description: "Advanced fitness tracking with heart rate monitor",
    },
    {
      id: "3",
      name: "Premium Phone Case",
      price: 24.99,
      image: "/placeholder.svg?height=200&width=200",
      category: "Accessories",
      stock: 50,
      sales: 234,
      isActive: true,
      description: "Durable protection with elegant design",
    },
  ];

  const product = products.find((p) => p.id === productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex min-h-screen w-full">
      <BoostPackageSelection product={product} user={user} />
    </div>
  );
};

export default BoostPackageSelectionPage;
