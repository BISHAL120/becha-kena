import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Star,
  Package,
  Users,
  Calendar,
  Facebook,
  Youtube,
  Instagram,
  Globe,
  Edit,
  Shield,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { User } from "@prisma/client";

interface ProfileProps {
  userData: (Omit<User, "password"> & {}) | null;
}

export default function ProfilePage({ userData }: ProfileProps) {
  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center max-w-md w-full">
          <div className="relative w-64 h-64 mx-auto mb-8">
            <svg
              className="w-full h-full text-gray-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.5 21h-11a4.5 4.5 0 01-4.5-4.5v-9A4.5 4.5 0 016.5 3h11a4.5 4.5 0 014.5 4.5v9a4.5 4.5 0 01-4.5 4.5z" />
              <circle cx="12" cy="8.5" r="2.5" />
              <path d="M15 14.5c1.66 0 3 1.34 3 3V20h-3M9 14.5c-1.66 0-3 1.34-3 3V20h3M12 11v9" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="animate-bounce">
                <svg
                  className="w-16 h-16 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Profile Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            We couldn&apos;t find the profile you&apos;re looking for. The user
            may have been deleted or is not available.
          </p>
          <div className="space-x-4">
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="hover:bg-gray-100 transition-colors"
            >
              Go Back
            </Button>
            <Button
              asChild
              className="bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <Link href="/">Home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const averageRating = userData.ratingTotal / userData.ratingCount || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <div className="relative h-48 md:h-64 lg:h-80 overflow-hidden">
        <Image
          src={userData.bannerImage || "/placeholder.svg"}
          alt="Profile Banner"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />

        {/* Profile Image */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            <Image
              src={userData.image || "/placeholder.svg"}
              alt={userData.name}
              //   quality={95}
              unoptimized
              width={128}
              height={128}
              className="rounded-full border-4 border-white shadow-lg w-24 h-24 md:w-64 md:h-64"
            />
            {userData.isActive && (
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 z-10">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Edit Button */}
        <div className="absolute top-4 right-4 z-10">
          <Button variant="secondary" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-8 pb-8">
        {/* Header Info */}
        <div className="pt-20 md:pt-24 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {userData.name}
                </h1>
                {userData.supportMember && (
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800"
                  >
                    <Shield className="w-3 h-3 mr-1" />
                    Support Member
                  </Badge>
                )}
              </div>

              {userData.shopName && (
                <p className="text-lg text-gray-600 mb-2">
                  {userData.shopName}
                </p>
              )}

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined{" "}
                  {new Date(userData.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-1">
                  {userData.isActive ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Active
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-red-500" />
                      Inactive
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Rating Display */}
            {userData.ratingCount > 0 && (
              <div className="flex items-center gap-2 bg-white rounded-lg p-3 shadow-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-lg">
                    {averageRating.toFixed(1)}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  ({userData.ratingCount} reviews)
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Package className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-gray-900">
                {userData.productCount}
              </div>
              <div className="text-sm text-gray-500">Products</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold text-gray-900">
                {userData.ratingCount}
              </div>
              <div className="text-sm text-gray-500">Reviews</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-gray-900">
                {userData.productLimit}
              </div>
              <div className="text-sm text-gray-500">Product Limit</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-gray-900">
                {userData.role.length}
              </div>
              <div className="text-sm text-gray-500">Roles</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span>{userData.email}</span>
                </div>

                {userData.number && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span>{userData.number}</span>
                  </div>
                )}

                {userData.whatsAppNumber && (
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-green-500" />
                    <span>{userData.whatsAppNumber}</span>
                    <Badge
                      variant="outline"
                      className="text-green-600 border-green-200"
                    >
                      WhatsApp
                    </Badge>
                  </div>
                )}

                {userData.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <span>{userData.address}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Business Information */}
            {userData.shopName && (
              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Shop Name
                    </label>
                    <p className="text-gray-900">{userData.shopName}</p>
                  </div>

                  {userData.businessCategory && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Category
                      </label>
                      <p className="text-gray-900">
                        {userData.businessCategory}
                      </p>
                    </div>
                  )}

                  {userData.policy && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Store Policy
                      </label>
                      <p className="text-gray-900">{userData.policy}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Interests */}
            {userData.interested.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Interests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {userData.interested.map((interest, index) => (
                      <Badge key={index} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Roles */}
            <Card>
              <CardHeader>
                <CardTitle>Roles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {userData.role.map((role, index) => (
                    <Badge key={index} variant="outline" className="mr-2">
                      {role}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle>Social Media</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {userData.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <a
                      href={userData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Website
                    </a>
                  </div>
                )}

                {userData.fbAccount && (
                  <div className="flex items-center gap-3">
                    <Facebook className="w-5 h-5 text-blue-600" />
                    <a
                      href={`https://facebook.com/${userData.fbAccount}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Facebook
                    </a>
                  </div>
                )}

                {userData.instagram && (
                  <div className="flex items-center gap-3">
                    <Instagram className="w-5 h-5 text-pink-600" />
                    <a
                      href={`https://instagram.com/${userData.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-600 hover:underline"
                    >
                      Instagram
                    </a>
                  </div>
                )}

                {userData.youtube && (
                  <div className="flex items-center gap-3">
                    <Youtube className="w-5 h-5 text-red-600" />
                    <a
                      href={`https://youtube.com/@${userData.youtube}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:underline"
                    >
                      YouTube
                    </a>
                  </div>
                )}

                {userData.tikTok && (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">T</span>
                    </div>
                    <a
                      href={`https://tiktok.com/@${userData.tikTok}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 hover:underline"
                    >
                      TikTok
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Account Status */}
            <Card>
              <CardHeader>
                <CardTitle>Account Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Account Status</span>
                  <Badge
                    variant={userData.isActive ? "default" : "destructive"}
                  >
                    {userData.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Support Member</span>
                  <Badge
                    variant={userData.supportMember ? "secondary" : "outline"}
                  >
                    {userData.supportMember ? "Yes" : "No"}
                  </Badge>
                </div>

                <Separator />

                <div className="text-xs text-gray-500">
                  Last updated:{" "}
                  {new Date(userData.updatedAt).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
