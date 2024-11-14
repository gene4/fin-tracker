// columns.ts
import { ColumnDef } from "@tanstack/react-table";
import { Repeat, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ActionsCell } from "./actions";
import { Category } from "@/types";
import { formatEuro } from "@/lib/utils";

export function createColumns(categories: Category[]): ColumnDef<any, any>[] {
    return [
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => {
                const name = row.getValue("name") as string;
                const isRecurring = row.original.is_recurring as boolean;

                return (
                    <div className="text-left font-medium items-center flex gap-2">
                        {name}
                        {isRecurring && <Repeat className="size-4" />}
                    </div>
                );
            },
        },
        {
            accessorKey: "amount",
            header: ({ column }) => {
                return (
                    <Button
                        className="ml-[-1rem]"
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }>
                        Amount
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("amount"));
                return (
                    <div className="text-left font-medium">
                        {formatEuro(amount)}
                    </div>
                );
            },
        },
        {
            accessorKey: "category",
            header: ({ column }) => {
                return (
                    <Button
                        className="ml-[-1rem]"
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }>
                        Category
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: "date",
            header: ({ column }) => {
                return (
                    <Button
                        className="ml-[-1rem]"
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }>
                        Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            filterFn: (row, _, filterValue) => {
                const dateStr = row.getValue("date") as string;
                const month = dateStr.split("-")[1];
                return filterValue.includes(month);
            },
            cell: ({ row }) => {
                const date = new Date(row.getValue("date"));
                const formatted = new Intl.DateTimeFormat("de-DE").format(date);

                return <div className="text-left font-medium">{formatted}</div>;
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                return <ActionsCell row={row} categories={categories} />;
            },
        },
    ];
}
