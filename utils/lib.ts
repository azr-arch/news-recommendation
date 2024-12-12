import { InterestCategory } from "./types";

export const hasFilledForm = () => {
    const userData = localStorage.getItem("userData");

    if (userData) return true;
    return false;
};

export const categories: InterestCategory[] = [
    "business",
    "crime",
    "domestic",
    "education",
    "entertainment",
    "environment",
    "food",
    "health",
    "lifestyle",
    "other",
    "politics",
    "science",
    "sports",
    "technology",
    "top",
    "tourism",
    "world",
];
