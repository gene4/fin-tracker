"use client";

import { Category, Expanse } from "@/types";
import { createContext, useContext, useState, type ReactNode } from "react";

type DialogContextType = {
    isOpen: boolean;
    openDialog: () => void;
    closeDialog: () => void;
    categories: Category[];
    setCategories: (categories: Category[]) => void;
    defaultData?: Expanse;
    setDefaultData: (expanse: Expanse) => void;
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export function DialogProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [defaultData, setDefaultData] = useState<Expanse>();

    const openDialog = () => setIsOpen(true);
    const closeDialog = () => setIsOpen(false);

    return (
        <DialogContext.Provider
            value={{
                isOpen,
                openDialog,
                closeDialog,
                categories,
                setCategories,
                defaultData,
                setDefaultData,
            }}>
            {children}
        </DialogContext.Provider>
    );
}

export function useDialog() {
    const context = useContext(DialogContext);
    if (context === undefined) {
        throw new Error("useDialog must be used within a DialogProvider");
    }
    return context;
}
