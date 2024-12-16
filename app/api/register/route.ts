import { dbConnect } from "@/lib/connect-db";
import { addToCookies } from "@/lib/session";
import user from "@/models/user";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
    try {
        // Parse the JSON body from the request
        const data = await req.json();

        // Validate the incoming data
        const { name, age, country, interests } = data;

        if (!name || !age || !country || !interests) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }

        await dbConnect();
        const userId = uuidv4();

        const newUser = new user({
            userId,
            name,
            country,
            interests,
        });

        await newUser.save();
        await addToCookies(userId);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error in registration API:", error);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}
