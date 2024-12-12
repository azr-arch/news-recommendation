"use client";

import { categories } from "@/utils/lib";
import { InterestCategory } from "@/utils/types";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormData {
    name: string;
    age: number;
    location: string;
    interests: InterestCategory[];
}

const inputStyle = "px-4 py-2 rounded-md";

export const UserForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log("Form Data:", data);
    };

    const selectedInterests = watch("interests", []);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className=" mx-auto bg-white p-6 rounded-lg shadow-md "
        >
            <h1 className="text-xl font-bold text-gray-700 text-center">User Interest Form</h1>

            {/* Name Field */}
            <div className="space-y-2 my-3">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    className="px-4   border border-gray-300 py-2 mt-1 block w-full  rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                    <p className="text-red-400 text-xs font-medium mt-1">{errors.name.message}</p>
                )}
            </div>

            <div className="flex justify-between gap-x-5 ">
                {/* Age Field */}
                <div className="space-y-2 my-3">
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                        Age
                    </label>
                    <input
                        id="age"
                        type="number"
                        className="px-4 max-w-[80px] border border-gray-300 py-2 mt-1 block w-full  rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        {...register("age", {
                            required: "Age is required",
                            min: { value: 1, message: "Age must be greater than 0" },
                        })}
                    />
                    {errors.age && (
                        <p className="text-red-400 font-medium text-xs mt-1">
                            {errors.age.message}
                        </p>
                    )}
                </div>
                {/* Location Field */}
                <div className="grow space-y-2 my-3">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location
                    </label>
                    <input
                        id="location"
                        type="text"
                        className="px-4 border border-gray-300 py-2 mt-1 block w-full  rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        {...register("location", { required: "Location is required" })}
                    />
                    {errors.location && (
                        <p className="text-red-400 text-xs font-medium mt-1">
                            {errors.location.message}
                        </p>
                    )}
                </div>
            </div>

            {/* Interest Categories */}
            <div className="space-y-2 my-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interest Categories (Choose 1 to 5)
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {categories.map((category) => (
                        <label key={category} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                value={category}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                {...register("interests", {
                                    validate: {
                                        max: (value) =>
                                            value.length <= 5 ||
                                            "You can select up to 5 categories",
                                        min: (value) =>
                                            value.length > 0 ||
                                            "At least one category must be selected",
                                    },
                                })}
                            />
                            <span className="text-sm  capitalize text-neutral-700">{category}</span>
                        </label>
                    ))}
                </div>
                {errors.interests && (
                    <p className="text-red-400 text-xs mt-1 font-medium ">
                        {errors.interests.message}
                    </p>
                )}
            </div>

            <button
                type="submit"
                className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Submit
            </button>
        </form>
    );
};
