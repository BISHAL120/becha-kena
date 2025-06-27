import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import {
  Building2,
  Calendar,
  Facebook,
  Globe,
  Instagram,
  Link as LinkIcon,
  MapPin,
  Phone,
  ShoppingBag,
  Star,
  Store,
  BookIcon as TiktokIcon,
  Users,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface MerchantDetailsProps {
  number: string | null;
  name: string;
  shopName: string | null;
  address: string | null;
  businessCategory: string | null;
  division: string | null;
  district: string | null;
  whatsAppNumber: string | null;
  website: string | null;
  fbAccount: string | null;
  fbBnsPage: string | null;
  image: string | null;
  instagram: string | null;
  companySize: string | null;
  bannerImage: string | null;
  youtube: string | null;
  tikTok: string | null;
  groupLink: string | null;
  isActive: boolean;
  role: string[];
  ratingCount: number;
  ratingTotal: number;
  productLimit: number | null;
  createdAt: Date;
}

const MerchantDetails = ({
  merchant,
}: {
  merchant: MerchantDetailsProps | null;
}) => {
  if (!merchant)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>
          <div className="text-4xl text-center text-muted-foreground font-semibold">
            Merchant Not Found
          </div>
          <div className="text-center text-muted-foreground font-semibold">
            Please Double Check The Id
          </div>
        </div>
      </div>
    );

  const averageRating = merchant.ratingTotal / merchant.ratingCount;

  return (
    <div className="min-h-screen h-full bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Banner and Profile Section */}
        <div className="relative mb-8">
          <div className="h-64 w-full rounded-xl overflow-hidden">
            <Image
              src={
                merchant.bannerImage
                  ? merchant.bannerImage
                  : "/demoImage/placeholder.svg"
              }
              alt="Banner"
              quality={95}
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-16 left-8 flex items-end gap-6">
            <Avatar className="w-32 h-32 border-4 border-white">
              <AvatarImage
                src={
                  merchant.image ? merchant.image : "/demoImage/placeholder.svg"
                }
                alt={merchant.name}
              />
              <AvatarFallback>{merchant.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-900">
                {merchant.name}
              </h1>
              <p className="text-gray-600">{merchant.shopName}</p>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Business Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Store className="w-5 h-5 text-gray-500" />
                  <span>Category: {merchant.businessCategory}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-500" />
                  <span>Company Size: {merchant.companySize}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span>{merchant.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-gray-500" />
                  <span>
                    {merchant.district}, {merchant.division}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <span>Phone: {merchant.number}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <span>WhatsApp: {merchant.whatsAppNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-gray-500" />
                  <span>Website: {merchant.website}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Social Media</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  target={`${merchant.fbAccount ? "_blank" : ""}`}
                  href={merchant.fbAccount || "#"}
                  className="flex items-center gap-2 text-blue-600"
                >
                  <Facebook className="w-5 h-5" />
                  <span>Facebook Profile</span>
                </Link>
                <Link
                  target={`${merchant.fbBnsPage ? "_blank" : ""}`}
                  href={merchant.fbBnsPage || "#"}
                  className="flex items-center gap-2 text-blue-600"
                >
                  <Facebook className="w-5 h-5" />
                  <span>Business Page</span>
                </Link>
                <Link
                  target={`${merchant.instagram ? "_blank" : ""}`}
                  href={merchant.instagram || "#"}
                  className="flex items-center gap-2 text-pink-600"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Instagram</span>
                </Link>
                <Link
                  target={`${merchant.youtube ? "_blank" : ""}`}
                  href={merchant.youtube || "#"}
                  className="flex items-center gap-2 text-red-600"
                >
                  <Youtube className="w-5 h-5" />
                  <span>YouTube</span>
                </Link>

                <Link
                  target={`${merchant.tikTok ? "_blank" : ""}`}
                  href={merchant.tikTok || "#"}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <TiktokIcon className="w-5 h-5" />
                  <span>TikTok</span>
                </Link>
                <Link
                  target={`${merchant.groupLink ? "_blank" : ""}`}
                  href={merchant.groupLink || "#"}
                  className="flex items-center gap-2 text-blue-600"
                >
                  <LinkIcon className="w-5 h-5" />
                  <span>Group Link</span>
                </Link>
              </div>
            </Card>
          </div>

          {/* Side Info */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Account Status</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Status</span>
                  <Badge
                    variant={merchant.isActive ? "default" : "destructive"}
                  >
                    {merchant.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span>Role</span>
                  <Badge variant="secondary">
                    {merchant.role.map((role) => (
                      <span key={role} className="mr-2">
                        {role}
                      </span>
                    ))}
                  </Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span>Product Limit</span>
                  <Badge variant="outline">{merchant.productLimit}</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Ratings</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-lg font-semibold">
                    {averageRating.toFixed(1)}
                  </span>
                  <span className="text-gray-500">
                    ({merchant.ratingCount} reviews)
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Account Info</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p>{format(merchant.createdAt, "MMMM d, yyyy")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Products</p>
                    <p>{merchant.productLimit} items</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantDetails;
