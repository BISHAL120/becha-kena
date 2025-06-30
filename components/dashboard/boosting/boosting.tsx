import { auth } from "@/auth";

import { redirect } from "next/navigation";

const BoostingPage = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return redirect("/login");
  }

  // Mock products data - replace with actual product query
  //   const products = [
  //     {
  //       id: "1",
  //       name: "Wireless Bluetooth Headphones",
  //       price: 89.99,
  //       image: "/placeholder.svg?height=200&width=200",
  //       category: "Electronics",
  //       stock: 25,
  //       sales: 145,
  //       isActive: true,
  //       currentBoost: null,
  //     },
  //     {
  //       id: "2",
  //       name: "Smart Fitness Watch",
  //       price: 199.99,
  //       image: "/placeholder.svg?height=200&width=200",
  //       category: "Electronics",
  //       stock: 12,
  //       sales: 89,
  //       isActive: true,
  //       currentBoost: {
  //         type: "standard",
  //         daysLeft: 3,
  //         expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  //       },
  //     },
  //     {
  //       id: "3",
  //       name: "Premium Phone Case",
  //       price: 24.99,
  //       image: "/placeholder.svg?height=200&width=200",
  //       category: "Accessories",
  //       stock: 50,
  //       sales: 234,
  //       isActive: true,
  //       currentBoost: null,
  //     },
  //     {
  //       id: "4",
  //       name: "Wireless Charging Pad",
  //       price: 39.99,
  //       image: "/placeholder.svg?height=200&width=200",
  //       category: "Electronics",
  //       stock: 18,
  //       sales: 67,
  //       isActive: true,
  //       currentBoost: {
  //         type: "premium",
  //         daysLeft: 8,
  //         expiresAt: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
  //       },
  //     },
  //     {
  //       id: "5",
  //       name: "Bluetooth Speaker",
  //       price: 79.99,
  //       image: "/placeholder.svg?height=200&width=200",
  //       category: "Electronics",
  //       stock: 8,
  //       sales: 156,
  //       isActive: true,
  //       currentBoost: null,
  //     },
  //     {
  //       id: "6",
  //       name: "USB-C Cable",
  //       price: 12.99,
  //       image: "/placeholder.svg?height=200&width=200",
  //       category: "Accessories",
  //       stock: 100,
  //       sales: 89,
  //       isActive: true,
  //       currentBoost: null,
  //     },
  //   ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="text-center space-y-6 max-w-2xl">
        <div className="relative w-64 h-64 mx-auto">
          <svg
            className="absolute animate-bounce"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="#4F46E5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 16V12"
              stroke="#4F46E5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 8H12.01"
              stroke="#4F46E5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-gray-900">Coming Soon!</h1>
        <p className="text-xl text-gray-600">
          We&apos;re working hard to bring you an amazing boosting experience.
          Stay tuned for updates!
        </p>

        <a
          href="/dashboard"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Dashboard
        </a>
      </div>
    </div>
  );
};

export default BoostingPage;

{
  /* <BoostingContent products={products} user={user} />; */
}
