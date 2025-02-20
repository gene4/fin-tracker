"use client";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Category, Expanse } from "@/types";
import { deleteExpanse } from "@/actions";
import { useDialog } from "@/lib/dialog-context";

export const ActionsCell = ({
    row,
    categories,
}: {
    row: Row<Expanse>;
    categories: Category[];
}) => {
    const expanse = row.original;
    const [open, setOpen] = useState(false);
    const { openDialog, setCategories, setDefaultData } = useDialog();

    const onDelete = () => {
        deleteExpanse(expanse.id);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem asChild className="justify-between">
                        <Button
                            onClick={() => {
                                setCategories(categories);
                                setDefaultData(expanse);
                                openDialog();
                            }}
                            className="w-full justify-between px-2"
                            variant={"ghost"}>
                            Edit
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </DropdownMenuItem>
                    <DialogTrigger asChild>
                        <DropdownMenuItem
                            onClick={() => setOpen(true)}
                            className="justify-between focus:bg-destructive">
                            Delete <Trash2 className="h-4 w-4" />
                        </DropdownMenuItem>
                    </DialogTrigger>
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Are you sure you want to delete this expanse?
                    </DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete the expanse record and remove it from our
                        servers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={onDelete}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
