"use client";

import * as React from "react";
import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import type { Expanse } from "@/types";
import { formatEuro } from "@/lib/utils";

type CategoryTotal = { category: string; total: number; fill: string };

const CHART_COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "hsl(var(--chart-6))",
    "hsl(var(--chart-7))",
    "hsl(var(--chart-8))",
];

export function ExpansesPieChart({ data }: { data: Expanse[] }) {
    const { chartData, chartConfig } = React.useMemo(() => {
        const categoryTotals: CategoryTotal[] = Object.values(
            data.reduce((acc, expense) => {
                if (!acc[expense.category]) {
                    acc[expense.category] = {
                        category: expense.category,
                        total: 0,
                        fill: "",
                    };
                }
                acc[expense.category].total += expense.amount;
                return acc;
            }, {} as Record<string, CategoryTotal>)
        ).sort((a, b) => b.total - a.total);

        // Assign colors to categories
        categoryTotals.forEach((item, index) => {
            item.fill = CHART_COLORS[index % CHART_COLORS.length];
        });

        const config = categoryTotals.reduce((acc, item) => {
            acc[item.category] = {
                label: item.category,
                color: item.fill,
            };
            return acc;
        }, {} as ChartConfig);

        return {
            chartData: categoryTotals,
            chartConfig: config,
        };
    }, [data]);

    const total = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.total, 0);
    }, [chartData]);

    return (
        <div className="flex flex-col lg:flex-row gap-4">
            <Card className="flex flex-col flex-1">
                <CardHeader className="items-center">
                    <CardTitle>Expenses By Category</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square max-h-[250px]">
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                                data={chartData}
                                dataKey="total"
                                nameKey="category"
                            />
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card className="flex flex-col flex-1">
                <CardHeader className="items-center">
                    <CardTitle>Category Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                    {chartData.map((entry) => (
                        <div
                            key={entry.category}
                            className="w-full flex justify-between">
                            <div className="flex items-center gap-2">
                                <div
                                    style={{
                                        backgroundColor: entry.fill,
                                    }}
                                    className="rounded-xl size-3"
                                />
                                <p>{entry.category}</p>
                            </div>
                            <p>{formatEuro(entry.total)}</p>
                        </div>
                    ))}
                    <div className="mt-auto pt-4">
                        <p>
                            Total: <b>{formatEuro(total)}</b>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
