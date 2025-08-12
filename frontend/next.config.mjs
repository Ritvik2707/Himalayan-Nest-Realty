/** @type {import('next').NextConfig} */
const nextConfig = {
    "images": {
        remotePatterns: [
            {
                protocol: process.env.NODE_ENV == 'production' ? 'https' : 'http',
                hostname: process.env.NEXT_PUBLIC_IMAGE_DOMAIN || 'localhost',
                pathname: '/api/uploads/**',
            },
        ],
    }
};

export default nextConfig;
