import { createClient } from "@/utils/supabase/server";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Page() {
    const supabase = await createClient();

    // Get the userId from auth() -- if null, the user is not signed in
    const { userId } = await auth();

    // Get the Backend API User object when you need access to the user's information
    const user = await currentUser();
    const { data: expanses } = await supabase
        .from("expanses")
        .select()
        .eq("user_id", userId);

    // Use `user` to render user details or create UI elements

    return <pre></pre>;
}
