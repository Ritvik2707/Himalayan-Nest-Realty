/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '5000',
                pathname: '/uploads/**',
            },
            {
                protocol: 'https',
                hostname: process.env.NEXT_PUBLIC_IMAGE_DOMAIN,
                port: '',
                pathname: '/**',
            }
        ],
    },
    allowedDevOrigins: [process.env.NEXT_PUBLIC_CROSS_ORIGIN],
};

export default nextConfig;
