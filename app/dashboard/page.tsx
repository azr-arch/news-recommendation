import { redirect } from "next/navigation";

import user from "@/models/user";
import { dbConnect } from "@/lib/connect-db";
import { currentUserId } from "@/lib/current-user";
import { IUser } from "@/lib/types";

import { News } from "../_components/news";

export default async function DashboarPage() {
    let currUser: IUser | null = null;
    const userId = await currentUserId();

    try {
        await dbConnect();

        // Fetch currentUser
        currUser = await user.findOne({ userId });
    } catch (error) {
        console.log("Error in dashboard page", error);
    }

    if (!currUser?.interests || !currUser?.country) {
        console.log("Please login again");
        redirect("/");
    }

    return (
        <div>
            <News data={{ interests: currUser.interests, country: currUser.country }} />
        </div>
    );
}
