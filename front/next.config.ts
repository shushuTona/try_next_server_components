import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: ["localhost:8080"],
        }
    }
};

export default nextConfig;
