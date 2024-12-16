import "server-only";
import { cookies } from "next/headers";

export async function addToCookies(userId: string) {
    const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
    const cookieStore = await cookies();

    cookieStore.set("userId", userId, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: "lax",
        path: "/",
    });
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete("userId");
}
