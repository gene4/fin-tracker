"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMediaQuery } from "@/lib/use-media-query";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Category, Expanse } from "@/types";
import { addExpanse, updateExpanse } from "@/actions";
import { Switch } from "./ui/switch";
import { DatePicker } from "./ui/date-picker";
import { format } from "date-fns";
import { useDialog } from "@/lib/dialog-context";

export function ExpanseModal() {
    const { isOpen, closeDialog, categories, defaultData } = useDialog();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={isOpen} onOpenChange={closeDialog}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            {defaultData ? "Edit" : "Add"} Expanse
                        </DialogTitle>
                        <DialogDescription>
                            {defaultData ? "Edit an" : "Add a new"} expanse
                        </DialogDescription>
                    </DialogHeader>
                    <ExpanseForm
                        categories={categories}
                        setOpen={closeDialog}
                        defaultData={defaultData}
                    />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={isOpen} onOpenChange={closeDialog}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>
                        {defaultData ? "Edit" : "Add"} Expanse
                    </DrawerTitle>
                    <DrawerDescription>
                        {defaultData ? "Edit an" : "Add a new"} expanse
                    </DrawerDescription>
                </DrawerHeader>
                <ExpanseForm
                    setOpen={closeDialog}
                    categories={categories}
                    defaultData={defaultData}
                    className="px-4"
                />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

function ExpanseForm({
    className,
    categories,
    defaultData,
    setOpen,
}: React.ComponentProps<"form"> & {
    categories: Category[];
    defaultData?: Expanse;
    setOpen: (open: boolean) => void;
}) {
    const [date, setDate] = React.useState<Date | undefined>(
        defaultData?.date || new Date()
    );
    const [loading, setLoading] = React.useState(false);

    const onSubmit = React.useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setLoading(true);
            const formData = new FormData(event.currentTarget);
            if (date) {
                // Add date to formData
                const formattedDate = format(date, "yyyy-MM-dd");
                formData.append("date", formattedDate);
            }

            if (defaultData) {
                defaultData?.id && formData.append("id", defaultData.id);
                await updateExpanse(formData);
            } else {
                await addExpanse(formData);
            }

            setOpen(false);
        },
        [setOpen, date, defaultData]
    );

    return (
        <form
            onSubmit={onSubmit}
            className={cn("grid items-start gap-4", className)}>
            <div className="flex gap-6">
                <div className="grid gap-2 flex-1">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        defaultValue={defaultData?.name}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="name">Recurring</Label>
                    <Switch
                        id="recurring"
                        name="recurring"
                        defaultChecked={defaultData?.is_recurring}
                    />
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                    step={0.01}
                    type="number"
                    id="amount"
                    name="amount"
                    defaultValue={defaultData?.amount}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select defaultValue={defaultData?.category} name="category">
                    <SelectTrigger className="h-9">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent side="top">
                        {categories.map((category) => (
                            <SelectItem key={category.id} value={category.name}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <DatePicker date={date} setDate={setDate} />
            </div>
            <Button loading={loading} type="submit">
                {defaultData ? "Edit" : "Add"} expanse
            </Button>
        </form>
    );
}
