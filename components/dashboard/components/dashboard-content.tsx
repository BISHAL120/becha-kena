import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { MerchantCard } from "@/components/client/merchantCard";
import {
  Award,
  Package,
  ShoppingCart,
  DollarSign,
  Clock,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import Link from "next/link";
import { getProductCount } from "@/lib/data-layer/dashboard/dashboard";

interface DashboardContentProps {
  user: {
    id: string;
    name: string | null | undefined;
    image: string | null | undefined;
  };
  findUser: {
    id: string;
    idDeactivationDate: Date;
    merchantDeactivationDate: Date;
    saveMerchant: string[];
    role: string[];
    interested: string[];
    isActive: boolean;
  } | null;
  savedMerchants: {
    number: string | null;
    name: string;
    id: string;
    whatsAppNumber: string | null;
    shopName: string | null;
    address: string | null;
    businessCategory: string | null;
    ratingCount: number;
    ratingTotal: number;
    productCount: number;
    createdAt: Date;
    image: string | null;
    bannerImage: string | null;
  }[];
  categories: {
    id: string;
    name: string;
  }[];
  um: string;
}

export async function DashboardContent({
  user,
  findUser,
  savedMerchants,
  categories,
  um,
}: DashboardContentProps) {
  const isActive =
    findUser?.isActive && findUser.idDeactivationDate >= new Date();
  const isMerchant =
    findUser?.role.includes("MERCHANT") &&
    findUser.isActive &&
    findUser.merchantDeactivationDate >= new Date();

  const productCount = await getProductCount(user?.id);
  const dashboardStats = {
    totalProducts: 156,
    totalOrders: 89,
    totalRevenue: 12450,
    pendingOrders: 12,
    recentOrders: [
      {
        id: "ORD-001",
        customer: "John Doe",
        amount: 299.99,
        status: "pending",
      },
      {
        id: "ORD-002",
        customer: "Jane Smith",
        amount: 149.5,
        status: "completed",
      },
      {
        id: "ORD-003",
        customer: "Mike Johnson",
        amount: 89.99,
        status: "processing",
      },
    ],
    topProducts: [
      { name: "Wireless Headphones", sales: 45, revenue: 2250 },
      { name: "Smart Watch", sales: 32, revenue: 1920 },
      { name: "Phone Case", sales: 28, revenue: 560 },
    ],
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Account Status Banner */}
      <div className="rounded-lg border bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
              <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold">
                {isActive ? "Account Active" : "Account Activation Required"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isActive
                  ? `You are ${findUser.role.join(", ")}`
                  : "Activate your account to access all features"}
              </p>
            </div>
          </div>
          {!isActive && (
            <Button asChild>
              <Link href={`/active?id=${user?.id}`}>Activate Now</Link>
            </Button>
          )}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productCount}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" />
                +12% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardStats.totalOrders}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" />
                +8% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${dashboardStats.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" />
                +15% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Orders
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardStats.pendingOrders}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600 flex items-center gap-1">
                <ArrowDownRight className="h-3 w-3" />
                -2% from last month
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link href={`/users/profile`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">View Profile</CardTitle>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.image || "/placeholder.svg"} />
                  <AvatarFallback>{user?.name?.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>Manage your profile details</CardDescription>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link href="/dashboard/products?page=1&per_page=10">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">All Products</CardTitle>
                <Package className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>Manage your product inventory</CardDescription>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link href="/dashboard/orders">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Orders</CardTitle>
                <ShoppingCart className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>Track and manage orders</CardDescription>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link href="/dashboard/boosting">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Boost Products</CardTitle>
                <BarChart3 className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>Promote on social media</CardDescription>
            </CardContent>
          </Link>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders from your customers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboardStats.recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {order.customer.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{order.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.customer}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">${order.amount}</p>
                  <Badge
                    variant={
                      order.status === "completed" ? "default" : "secondary"
                    }
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>
              Best performing products this month
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboardStats.topProducts.map((product, index: number) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    ${product.revenue}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Progress
                    value={(product.sales / 50) * 100}
                    className="flex-1"
                  />
                  <span className="text-xs text-muted-foreground">
                    {product.sales} sales
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Merchant Upgrade Section */}
      {isActive && (
        <Card
          className={
            um === "idActive"
              ? "border-2 border-gradient-to-r from-blue-500 to-purple-500"
              : ""
          }
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle
                  className={
                    um === "idActive"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                      : ""
                  }
                >
                  {isMerchant
                    ? "Merchant Account Active"
                    : "Upgrade to Merchant"}
                </CardTitle>
                <CardDescription>
                  {isMerchant
                    ? "You have full access to merchant features"
                    : "Unlock advanced selling features and analytics"}
                </CardDescription>
              </div>
              <Award className="h-8 w-8 text-yellow-500" />
            </div>
          </CardHeader>
          {!isMerchant && (
            <CardContent>
              <Button asChild className="w-full">
                <Link href={`/upgrade?id=${user?.id}`}>Upgrade Now</Link>
              </Button>
            </CardContent>
          )}
        </Card>
      )}

      {/* Interests Section */}
      <Card>
        <CardHeader>
          <CardTitle>Your Interests</CardTitle>
          <CardDescription>
            Categories you&apos;re interested in
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!findUser?.interested || findUser?.interested.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              You haven&apos;t selected any interests yet.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {findUser?.interested.map((interest: string, i: number) => (
                <Badge key={i} variant="secondary" className="px-3 py-1">
                  {categories?.find((c) => c.id === interest)?.name}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Saved Merchants */}
      <Card>
        <CardHeader>
          <CardTitle>Saved Merchants</CardTitle>
          <CardDescription>Merchants you&apos;ve bookmarked</CardDescription>
        </CardHeader>
        <CardContent>
          {!findUser?.saveMerchant || findUser?.saveMerchant.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              You haven&apos;t saved any merchants yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedMerchants.map((merchant, idx) => (
                <MerchantCard
                  key={idx}
                  merchant={merchant}
                  current={findUser}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Website Order CTA */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-2 border-dashed">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Order Your Business Website
              </CardTitle>
              <CardDescription className="text-base font-medium">
                Boost your sales and automate your business with a professional
                website
              </CardDescription>
            </div>
            <Award className="h-8 w-8 text-yellow-500" />
          </div>
        </CardHeader>
        <CardContent>
          <Button
            asChild
            size="lg"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Link
              href="https://wa.me/+8801623939834?text=আমি আমার ব্যবসা জন্য একটি ওয়েবসাইট বানাতে চাচ্ছি। এই বিসয়ে আরও জানতে চাচ্ছি।"
              target="_blank"
            >
              Contact Us on WhatsApp
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
