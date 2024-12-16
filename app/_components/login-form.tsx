"use client";

import { useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginFormData } from "@/lib/types";
import { CountrySelect } from "./form-components/country-select";
import { InterestsSelect } from "./form-components/interest-select";

export const LoginForm = () => {
    const [error, setError] = useState<null | string>(null);
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>();
    const router = useRouter();

    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
        setError(null);
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
                reset();
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

                    <CountrySelect control={control} errors={errors} />
                    <InterestsSelect control={control} errors={errors} />
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
