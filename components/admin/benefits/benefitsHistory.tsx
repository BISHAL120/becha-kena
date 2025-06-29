"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Calendar, CheckCircle, RefreshCw, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import ConfirmationDialog from "../components/confirmationDialog";
import { Benefits } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

const BenefitsHistory = ({ benefits }: { benefits: Benefits[] | null }) => {
  const router = useRouter();

  if (!benefits) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-64 h-64 mb-8">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-gray-300 animate-pulse"
          >
            <path
              d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M12 8V12L14.5 14.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 17H15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-700 mb-3">
          No Benefits Found
        </h3>
        <p className="text-gray-500 mb-8 max-w-md">
          It looks like there aren&apos;t any benefits added yet. Start by
          adding your first benefit to track and manage them here.
        </p>
        <Button
          onClick={() => (window.location.href = "/admin/benefits/add")}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-bounce"
          >
            <path
              d="M12 5V19M5 12H19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Add Your First Benefit
        </Button>
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    toast.loading("Deleting...");
    axios
      .delete("/api/admin/benefits", {
        data: { id }, // Fix: Pass id in data object for DELETE request
      })
      .then((res) => {
        toast.dismiss();
        router.refresh();
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err.response.data.message);
      });
  };
  const formatDate = (dateString: Date) => {
    return dateString.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Benefits History
              </h1>
              <p className="text-gray-600">
                View and manage all previously added benefits
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                // onClick={loadBenefits}
                variant="outline"
                className="flex items-center gap-2"
                // disabled={loading}
              >
                <RefreshCw
                  size={16}
                  //   className={loading ? "animate-spin" : ""}
                />
                Refresh
              </Button>
              <Badge className="text-sm px-3 py-1">
                {benefits.length} Total Benefits
              </Badge>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <Input
              type="text"
              placeholder="Search benefits..."
              //   value={searchTerm}
              //   onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white shadow-sm"
            />
          </div>

          <Separator className="mb-8" />
        </div>

        <div className="space-y-4">
          {benefits.map((benefit) => (
            <Card
              key={benefit.id}
              className="transition-all duration-200 hover:shadow-md group"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <CheckCircle
                        size={20}
                        className="text-green-500 mt-0.5 flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {benefit.title}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            Created: {formatDate(benefit.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <ConfirmationDialog
                    currentState={false}
                    onConfirm={() => handleDelete(benefit.id)}
                    trigger={
                      <Button
                        variant="ghost"
                        size="sm"
                        className="border hover:bg-amber-700 hover:text-white transition-colors duration-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    }
                    title="Delete Category"
                    description="Are you sure you want to delete this category?"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Footer */}
        {benefits.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Showing {benefits.length} of {benefits.length} benefits
              {/* {searchTerm && ` matching "${searchTerm}"`} */}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BenefitsHistory;
