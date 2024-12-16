import { cookies } from "next/headers";

export const currentUserId = async () => {
    return (await cookies()).get("userId")?.value || "";
};
