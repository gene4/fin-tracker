"use client";

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    getSortedRowModel,
    SortingState,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "../../components/ui/data-table-pagination";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { DataTableFacetedFilter } from "../../components/ui/data-table-faceted-filter";
import { ExpanseModal } from "../../components/expanse-modal";
import { Category } from "@/types";
import { createColumns } from "@/app/expanses/columns";
import { Button } from "../../components/ui/button";
import { MonthSelect } from "@/components/month-select";

interface DataTableProps<TData, TValue> {
    data: TData[];
    categories: Category[];
}

export function DataTable<TData, TValue>({
    // columns,
    data,
    categories,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const columns = createColumns(categories);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    });

    // Extract category options from the table data
    const categoryColumn = table.getColumn("category");
    const categoryOptions = Array.from(
        new Set(
            table
                .getRowModel()
                .rows.map((row) => row.getValue(categoryColumn!.id))
        )
    ).map((category) => ({
        label: category as string,
        value: category as string,
    }));

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
                <div className="relative">
                    <Input
                        placeholder="Search..."
                        value={
                            (table
                                .getColumn("name")
                                ?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) =>
                            table
                                .getColumn("name")
                                ?.setFilterValue(event.target.value)
                        }
                        className="max-w-40 pr-10"
                    />
                    <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 transform" />
                </div>
                <DataTableFacetedFilter
                    column={table.getColumn("category")}
                    title="Category"
                    options={categoryOptions}
                />
                <MonthSelect
                    onValueChange={(value) =>
                        table.getColumn("date")?.setFilterValue(value)
                    }
                />
                <ExpanseModal
                    categories={categories}
                    trigger={
                        <Button variant="outline" size="icon">
                            <Plus className="size-4" />
                        </Button>
                    }
                />
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
                                                      header.column.columnDef
                                                          .header,
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
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }>
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
                                    className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    );
}
