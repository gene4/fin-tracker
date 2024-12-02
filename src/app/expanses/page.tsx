import { createClient } from "@/utils/supabase/server";
import { auth } from "@clerk/nextjs/server";
import { Expanse } from "@/types";
import { ExpensesDashboard } from "./expanses-dashboard";

export default async function Page() {
    const supabase = await createClient();

    const { userId } = await auth();

    const { data: expanses } = await supabase
        .from("expanses")
        .select()
        .eq("user_id", userId);

    return <ExpensesDashboard initialExpenses={expanses as Expanse[]} />;
}
