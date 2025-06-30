"use client";

import type React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  Facebook,
  Instagram,
  Shield,
  Smartphone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

interface BoostOrder {
  productId: string;
  product: Product;
  packageType: "standard" | "premium";
  duration: 3 | 7 | 15;
  price: number;
  orderId: string;
  createdAt: Date;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  processingFee?: number;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: CreditCard,
    description: "Visa, Mastercard, American Express",
    processingFee: 2.9,
  },
  {
    id: "mobile",
    name: "Mobile Banking",
    icon: Smartphone,
    description: "bKash, Nagad, Rocket",
    processingFee: 1.5,
  },
  {
    id: "bank",
    name: "Bank Transfer",
    icon: Building2,
    description: "Direct bank transfer",
    processingFee: 0,
  },
];

interface BoostPaymentProps {
  boostOrder: BoostOrder;
  // TODO: Add proper type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}

export function BoostPayment({ boostOrder }: BoostPaymentProps) {
  const router = useRouter();
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const selectedMethod = paymentMethods.find(
    (method) => method.id === selectedPaymentMethod
  );
  const processingFee = selectedMethod?.processingFee
    ? (boostOrder.price * selectedMethod.processingFee) / 100
    : 0;
  const totalAmount = boostOrder.price + processingFee;

  const handlePayment = async () => {
    if (!agreedToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Redirect to success page
    router.push(`/dashboard/boosting/success?orderId=${boostOrder.orderId}`);
  };

  const packageName =
    boostOrder.packageType === "premium" ? "Premium Boost" : "Standard Boost";

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/dashboard/boosting/${boostOrder.productId}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Package Selection
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-green-500 to-blue-600">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Secure Payment</h1>
            <p className="text-muted-foreground">
              Complete your boost order payment
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Payment Methods */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Select Payment Method
              </CardTitle>
              <CardDescription>
                Choose your preferred payment option
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedPaymentMethod}
                onValueChange={setSelectedPaymentMethod}
              >
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <Card
                      key={method.id}
                      className={`cursor-pointer transition-all ${
                        selectedPaymentMethod === method.id
                          ? "ring-2 ring-blue-500 bg-blue-50/50 dark:bg-blue-950/20"
                          : "hover:shadow-md"
                      }`}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value={method.id} id={method.id} />
                            <method.icon className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <Label
                                htmlFor={method.id}
                                className="text-base font-medium cursor-pointer"
                              >
                                {method.name}
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                {method.description}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            {method.processingFee ? (
                              <Badge variant="outline">
                                {method.processingFee}% fee
                              </Badge>
                            ) : (
                              <Badge variant="secondary">No fee</Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Payment Form */}
          {selectedPaymentMethod === "card" && (
            <Card>
              <CardHeader>
                <CardTitle>Card Information</CardTitle>
                <CardDescription>
                  Enter your card details securely
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input id="cardName" placeholder="John Doe" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {selectedPaymentMethod === "mobile" && (
            <Card>
              <CardHeader>
                <CardTitle>Mobile Banking</CardTitle>
                <CardDescription>
                  Enter your mobile banking details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="mobileProvider">Provider</Label>
                    <RadioGroup defaultValue="bkash">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bkash" id="bkash" />
                        <Label htmlFor="bkash">bKash</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nagad" id="nagad" />
                        <Label htmlFor="nagad">Nagad</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="rocket" id="rocket" />
                        <Label htmlFor="rocket">Rocket</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div>
                    <Label htmlFor="mobileNumber">Mobile Number</Label>
                    <Input id="mobileNumber" placeholder="01XXXXXXXXX" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {selectedPaymentMethod === "bank" && (
            <Card>
              <CardHeader>
                <CardTitle>Bank Transfer</CardTitle>
                <CardDescription>
                  Bank account details for transfer
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Transfer to:</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Bank:</strong> Dutch Bangla Bank
                    </p>
                    <p>
                      <strong>Account Name:</strong> EcommercePro Ltd
                    </p>
                    <p>
                      <strong>Account Number:</strong> 1234567890
                    </p>
                    <p>
                      <strong>Routing Number:</strong> 090123456
                    </p>
                  </div>
                </div>
                <div>
                  <Label htmlFor="transactionId">Transaction ID</Label>
                  <Input
                    id="transactionId"
                    placeholder="Enter transaction ID after transfer"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Terms and Conditions */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) =>
                    setAgreedToTerms(checked as boolean)
                  }
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the terms and conditions
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    By proceeding, you agree to our{" "}
                    <Link
                      href="/terms"
                      className="underline hover:text-primary"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="underline hover:text-primary"
                    >
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Product Info */}
              <div className="space-y-3">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={boostOrder.product.image || "/placeholder.svg"}
                    alt={boostOrder.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold line-clamp-2">
                    {boostOrder.product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {boostOrder.product.description}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Boost Details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Package:</span>
                  <Badge
                    variant={
                      boostOrder.packageType === "premium"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {packageName}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Duration:</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {boostOrder.duration} days
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Platform:</span>
                  <div className="flex items-center gap-1">
                    <Facebook className="h-4 w-4 text-blue-600" />
                    {boostOrder.packageType === "premium" && (
                      <Instagram className="h-4 w-4 text-pink-600" />
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Start Date:</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Pricing */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Boost Package:</span>
                  <span className="text-sm font-medium">
                    ${boostOrder.price}
                  </span>
                </div>
                {processingFee > 0 && (
                  <div className="flex justify-between">
                    <span className="text-sm">Processing Fee:</span>
                    <span className="text-sm font-medium">
                      ${processingFee.toFixed(2)}
                    </span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Payment Button */}
              <Button
                onClick={handlePayment}
                disabled={!agreedToTerms || isProcessing}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Pay ${totalAmount.toFixed(2)}
                  </>
                )}
              </Button>

              <div className="text-xs text-center text-muted-foreground">
                <Shield className="h-3 w-3 inline mr-1" />
                Secured by 256-bit SSL encryption
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
