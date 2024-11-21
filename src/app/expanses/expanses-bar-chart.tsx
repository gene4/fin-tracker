"use client";

import { TrendingUp } from "lucide-react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    XAxis,
    YAxis,
} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Expanse } from "@/types";
import { useMemo } from "react";
import { formatEuro } from "@/lib/utils";
import { format } from "date-fns";

const chartConfigs = {
    total: {
        label: "Total",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;
type MonthlyTotal = { month: string; total: number };
const DefaultMonthsList = [
    { month: "January", total: 0 },
    { month: "February", total: 0 },
    { month: "March", total: 0 },
    { month: "April", total: 0 },
    { month: "May", total: 0 },
    { month: "June", total: 0 },
    { month: "July", total: 0 },
    { month: "August", total: 0 },
    { month: "September", total: 0 },
    { month: "October", total: 0 },
    { month: "November", total: 0 },
    { month: "December", total: 0 },
];

export function ExpansesBarChart({ data }: { data: Expanse[] }) {
    const { chartData, chartConfig } = useMemo(() => {
        const monthlyTotals: MonthlyTotal[] = Object.values(
            data.reduce((acc, expense) => {
                const month = format(new Date(expense.date), "MMMM");

                if (!acc[month]) {
                    acc[month] = { month, total: 0 };
                }
                acc[month].total += expense.amount;

                return acc;
            }, {} as Record<string, MonthlyTotal>)
        );

        monthlyTotals.forEach((entry) => {
            const monthItem = DefaultMonthsList.find(
                (item) => item.month === entry.month
            );
            if (monthItem) {
                monthItem.total = entry.total;
            }
        });
        return {
            chartData: DefaultMonthsList,
            chartConfig: chartConfigs,
        };
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Expanses by month</CardTitle>
                <CardDescription>2023</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            // tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => formatEuro(value)}
                        />
                        <ChartTooltip
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar
                            dataKey="total"
                            stackId="a"
                            fill="var(--color-total)"
                            radius={6}>
                            {/* <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                                formatter={(value: number) => formatEuro(value)}
                            /> */}
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
