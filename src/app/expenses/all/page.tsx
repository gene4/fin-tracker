import { DataTable } from "@/app/expenses/data-table";
import { createClient } from "@/utils/supabase/server";
import { auth } from "@clerk/nextjs/server";
import { Category } from "@/types";

export default async function Page() {
    const supabase = await createClient();

    const { userId } = await auth();

    const { data: expanses } = await supabase
        .from("expanses")
        .select()
        .eq("user_id", userId);

    const { data: categories } = await supabase
        .from("categories")
        .select()
        .order("name", { ascending: true });

    return (
        <div className="container mx-auto py-5">
            <h1 className="text-3xl font-bold tracking-tight pb-10">
                All Expenses
            </h1>
            <div className="">
                <DataTable
                    data={expanses || []}
                    categories={(categories as Category[]) || []}
                />
            </div>
        </div>
    );
}
