"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/animated-modal";

type DataType = {
  title: string;
  value: string;
};

const createColumns = <T,>(data: DataType[]): ColumnDef<T>[] => {
  return data.map((item) => ({
    accessorKey: item.value,
    header: item.title,
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue(item.value)}</div>
    ),
  }));
};

export function DataTable<T>({
  data,
  columnsData,
  tableName,
  idField = "id",
  filterField = "email", // Add default filter field
  apiEndpoint = "http://localhost:8000",
}: {
  data: T[];
  columnsData: DataType[];
  tableName: string;
  idField?: string;
  filterField?: string;
  apiEndpoint?: string;
}) {
  const [tableData, setTableData] = React.useState<T[]>(data);
  const [editingRow, setEditingRow] = React.useState<T | null>(null);
  const [, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleEdit = (row: T) => {
    setEditingRow(row);
    setIsModalOpen(true);
  };

  const handleDelete = async (row: T) => {
    const id = (row as any)[idField];
    try {
      const res = await fetch(`${apiEndpoint}/${tableName}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      setTableData((prevData) =>
        prevData.filter((item) => (item as any)[idField] !== id)
      );
    } catch (err) {
      console.error("Error deleting row:", err);
    }
  };

  const handleUpdate = async (editedData: T) => {
    try {
      const res = await fetch(
        `${apiEndpoint}/${tableName}/${(editedData as any)[idField]}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedData),
        }
      );
      if (!res.ok) throw new Error("Failed to update");

      // Update table data without page reload
      setTableData((prevData) =>
        prevData.map((item) =>
          (item as any)[idField] === (editedData as any)[idField]
            ? editedData
            : item
        )
      );
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error updating row:", err);
    }
  };

  const columns: ColumnDef<T>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...createColumns<T>(columnsData),
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original;

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
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(JSON.stringify(item))
                }
              >
                Copy Data
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleEdit(item)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(item)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: tableData, // Use tableData instead of data
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder={`Filter ${filterField}...`}
          value={
            (table.getColumn(filterField)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(filterField)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
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
      <Modal>
        <ModalTrigger className="hidden">Open Modal</ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h2 className="text-xl font-bold">Edit Row</h2>
            {editingRow && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdate(editingRow);
                }}
              >
                {Object.keys(editingRow).map((key) => (
                  <div key={key} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      {key}
                    </label>
                    <input
                      type="text"
                      value={(editingRow as any)[key]}
                      onChange={(e) =>
                        setEditingRow({
                          ...editingRow,
                          [key]: e.target.value,
                        })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                ))}
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="default">
                    Save
                  </Button>
                </div>
              </form>
            )}
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
}
