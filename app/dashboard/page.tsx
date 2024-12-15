import { getUser } from "@/lib/current-user";
import { DashboardClient } from "../_components/dashboard-client";

export default async function DashboarPage() {
    let data: any;

    try {
        const currUser = await getUser();

        // Building query
        const { country, interests } = currUser;

        // Construct the query using URLSearchParams
        const queryParams = new URLSearchParams({
            apikey: process.env.API_KEY || "",
            country,
            category: interests.join(","),
        });

        const apiUrl = `${process.env.NEWS_API}?${queryParams.toString()}`;

        const res = await fetch(apiUrl);
        const resData = await res.json();
        data = resData?.results;
    } catch (error) {
        console.log("Error in dashboard page");
    }

    return (
        <div>
            <DashboardClient data={data} />
        </div>
    );
}
