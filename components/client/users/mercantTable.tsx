"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { Eye, MoreHorizontal } from "lucide-react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface MerchantsProps {
  number: string | null;
  id: string;
  name: string;
  division: string | null;
  productCount: number;
  role: string[];
  image: string | null;
  createdAt: Date;
}

export function MerchantTable({
  page = "1",
  per_page = "10",
  count,
  merchants,
}: {
  page: string;
  per_page: string;
  count: number;
  merchants: MerchantsProps[];
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

  /*   useEffect(() => {
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
  }, [page, per_page, count, router]); */

  /* const deleteProduct = (id: string) => {
    try {
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  }; */

  const columns: ColumnDef<MerchantsProps>[] = [
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
      header: "MERCHANT NAME",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="w-14 h-14">
            <AvatarImage
              className="w-14 h-14 object-cover"
              src={row.original.image ? row.original.image : ""}
              alt={row.original.name}
            />
            <AvatarFallback className="border">
              {row.original.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{row.original.name}</div>
            <div className="text-sm text-muted-foreground">
              {row.original.number}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "JOIN DATE",
      cell: ({ row }) => (
        <div className="flex justify-center flex-col gap-2">
          <div className="font-medium">
            {format(row.original.createdAt, "MMMM d, yyyy")}
          </div>
          <div>
            <div className="text-sm text-muted-foreground">
              {format(row.original.createdAt, "h:mm a")}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: "ROLE",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="font-medium">
            {row.original?.role.map((role) => (
              <span key={role} className="mr-2">
                {role}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "division",
      header: "Division",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="font-medium">{row.original.division}</div>
        </div>
      ),
    },

    {
      id: "total",
      header: () => <div>Products</div>,
      cell: ({ row }) => <div>{row.original.productCount}</div>,
      enableSorting: false,
      enableHiding: false,
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
              {/*  <Link href={"#"}>
                <DropdownMenuItem>
                  <PenLine className="mr-2 h-4 w-4" />
                  Edit product
                </DropdownMenuItem>
              </Link> */}
              <Link href={`/admin/users/merchants/${row.original.id}`}>
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  View details
                </DropdownMenuItem>
              </Link>
              {/* <DropdownMenuItem
                onClick={() => deleteProduct(row.original.id)}
                className="text-red-600 group "
              >
                <Trash2 className="mr-2 h-4 w-4 group-hover:text-red-500" />
                <span className="group-hover:text-red-500">Action 3</span>
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: merchants,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4 mt-10">
      <div className="flex items-center justify-between mb-5">
        <Input
          placeholder="Search By Number..."
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
