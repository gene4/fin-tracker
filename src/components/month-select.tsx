"use client";

import { useCallback, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

const months = [
    { label: "January", value: "01" },
    { label: "February", value: "02" },
    { label: "March", value: "03" },
    { label: "April", value: "04" },
    { label: "May", value: "05" },
    { label: "June", value: "06" },
    { label: "July", value: "07" },
    { label: "August", value: "08" },
    { label: "September", value: "09" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
];
export const MonthSelect = ({
    onValueChange,
    defaultValue,
}: {
    onValueChange: (value: string) => void;
    defaultValue?: string;
}) => {
    const [selectedValue, setSelectedValue] = useState<string>();

    const handleValueChange = useCallback(
        (value: string) => {
            setSelectedValue(value);
            onValueChange(value);
        },
        [onValueChange]
    );

    return (
        <Select
            defaultValue={defaultValue}
            onValueChange={handleValueChange}
            name="month"
            value={selectedValue}>
            <SelectTrigger>
                <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent side="top">
                {months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                        {month.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
