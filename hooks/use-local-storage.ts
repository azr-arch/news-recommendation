import { useState } from "react";

type User = {
    name: string;
    country: string;
    [key: string]: any;
};

type RegistrationResponse = {
    status: "success" | "error";
    message: string;
};

type UseUserRegistrationReturnType = {
    registerUser: (key: string, user: User) => RegistrationResponse;
    getUsersByKey: (key: string) => User[];
};

export const useUserRegistration = (): UseUserRegistrationReturnType => {
    const [storage, setStorage] = useState<Record<string, User[]>>(() => {
        if (typeof window === "undefined") return {}; // Prevent SSR issues
        try {
            const data = localStorage.getItem("userStorage");
            return data ? JSON.parse(data) : {};
        } catch {
            return {};
        }
    });

    const updateLocalStorage = (newStorage: Record<string, User[]>) => {
        setStorage(newStorage);
        localStorage.setItem("userStorage", JSON.stringify(newStorage));
    };

    const registerUser = (key: string, user: User): RegistrationResponse => {
        if (!user.name) {
            return { status: "error", message: "Name is required for registration." };
        }

        const existingUsers = storage[key] || [];
        if (existingUsers.some((existingUser) => existingUser.name === user.name)) {
            return {
                status: "error",
                message: `User with the name "${user.name}" is already registered.`,
            };
        }

        const updatedUsers = [...existingUsers, user];
        updateLocalStorage({ ...storage, [key]: updatedUsers });

        return { status: "success", message: "User registered successfully." };
    };

    const getUsersByKey = (key: string): User[] => {
        return storage[key] || [];
    };

    return { registerUser, getUsersByKey };
};
