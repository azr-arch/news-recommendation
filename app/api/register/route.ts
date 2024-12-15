// api/register/route.ts

import { dbConnect } from "@/lib/connect-db";
import { createSession } from "@/lib/session";
import user from "@/models/user";
import { NextResponse } from "next/server";

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

        const userData = new user({
            name,
            country,
            age,
            interests,
        });

        await userData.save();
        console.log("Registering user : ", name);

        await createSession(name);
        console.log("Creating session");

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error in registration API:", error);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}
