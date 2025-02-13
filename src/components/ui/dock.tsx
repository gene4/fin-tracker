"use client";

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState, type ReactNode } from "react"; // Added ReactNode import

export const FloatingDock = ({
    items,
    className,
}: {
    items: { title: string; icon: ReactNode; href: string }[]; // Changed React.ReactNode to ReactNode
    className?: string;
}) => {
    return (
        <>
            <FloatingDockMobile items={items} className={className} />
        </>
    );
};

const FloatingDockMobile = ({
    items,
    className,
}: {
    items: { title: string; icon: ReactNode; href: string }[]; // Changed React.ReactNode to ReactNode
    className?: string;
}) => {
    const [open, setOpen] = useState(false);
    return (
        <div className={cn("relative block", className)}>
            <AnimatePresence>
                {open && (
                    <motion.div
                        layoutId="nav"
                        className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2">
                        {items.map((item, idx) => (
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
                                    delay: (items.length - 1 - idx) * 0.05,
                                }}>
                                <Link
                                    href={item.href}
                                    onClick={() =>
                                        setTimeout(() => setOpen(false), 200)
                                    }>
                                    <motion.div
                                        className="h-10 w-10 rounded-full bg-sidebar-accent active:bg-primary transition-all flex items-center justify-center"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 10,
                                        }}>
                                        <div className="h-4 w-4 text-sidebar-accent-foreground">
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
                className="h-10 w-10 rounded-full bg-sidebar-accent flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}>
                <IconLayoutNavbarCollapse className="h-5 w-5 text-sidebar-accent-foreground" />
            </motion.button>
        </div>
    );
};

export default FloatingDock;
