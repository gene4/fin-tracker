"use client";

import { useDialog } from "@/lib/dialog-context";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import {
    IconLayoutNavbarCollapse,
    IconLayoutNavbarCollapseFilled,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { ChartColumn, Plus, Table } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const FloatingDock = ({ categories }: { categories: Category[] }) => {
    const { openDialog, setCategories } = useDialog();

    const dockItems = [
        {
            title: "Overview",
            icon: <ChartColumn className="h-full w-full" />,
            href: "/expenses",
        },
        {
            title: "List",
            icon: <Table className="h-full w-full" />,
            href: "/expenses/all",
        },
        {
            title: "Add Expense",
            icon: <Plus className="h-full w-full" />,
            href: "#",
            onClick: () => {
                setCategories(categories);
                openDialog();
            },
        },
    ];
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open) {
            document.addEventListener("mousedown", () => setOpen(false));
        }

        return () => {
            document.removeEventListener("mousedown", () => setOpen(false));
        };
    }, [open]);

    return (
        <div className={cn("relative block")}>
            <AnimatePresence>
                {open && (
                    <motion.div
                        layoutId="nav"
                        className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2">
                        {dockItems.map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: 10,
                                    transition: {
                                        delay: idx * 0.05,
                                    },
                                }}
                                transition={{
                                    delay: (dockItems.length - 1 - idx) * 0.05,
                                }}>
                                <Link onClick={item.onClick} href={item.href}>
                                    <motion.div
                                        className="size-12 rounded-full bg-sidebar-accent active:bg-primary hover:bg-primary transition-all flex items-center justify-center"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 10,
                                        }}>
                                        <div className="size-6 text-sidebar-accent-foreground">
                                            {item.icon}
                                        </div>
                                    </motion.div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.button
                onClick={() => setOpen(!open)}
                className="size-12 rounded-full bg-sidebar-accent flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}>
                {open ? (
                    <IconLayoutNavbarCollapseFilled className="size-7 text-sidebar-accent-foreground" />
                ) : (
                    <IconLayoutNavbarCollapse className="size-7 text-sidebar-accent-foreground" />
                )}
            </motion.button>
        </div>
    );
};

export default FloatingDock;
