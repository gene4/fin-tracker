"use client";

import { useState } from "react";
import { ExpansesBarChart } from "./expanses-bar-chart";
import { ExpansesPieChart } from "./expanses-pie-chart";
import { MonthSelect } from "@/components/month-select";
import { Expanse } from "@/types";

export function ExpensesDashboard({
    initialExpenses,
}: {
    initialExpenses: Expanse[];
}) {
    const [filteredExpenses, setFilteredExpenses] = useState(initialExpenses);

    const handleMonthChange = (month: string) => {
        const filtered = initialExpenses.filter((expense) => {
            const date = expense.date.toString();
            const expanseMonth = date.split("-")[1];
            return expanseMonth.includes(month);
        });
        setFilteredExpenses(filtered);
    };

    return (
        <>
            <div className="flex items-center gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
                <MonthSelect onValueChange={handleMonthChange} />
            </div>
            <ExpansesPieChart data={filteredExpenses} />
            <ExpansesBarChart data={initialExpenses} />
        </>
    );
}
