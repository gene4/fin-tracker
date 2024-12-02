import { useCallback, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { X } from "lucide-react";

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

    const handleClear = useCallback(() => {
        setSelectedValue(undefined);
        onValueChange("");
    }, [onValueChange]);
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
            {selectedValue && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={handleClear}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Clear selection</span>
                </Button>
            )}
        </Select>
    );
};
