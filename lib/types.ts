export type InterestCategory =
    | "business"
    | "crime"
    | "domestic"
    | "education"
    | "entertainment"
    | "environment"
    | "food"
    | "health"
    | "lifestyle"
    | "other"
    | "politics"
    | "science"
    | "sports"
    | "technology"
    | "top"
    | "tourism"
    | "world";

export interface IUser {
    userId: string;
    name: string;
    country: string;
    interests: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IArticle {
    article_id?: string;
    title?: string;
    link?: string;
    keywords?: string[];
    creator?: string[];
    video_url?: string | null;
    description?: string;
    content?: string;
    pubDate: string;
    pubDateTZ?: string;
    image_url?: string;
    source_id?: string;
    source_priority?: number;
    source_name?: string;
    source_url?: string;
    source_icon?: string;
    language?: string;
    country?: string[];
    category?: string[];
    ai_tag?: string;
    sentiment?: string;
    sentiment_stats?: string;
    ai_region?: string;
    ai_org?: string;
    duplicate?: boolean;
}

export interface LoginFormData {
    name: string;
    age: number;
    country: string;
    interests: string[];
}
