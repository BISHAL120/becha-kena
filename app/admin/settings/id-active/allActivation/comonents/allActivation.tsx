"use client";

import { format } from "date-fns";
import * as React from "react";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NewIdActive } from "@prisma/client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CheckCheck, Copy, MoreHorizontal, Phone } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

interface AllActivationTableProps {
  initialData: NewIdActive[] | null;
}

const AllActivationTable: React.FC<AllActivationTableProps> = ({
  initialData,
}) => {
  const router = useRouter();

  const handleQuried = async (id: string) => {
    toast.loading("Updating...");
    axios
      .post("/api/admin/manual/query/idActive", { id })
      .then(() => {
        toast.dismiss();
        router.refresh();
        toast.success("Quired updated successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss();
        toast.error("Something went wrong");
      });
  };

  const columns: ColumnDef<NewIdActive>[] = [
    {
      id: "id",
      header: () => <div>No.</div>,
      cell: ({ row }) => (
        <div>
          {/* (Number(page) - 1) * Number(per_page) + */ Number(row.id) + 1}
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("price")}</div>
      ),
    },
    {
      accessorKey: "Number",
      header: "Number",
      cell: ({ row }) => <div>{row.original.number}</div>,
    },
    {
      accessorKey: "query",
      header: "Query",
      cell: ({ row }) => (
        <div>
          {row.original.query === true ? (
            <Badge>Complete</Badge>
          ) : (
            <Badge className="bg-emerald-300">Not Quired</Badge>
          )}
        </div>
      ),
    },
    {
      accessorKey: "payment",
      header: "Payment",
      cell: ({ row }) => (
        <div>{row.original.isPayed === true ? "Paid" : "Not Paid"}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: () => {
        return <div>Created At</div>;
      },
      cell: ({ row }) => (
        <div className="">
          {format(row.getValue("createdAt"), "hh:mm a MMMM do yyyy")}
        </div>
      ),
    },

    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const partner = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(partner.number || "");
                  toast.success("ID copied to clipboard");
                }}
              >
                <Copy />
                Copy Number
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handleQuried(partner.id);
                }}
              >
                <CheckCheck />
                Mark Complete
              </DropdownMenuItem>
              <Link href={`https://wa.me/+88${partner?.number}`}>
                <DropdownMenuItem>
                  <Phone size={16} /> WhatsApp
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: initialData || [],
    columns,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full py-10">
      <div className="rounded-md border dark:border-slate-200 ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="dark:border-slate-200 " key={headerGroup.id}>
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
                  className="dark:border-slate-200 hover:bg-gray-300 dark:hover:bg-slate-700"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="" key={cell.id}>
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AllActivationTable;
