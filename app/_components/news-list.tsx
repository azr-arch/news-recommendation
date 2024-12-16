"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { initialData } from "@/lib/data";
import { IArticle } from "@/lib/types";
import { LoaderIcon } from "lucide-react";

// Path to fallback image
const fallbackImage = "/not-found.jpg";

function NewsItem({ article }: { article: IArticle }) {
    const [imageError, setImageError] = useState(false);

    return (
        <Card key={article.article_id} className="flex flex-col">
            <CardHeader>
                <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
            </CardHeader>
            <div className="relative aspect-ratio-box h-[250px]">
                {article.image_url ? (
                    <Image
                        src={imageError ? fallbackImage : article.image_url}
                        alt={article.title || ""}
                        fill
                        onError={() => setImageError(true)}
                        className="object-contain md:object-cover object-center"
                        sizes="(max-width: 768px) 90vw, (max-width: 1200px) 30vw, 13vw"
                    />
                ) : (
                    <Image
                        src={fallbackImage}
                        alt="Fallback Image"
                        fill
                        className="object-cover object-center"
                        role="img" // Accessibility for screen readers
                        aria-label="Fallback image" // Accessibility for screen readers
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                )}
            </div>
            <CardContent className="py-5 mt-auto">
                <p className="text-sm text-gray-600 mb-2 line-clamp-3">{article.description}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                    {article?.category?.map((cat) => (
                        <Badge key={cat} variant="secondary" className="shadow-md">
                            {cat}
                        </Badge>
                    ))}
                </div>
                <p className="text-xs text-gray-500">
                    Published: {new Date(article.pubDate).toLocaleDateString()}
                </p>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full">
                    <a href={article.link} target="_blank" rel="noopener noreferrer">
                        Read More
                    </a>
                </Button>
            </CardFooter>
        </Card>
    );
}

export function NewsList({ query }: { query: string }) {
    const [news, setNews] = useState<IArticle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const res = await fetch(query);
                const data = await res.json();

                // If API crashes then use already fetched data stored lib/data.ts
                console.log({ data });

                if (data.status === "success") {
                    setNews(data?.results);
                }

                setNews(initialData.results as IArticle[]);
            } catch (error) {
                console.log("Error fetching news", error);
                // Fallback to initial data
                setNews([]);
            } finally {
                setLoading(false); // Set loading to false when fetching is done
            }
        })();
    }, []);

    if (loading) {
        return <LoaderIcon className="animate-spin size-8 absolute top-1/2 left-1/2" />; // Display loading message
    }

    console.log({ news });

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {news.length <= 0 ? (
                <p className=" text-center ">No Articles found!, Please try again later.</p>
            ) : (
                news.map((article) => <NewsItem key={article.article_id} article={article} />)
            )}
        </div>
    );
}
