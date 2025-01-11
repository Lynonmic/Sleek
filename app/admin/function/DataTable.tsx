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
import { Modal, ModalBody, ModalContent } from "@/components/ui/animated-modal";
import AnimatedButton from "@/components/ui/animated-button";
import { AddingForm, FormConfig, UpdateForm } from "@/components/ui/form";
import { cn } from "@/lib/utils";

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

export function DataTable<T extends object>({
  data,
  columnsData,
  tableName,
  idField = "id",
  filterField = "id",
  apiEndpoint = "http://localhost:8000",
  configForm,
}: {
  data: T[];
  columnsData: DataType[];
  tableName: string;
  idField?: string;
  filterField?: string;
  apiEndpoint?: string;
  configForm?: FormConfig;
}) {
  const [tableData, setTableData] = React.useState<T[]>(data);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    setTableData(data);
  }, [data]);

  const refreshData = async () => {
    try {
      const response = await fetch(`${apiEndpoint}/${tableName}`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const result = await response.json();
      const dataArray = Array.isArray(result) ? result : result.data;

      if (!Array.isArray(dataArray)) {
        console.error("Invalid response format");
        return;
      }

      setTableData(dataArray);
    } catch (err) {
      console.error("Error refreshing data:", err);
    }
  };

  const handleEdit = async (row: T) => {
    const id = (row as any)[idField];
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleDelete = async (row: T) => {
    if (!(idField in row)) {
      console.error(`Row is missing required id field: ${idField}`);
      return;
    }

    const id = (row as any)[idField];
    try {
      const res = await fetch(`${apiEndpoint}/${tableName}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`Failed to delete item with id: ${id}`);

      setTableData((current) =>
        current.filter((item) => (item as any)[idField] !== id)
      );
    } catch (err) {
      console.error("Error deleting row:", err);
      alert("Failed to delete item");
    }
  };

  const handleAdd = async (newData: T) => {
    try {
      const res = await fetch(`${apiEndpoint}/${tableName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (!res.ok) {
        throw new Error("Failed to add item");
      }

      const addedData = await res.json();

      setTableData((current) => [...current, addedData.data]);
    } catch (err) {
      console.error("Error adding row:", err);
      alert("Failed to add item");
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
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
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
                <DropdownMenuItem onSelect={() => handleEdit(item)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleDelete(item)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
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
    data: tableData,
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
      <div className={cn("flex justify-end gap-2")}>
        <Button variant="outline" size="lg" onClick={refreshData}>
          Refresh
        </Button>
        <AnimatedButton buttonName="Create" AcceptButton="">
          <AddingForm className="" config={configForm} onAdded={handleAdd} />
        </AnimatedButton>
      </div>
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
      <Modal
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) setSelectedId(null);
        }}
      >
        <ModalContent className="bg-black dark:bg-neutral-900">
          <ModalBody>
            <div className="max-h-[80vh] w-full overflow-y-auto p-6">
              {selectedId && (
                <UpdateForm
                  config={configForm}
                  id={selectedId}
                  tableName={tableName}
                  apiEndpoint={apiEndpoint}
                  onSubmit={refreshData}
                />
              )}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
