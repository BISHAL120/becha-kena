"use client";

import { format } from "date-fns";
import * as React from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MerchantSettings } from "@prisma/client";

export const columns: ColumnDef<MerchantSettings>[] = [
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
    accessorKey: "productLimit",
    header: "Limit",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("productLimit")}</div>
    ),
  },
  /* {
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
                navigator.clipboard.writeText(partner.id);
                toast.success("ID copied to clipboard");
              }}
            >
              <Copy />
              Copy ID
            </DropdownMenuItem>
            <Link href={`/admin/partners/${partner.id}`}>
              <DropdownMenuItem>
                <Edit size={16} /> Edit Partners
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }, */
];

interface AllPartnersTableProps {
  initialData: MerchantSettings[] | null;
}

const AllHistoryTable: React.FC<AllPartnersTableProps> = ({ initialData }) => {
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

export default AllHistoryTable;
