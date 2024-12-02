import { DataTable } from "@/app/expanses/data-table";
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
        <div>
            <h1 className="text-3xl font-bold tracking-tight">All Expanses</h1>
            <div className="container mx-auto py-10">
                <DataTable
                    data={expanses || []}
                    categories={(categories as Category[]) || []}
                />
            </div>
        </div>
    );
}
