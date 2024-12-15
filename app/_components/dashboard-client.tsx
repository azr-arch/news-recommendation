"use client";

import { logout } from "@/actions/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut } from "lucide-react";
import Image from "next/image";

export const DashboardClient = ({ data }: { data?: any }) => {
    return (
        <div>
            <div className="container mx-auto px-4 py-8 border-t border-neutral-400">
                <div className="flex items-center w-full justify-between mb-6 pb-5 border-b border-neutral-200">
                    <h1 className="text-3xl font-bold ">News Dashboard</h1>
                    <Button variant={"outline"} onClick={logout} title="Logout">
                        <LogOut />
                    </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {data.map((article: any) => (
                        <Card key={article.article_id} className="flex flex-col">
                            <CardHeader>
                                <CardTitle className="text-lg line-clamp-2">
                                    {article.title}
                                </CardTitle>
                            </CardHeader>
                            {article.image_url && (
                                <Image
                                    src={article.image_url}
                                    alt={article.title}
                                    width={100}
                                    height={40}
                                    className="w-full  object-cover"
                                />
                            )}
                            <CardContent className="flex-grow py-2">
                                <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                                    {article.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {article.category.map((cat: any) => (
                                        <Badge key={cat} variant="secondary">
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
                                    <a
                                        href={article.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Read More
                                    </a>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};
