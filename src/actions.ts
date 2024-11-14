"use server";

import { auth } from "@clerk/nextjs/server";
import { createClient } from "./utils/supabase/server";
import { revalidatePath } from "next/cache";

export const addExpanse = async (formData: FormData) => {
    const supabase = await createClient();
    const { userId } = await auth();

    const name = formData.get("name") as string;
    const amount = parseFloat(formData.get("amount") as string);
    const category = formData.get("category") as string;
    const date = formData.get("date") as string;
    const is_recurring = Boolean(formData.get("recurring") as string);

    await supabase.from("expanses").insert([
        {
            name,
            amount,
            category,
            date,
            user_id: userId,
            is_recurring,
        },
    ]);

    revalidatePath("/expanses");
};

export const updateExpanse = async (formData: FormData) => {
    const supabase = await createClient();

    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const amount = parseFloat(formData.get("amount") as string);
    const category = formData.get("category") as string;
    const date = formData.get("date") as string;
    const is_recurring = Boolean(formData.get("recurring") as string);

    await supabase
        .from("expanses")
        .update([
            {
                name,
                amount,
                category,
                date,
                is_recurring,
            },
        ])
        .eq("id", id);

    revalidatePath("/expanses");
};

export const deleteExpanse = async (id: string) => {
    const supabase = await createClient();

    await supabase.from("expanses").delete().eq("id", id);

    revalidatePath("/expanses");
};
