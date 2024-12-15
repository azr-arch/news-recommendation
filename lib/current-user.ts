import { cookies } from "next/headers";
import { cache } from "react";
import { decrypt } from "./session";
import { redirect } from "next/navigation";
import { dbConnect } from "./connect-db";
import mongoose from "mongoose";
import user from "@/models/user";

export const verifySession = cache(async () => {
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);

    if (!session?.userId) {
        redirect("/");
    }

    return { userId: session.userId };
});

export const getUser = cache(async () => {
    const session = await verifySession();

    if (!session) return null;

    try {
        await dbConnect();
        const currUser = await user.findOne({ name: session.userId });

        return currUser;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
});
