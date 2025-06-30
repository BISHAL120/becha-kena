"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Check, Zap, Star, Target, Facebook } from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  sales: number;
  isActive: boolean;
  currentBoost?: {
    type: "standard" | "premium";
    daysLeft: number;
    expiresAt: Date;
  } | null;
}

interface BoostPackage {
  id: string;
  name: string;
  type: "standard" | "premium";
  description: string;
  features: string[];
  pricing: {
    "3": number;
    "7": number;
    "15": number;
  };
  popular?: boolean;
}

const boostPackages: BoostPackage[] = [
  {
    id: "standard",
    name: "Standard Boost",
    type: "standard",
    description: "Basic promotion to increase product visibility",
    features: [
      "Facebook post promotion",
      "Basic audience targeting",
      "Standard placement",
      "Performance analytics",
      "Email support",
    ],
    pricing: {
      "3": 15,
      "7": 30,
      "15": 55,
    },
  },
  {
    id: "premium",
    name: "Premium Boost",
    type: "premium",
    description: "Advanced promotion with premium features",
    features: [
      "Facebook & Instagram promotion",
      "Advanced audience targeting",
      "Premium placement",
      "Detailed analytics & insights",
      "A/B testing options",
      "Priority support",
      "Custom ad creatives",
    ],
    pricing: {
      "3": 35,
      "7": 65,
      "15": 120,
    },
    popular: true,
  },
];

interface BoostPackageSelectorProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    packageType: "standard" | "premium",
    duration: 3 | 7 | 15
  ) => void;
}

export function BoostPackageSelector({
  product,
  isOpen,
  onClose,
  onConfirm,
}: BoostPackageSelectorProps) {
  const [selectedPackage, setSelectedPackage] = useState<
    "standard" | "premium"
  >("standard");
  const [selectedDuration, setSelectedDuration] = useState<"3" | "7" | "15">(
    "7"
  );

  const currentPackage = boostPackages.find(
    (pkg) => pkg.type === selectedPackage
  );
  const totalPrice = currentPackage?.pricing[selectedDuration] || 0;

  const handleConfirm = () => {
    onConfirm(selectedPackage, Number.parseInt(selectedDuration) as 3 | 7 | 15);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-500" />
            Boost Product
          </DialogTitle>
          <DialogDescription>
            Choose a boosting package to promote your product on Facebook and
            increase sales
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Selected Product</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{product.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg font-bold text-primary">
                      ${product.price}
                    </span>
                    <Badge variant="outline">{product.category}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Package Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Choose Boost Package</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {boostPackages.map((pkg) => (
                <Card
                  key={pkg.id}
                  className={`relative cursor-pointer transition-all ${
                    selectedPackage === pkg.type
                      ? "ring-2 ring-blue-500 bg-blue-50/50 dark:bg-blue-950/20"
                      : "hover:shadow-md"
                  }`}
                  onClick={() => setSelectedPackage(pkg.type)}
                >
                  {pkg.popular && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-600">
                        <Star className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        {pkg.type === "premium" ? (
                          <Star className="h-5 w-5 text-yellow-500" />
                        ) : (
                          <Zap className="h-5 w-5 text-blue-500" />
                        )}
                        {pkg.name}
                      </CardTitle>
                      <RadioGroup
                        value={selectedPackage}
                        // onValueChange={setSelectedPackage}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value={pkg.type} id={pkg.type} />
                          <Label htmlFor={pkg.type} className="sr-only">
                            {pkg.name}
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <CardDescription>{pkg.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-2xl font-bold">
                        ${pkg.pricing[selectedDuration]}
                        <span className="text-sm font-normal text-muted-foreground">
                          /{selectedDuration} days
                        </span>
                      </div>

                      <ul className="space-y-2">
                        {pkg.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-sm"
                          >
                            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Duration Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Select Duration</h3>
            <RadioGroup
              value={selectedDuration}
              // onValueChange={setSelectedDuration}
            >
              <div className="grid gap-3 md:grid-cols-3">
                {["3", "7", "15"].map((duration) => (
                  <Card
                    key={duration}
                    className={`cursor-pointer transition-all ${
                      selectedDuration === duration
                        ? "ring-2 ring-blue-500 bg-blue-50/50 dark:bg-blue-950/20"
                        : "hover:shadow-md"
                    }`}
                    onClick={() =>
                      setSelectedDuration(duration as "3" | "7" | "15")
                    }
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value={duration} id={duration} />
                          <div>
                            <Label
                              htmlFor={duration}
                              className="text-base font-semibold cursor-pointer"
                            >
                              {duration} Days
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              {duration === "3" && "Quick boost"}
                              {duration === "7" && "Recommended"}
                              {duration === "15" && "Maximum exposure"}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">
                            $
                            {
                              currentPackage?.pricing[
                                duration as "3" | "7" | "15"
                              ]
                            }
                          </div>
                          {duration === "15" && (
                            <Badge variant="secondary" className="text-xs">
                              Best Value
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Summary */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Boost Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Package:</span>
                <Badge
                  variant={
                    selectedPackage === "premium" ? "default" : "secondary"
                  }
                >
                  {currentPackage?.name}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Duration:</span>
                <span className="font-semibold">{selectedDuration} days</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Platform:</span>
                <div className="flex items-center gap-1">
                  <Facebook className="h-4 w-4 text-blue-600" />
                  <span>
                    Facebook {selectedPackage === "premium" && "+ Instagram"}
                  </span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total Cost:</span>
                <span className="text-primary">${totalPrice}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Zap className="h-4 w-4 mr-2" />
            Start Boosting - ${totalPrice}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
