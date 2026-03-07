/** @type {import('next').NextConfig} */
const nextConfig = {
    devIndicators: {
        buildActivity: false,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
