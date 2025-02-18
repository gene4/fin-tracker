"use client";

import { useMemo, useState } from "react";
import { ExpansesBarChart } from "./expanses-bar-chart";
import { ExpansesPieChart } from "./expanses-pie-chart";
import { MonthSelect } from "@/components/month-select";
import { Expanse } from "@/types";

const currentDate = new Date();
const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");

export function ExpensesDashboard({
    initialExpenses,
}: {
    initialExpenses: Expanse[];
}) {
    const [month, setMonth] = useState(currentMonth);

    const filteredExpanses = useMemo(() => {
        // Filter expanses by month
        const filtered = initialExpenses.filter((expense) => {
            const date = expense.date.toString();
            const expanseMonth = date.split("-")[1];
            return expanseMonth.includes(month);
        });

        return filtered;
    }, [initialExpenses, month]);

    return (
        <>
            <div className="flex items-center gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
                <MonthSelect
                    onValueChange={setMonth}
                    currentMonth={currentMonth}
                />
            </div>
            <ExpansesPieChart data={filteredExpanses} />
            <ExpansesBarChart data={initialExpenses} />
        </>
    );
}
