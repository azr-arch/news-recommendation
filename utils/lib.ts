import { InterestCategory } from "./types";

export const hasFilledForm = () => {
    const userData = localStorage.getItem("userData");

    if (userData) return true;
    return false;
};

export const categories: { id: InterestCategory; label: String }[] = [
    {
        id: "business",
        label: "Business",
    },
    {
        id: "crime",
        label: "Crime",
    },
    {
        id: "domestic",
        label: "Domestic",
    },
    {
        id: "education",
        label: "Domestic",
    },
    {
        id: "entertainment",
        label: "Entertainment",
    },
    {
        id: "environment",
        label: "Environment",
    },
    {
        id: "food",
        label: "Food",
    },
    {
        id: "health",
        label: "Health",
    },
    {
        id: "lifestyle",
        label: "Lifestyle",
    },
    {
        id: "other",
        label: "Other",
    },
    {
        id: "politics",
        label: "Politics",
    },
    {
        id: "science",
        label: "Science",
    },
    {
        id: "sports",
        label: "Sports",
    },
    {
        id: "technology",
        label: "Technology",
    },
    {
        id: "top",
        label: "Top",
    },
    {
        id: "tourism",
        label: "Tourism",
    },
    {
        id: "world",
        label: "World",
    },
];
