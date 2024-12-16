import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export const NewsHeader = () => {
    return (
        <div className="flex items-center w-full justify-between mb-6 pb-5 border-b border-neutral-200">
            <h1 className="text-3xl font-bold ">News Dashboard</h1>
            <Button variant={"outline"} onClick={logout} title="Logout">
                <LogOut />
            </Button>
        </div>
    );
};
