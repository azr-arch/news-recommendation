import { Footer } from "@/components/footer";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-full flex flex-col items-start">
            {children}
            <Footer />
        </div>
    );
}
