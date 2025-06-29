"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Eye, Search } from "lucide-react";
import { useMemo, useState } from "react";

const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    reseller: "Alex Thompson",
    product: "iPhone 15 Pro",
    status: "completed",
    amount: "$999.00",
    profit: "$150.00",
    date: "2024-01-15",
    paymentMethod: "COD",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    reseller: "Maria Garcia",
    product: "Samsung Galaxy S24",
    status: "processing",
    amount: "$849.00",
    profit: "$120.00",
    date: "2024-01-15",
    paymentMethod: "PREPAID",
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    reseller: "David Chen",
    product: "MacBook Air M3",
    status: "pending",
    amount: "$1,299.00",
    profit: "$200.00",
    date: "2024-01-14",
    paymentMethod: "COD",
  },
  {
    id: "ORD-004",
    customer: "Sarah Wilson",
    reseller: "Lisa Anderson",
    product: "AirPods Pro",
    status: "delivered",
    amount: "$249.00",
    profit: "$40.00",
    date: "2024-01-14",
    paymentMethod: "PREPAID",
  },
  {
    id: "ORD-005",
    customer: "Robert Brown",
    reseller: "Alex Thompson",
    product: "iPad Pro 12.9",
    status: "cancelled",
    amount: "$1,099.00",
    profit: "$0.00",
    date: "2024-01-13",
    paymentMethod: "COD",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "processing":
      return "bg-blue-100 text-blue-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "delivered":
      return "bg-purple-100 text-purple-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getPaymentMethodColor = (method: string) => {
  switch (method) {
    case "COD":
      return "bg-orange-100 text-orange-800";
    case "PREPAID":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.reseller.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;
      const matchesPayment =
        paymentFilter === "all" || order.paymentMethod === paymentFilter;

      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [searchTerm, statusFilter, paymentFilter]);

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
            <p className="text-muted-foreground">
              Manage and track all customer orders
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Order Management</CardTitle>
            <CardDescription>
              View and manage all orders from resellers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by Order ID or Reseller..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="COD">Cash on Delivery</SelectItem>
                  <SelectItem value="PREPAID">Prepaid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Reseller</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Profit</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.reseller}</TableCell>
                      <TableCell>{order.product}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getPaymentMethodColor(order.paymentMethod)}
                        >
                          {order.paymentMethod}
                        </Badge>
                      </TableCell>
                      <TableCell>{order.amount}</TableCell>
                      <TableCell>{order.profit}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {filteredOrders.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No orders found matching your search criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
