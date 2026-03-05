import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
	outputFileTracingRoot: path.join(__dirname),
	async rewrites() {
		return [
			{
				// Proxy /api/backend/* → backend /api/*
				// Useful for client-side components that need to call the backend.
				// The request is forwarded server-side so secrets stay hidden.
				source: "/api/backend/:path*",
				destination: `${process.env.API_URL}/api/:path*`,
			},
		];
	},
};

export default nextConfig;
