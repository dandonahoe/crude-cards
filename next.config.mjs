// const apiUrl = url => `/api/${url.toLowerCase().trim()}`;


/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: true,
    reactStrictMode: true,

    eslint: {
        dirs: [
            'src',
        ],
    },

    rewrites: () => [{
        destination: '/game',
        source: '/game/:gameCode',
    }],
};


export default nextConfig;
