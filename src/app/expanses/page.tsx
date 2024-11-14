import { createClient } from "@/utils/supabase/server";
import { auth } from "@clerk/nextjs/server";
import { ExpansesBarChart } from "./expanses-bar-chart";
import { Expanse } from "@/types";

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
        <>
            <h1 className="text-3xl font-bold tracking-tight">Expanses</h1>

            <ExpansesBarChart data={expanses as Expanse[]} />
        </>
    );
}
