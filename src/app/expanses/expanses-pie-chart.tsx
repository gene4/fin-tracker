"use client";

import * as React from "react";
import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Expanse } from "@/types";
import { formatEuro } from "@/lib/utils";

type CategoryTotal = { category: string; total: number; fill: string };

export function ExpansesPieChart({ data }: { data: Expanse[] }) {
    const normalizeCategory = (category: string) =>
        category.toLowerCase().replace(/\s+/g, "-"); // Replace spaces with dashes
    const { chartData, chartConfig } = React.useMemo(() => {
        const categoryTotals: CategoryTotal[] = Object.values(
            data.reduce((acc, expense) => {
                const normalizedCategory = normalizeCategory(expense.category);
                if (!acc[normalizedCategory]) {
                    acc[normalizedCategory] = {
                        category: expense.category, // Keep original for display
                        total: 0,
                        fill: `var(--color-${normalizedCategory})`,
                    };
                }
                acc[normalizedCategory].total += expense.amount;
                return acc;
            }, {} as Record<string, CategoryTotal>)
        ).sort((a, b) => b.total - a.total);

        const config = categoryTotals.reduce((acc, item, index) => {
            const normalizedCategory = normalizeCategory(item.category);
            acc[normalizedCategory] = {
                label: item.category, // Use original name for labels
                color: `hsl(var(--chart-${index + 1}))`,
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
        <div className="flex flex-col lg:flex-row gap-4 ">
            <Card className="flex flex-col flex-1">
                <CardHeader className="items-center">
                    <CardTitle>Expanses By Category</CardTitle>
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
                                        backgroundColor:
                                            chartConfig[
                                                normalizeCategory(
                                                    entry.category
                                                )
                                            ].color,
                                    }}
                                    className={`rounded-xl size-3`}
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
