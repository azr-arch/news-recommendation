import { NewsHeader } from "./news-header";
import { NewsList } from "./news-list";

export const News = ({ data }: { data: { interests: string[]; country: string } }) => {
    // Construct the query using URLSearchParams
    const queryParams = new URLSearchParams({
        access_key: process.env.API_KEY || "",
        categories: data.interests.join(","),
        countries: data.country,
        languages: "en",
    });

    const apiUrl = `${process.env.NEWS_API}?${queryParams.toString()}`;

    return (
        <div>
            <div className="container mx-auto px-4 py-8 border-t border-neutral-400">
                <NewsHeader />
                <NewsList query={apiUrl} />
            </div>
        </div>
    );
};
