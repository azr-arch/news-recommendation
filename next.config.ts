import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "http", // Allow both HTTP
                hostname: "**", // Allow any hostname
            },
            {
                protocol: "https", // Allow HTTPS as well
                hostname: "**", // Allow any hostname
            },
        ],
    },
};

export default nextConfig;
