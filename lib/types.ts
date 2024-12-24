export type InterestCategory =
    | "business"
    | "general"
    | "entertainment"
    | "health"
    | "science"
    | "sports"
    | "technology";

export interface IUser {
    userId: string;
    name: string;
    country: string;
    interests: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IArticle {
    title?: string;
    url?: string;
    description?: string;
    image?: string;
    source?: string;
    language?: string;
    country?: string;
    category?: string;
    published_at?: string;
    author?: string;
}

export interface LoginFormData {
    name: string;
    age: number;
    country: string;
    interests: string[];
}
