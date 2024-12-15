"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { countries } from "@/utils/countries";
import { categories } from "@/utils/lib";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface LoginFormData {
    name: string;
    age: number;
    country: string;
    interests: string[];
}

export const LoginForm = () => {
    const [error, setError] = useState<null | string>(null);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>();

    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
        try {
            const parsedData = JSON.stringify(data);

            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: parsedData,
            });

            const result = await res.json();

            if (!result?.success) {
                alert("Login failed");
                return;
            }

            router.push("/dashboard");
        } catch (err) {
            console.log("Something went wrong while registering user..", err);
        }
    };

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl">Login for News Recommendations</CardTitle>
                <CardDescription>
                    Please fill in your details to get personalized news.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                {error && <p className="text-sm text-destructive text-center">{error}</p>}

                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" {...register("name", { required: "Name is required" })} />
                        {errors.name && (
                            <p className="text-sm text-destructive">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Controller
                            name="country"
                            control={control}
                            rules={{ required: "Country is required" }}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {countries.map((country) => (
                                            <SelectItem key={country.code} value={country.code}>
                                                {country.name}, {country.code}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.country && (
                            <p className="text-sm text-destructive">{errors.country.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input
                            id="age"
                            type="number"
                            {...register("age", {
                                required: "Age is required",
                                min: { value: 13, message: "You must be at least 13 years old" },
                                max: { value: 100, message: "Please enter a valid age" },
                            })}
                        />
                        {errors.age && (
                            <p className="text-sm text-destructive">{errors.age.message}</p>
                        )}
                    </div>

                    <div className="space-y-3">
                        <Label>Interests (select 1-5)</Label>
                        <div className="grid grid-cols-3 gap-2">
                            <Controller
                                name="interests"
                                control={control}
                                rules={{
                                    required: "Please select at least one interest",
                                    validate: (value) =>
                                        (value && value.length >= 1 && value.length <= 5) ||
                                        "Please select between 1 and 5 interests",
                                }}
                                render={({ field }) => (
                                    <>
                                        {categories.map((category) => (
                                            <div
                                                key={category.id}
                                                className="flex items-center space-x-2"
                                            >
                                                <Checkbox
                                                    id={category.id}
                                                    checked={field.value?.includes(category.id)}
                                                    onCheckedChange={(checked) => {
                                                        const updatedInterests = checked
                                                            ? [...(field.value || []), category.id]
                                                            : (field.value || []).filter(
                                                                  (i: string) => i !== category.id
                                                              );
                                                        field.onChange(updatedInterests);
                                                    }}
                                                />
                                                <Label htmlFor={category.id}>
                                                    {category.label}
                                                </Label>
                                            </div>
                                        ))}
                                    </>
                                )}
                            />
                        </div>
                        {errors.interests && (
                            <p className="text-sm text-destructive">{errors.interests.message}</p>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="space-x-2">
                    <Button disabled={isSubmitting} type="submit" className="w-full">
                        Login
                    </Button>
                    <Button
                        disabled={isSubmitting}
                        onClick={() => {
                            setError(null);
                            reset();
                        }}
                        variant={"outline"}
                        type="button"
                        className="w-full"
                    >
                        Reset
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};
