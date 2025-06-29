"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Product } from "@prisma/client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import { Eye, MoreHorizontal, PenLine, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function ProductTable({
  page,
  per_page,
  count,
  products,
}: {
  page: string;
  per_page: string;
  count: number;
  products: Product[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const router = useRouter();

  const changePage = (value: string) => {
    if (Number(value) < 1) return;
    router.push(`?page=${value}&per_page=${per_page}`);
  };

  const changePerPage = (value: string) => {
    router.push(`?page=${page}&per_page=${value}`);
  };

  // Update debouncedQuery after 2 seconds of no typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer); // Cleanup the timeout on every keystroke
  }, [searchQuery]);

  // Fetch search results when debouncedQuery changes
  useEffect(() => {
    const fetchData = async () => {
      router.push(`?page=${1}&per_page=${per_page}&search=${debouncedQuery}`);
    };

    fetchData();
  }, [debouncedQuery, per_page, router]);

  useEffect(() => {
    if (count === 0) {
      return;
    }
    if (Number(page) > Math.ceil(count / Number(per_page))) {
      router.push(
        `?page=${Math.ceil(count / Number(per_page))}&per_page=${per_page}`
      );
    }

    if (Number(page) * Number(per_page) > count) {
      router.push(`?page=${Math.ceil(count / 10)}&per_page=10`);
    }
  }, [page, per_page, count, router]);

  const deleteProduct = (id: string) => {
    try {
      toast.loading("Deleting...");
      axios
        .patch(`/api/product`, {
          id: id,
          isDeleted: true,
          published: false,
        })
        .then((res) => {
          toast.dismiss();
          if (res.status === 200) {
            toast.success("Product Deleted Successfully");
            router.refresh();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const columns: ColumnDef<Product>[] = [
    {
      id: "id",
      header: () => <div>No.</div>,
      cell: ({ row }) => (
        <div>{(Number(page) - 1) * Number(per_page) + Number(row.id) + 1}</div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "productName",
      header: "PRODUCT",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Image
            src={row.original.image[0]}
            alt={row.original.productName || "Product"}
            className="rounded-lg w-20 h-20 object-cover"
            quality={95}
            width={40}
            height={40}
          />
          <div>
            <div className="font-medium">{row.original.productName}</div>
            <div className="text-sm text-muted-foreground">
              {row.original.description?.slice(0, 40)}
              {row.original.description && row.original.description.length > 40
                ? "..."
                : ""}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "categoryName",
      header: "CATEGORY",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="font-medium">{row.original.categoryName}</div>
        </div>
      ),
    },
    /* {
      accessorKey: "stock",
      header: "STOCK",
      cell: ({ row }) => (
        <div
          className={`w-3 h-3 rounded-full ${
            row.original.stock ? "bg-green-500" : "bg-red-500"
          }`}
        />
      ),
    }, */
    {
      accessorKey: "sku",
      header: "SKU",
    },
    {
      accessorKey: "price",
      header: "PRICE",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("price"));
        const formatted = new Intl.NumberFormat("bn-BD", {
          style: "currency",
          currency: "BDT",
        }).format(amount);
        const sellAmount = parseFloat(
          row.original.sellPrice?.toString() || "0"
        );
        const sellFormatted = new Intl.NumberFormat("bn-BD", {
          style: "currency",
          currency: "BDT",
        }).format(sellAmount);
        return (
          <div className="space-y-2">
            <div className="line-through">{formatted}</div>
            <div>{sellFormatted}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: "QTY",
    },
    {
      accessorKey: "isDeleted",
      header: "STATUS",
      cell: ({ row }) => {
        const status = row.getValue("isDeleted") as boolean;
        return (
          <Badge
            variant="outline"
            className={
              row.original.isDeleted === true
                ? "bg-red-600 text-white"
                : row.original.published === false
                ? "bg-yellow-500 text-white "
                : " bg-green-300 text-black"
            }
          >
            {status ? "Deleted" : !row.original.published ? "Draft" : "Active"}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "ACTIONS",
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link
                href={`/dashboard/products/${row.original.id}?categoryId=${row.original.categoryId}`}
              >
                <DropdownMenuItem>
                  <PenLine className="mr-2 h-4 w-4" />
                  Edit product
                </DropdownMenuItem>
              </Link>
              <Link
                href={`/products/${row.original.productSlug}?id=${row.original.id}`}
              >
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  View details
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onClick={() => deleteProduct(row.original.id)}
                className="text-red-600 group "
              >
                <Trash2 className="mr-2 h-4 w-4 group-hover:text-red-500" />
                <span className="group-hover:text-red-500">Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4 mt-10">
      <div className="flex items-center justify-between mb-5">
        <Input
          placeholder="Search products..."
          value={
            (table.getColumn("productName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) => {
            table.getColumn("productName")?.setFilterValue(event.target.value);
            setSearchQuery(event.target.value);
          }}
          className="max-w-sm "
        />
        <div className="flex items-center gap-5">
          <Select
            value={`${Number(per_page)}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
              changePerPage(value);
            }}
          >
            <SelectTrigger className="w-[70px]">
              <SelectValue placeholder={`${Number(per_page)}`} />
            </SelectTrigger>
            <SelectContent>
              {[7, 10, 20, 23, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button>
            <Link
              href="/dashboard/products/new"
              className="flex items-center gap-1"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          {Number(page) * Number(per_page) > count
            ? count
            : Number(page) * Number(per_page)}{" "}
          of {count} row(s).
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              changePage((Number(page) - 1).toString());
              table.previousPage();
            }}
            disabled={page === "1"}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              changePage((Number(page) + 1).toString());
              table.nextPage();
            }}
            disabled={Number(page) * Number(per_page) >= Number(count)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
