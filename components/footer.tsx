export const Footer = () => {
    return (
        <footer className="py-6 md:px-8 md:py-0 w-full bg-black mt-auto ">
            {/* <Separator /> */}
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-center text-sm leading-loose text-white md:text-left">
                    © {new Date().getFullYear()} News Dashboard. All rights reserved.
                </p>
                <nav className="flex items-center space-x-4 text-sm">
                    <a href="#" className="text-white hover:underline">
                        About
                    </a>
                    <a href="#" className="text-white hover:underline">
                        Privacy Policy
                    </a>
                    <a href="#" className="text-white hover:underline">
                        Terms of Service
                    </a>
                </nav>
            </div>
        </footer>
    );
};
