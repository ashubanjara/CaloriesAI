import { Navbar } from "@/components/navbar";
import {Divider} from "@nextui-org/divider";

export default function DefaultLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex flex-col h-screen">
            <Navbar />
            <Divider/>
            <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
                {children}
            </main>
            <footer className="w-full flex items-center justify-center py-3">
                <div className="flex items-center gap-1 text-current">
                    <span className="text-default-600">AB</span>
                    <p className="text-primary">Nutrition AI</p>
                </div>
            </footer>
        </div>
    );
}
