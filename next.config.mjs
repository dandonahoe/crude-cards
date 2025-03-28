/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: true,
    reactStrictMode: true,

    eslint: {
        dirs: ['src'],
    },

    headers: async () => {
        const headers = [
            {
                key: 'Strict-Transport-Security',
                value: 'max-age=63072000; includeSubDomains; preload',
            },
            {
                key: 'X-Content-Type-Options',
                value: 'nosniff',
            },
            {
                key: 'X-Frame-Options',
                value: 'SAMEORIGIN',
            },
            {
                key: 'Referrer-Policy',
                value: 'strict-origin-when-cross-origin',
            },
            {
                key: 'Permissions-Policy',
                value: 'microphone=(self), camera=(), geolocation=(), interest-cohort=()',
            },
        ];

        if (process.env.NODE_ENV === 'production') {
            headers.push({
                key: 'Content-Security-Policy',
                value: [
                    "connect-src 'self' https://api.crude.cards wss://api.crude.cards:12345;",
                    "script-src 'self' 'unsafe-inline';",
                    "style-src 'self' 'unsafe-inline';",
                    "img-src 'self' data: blob:;",
                    "frame-ancestors 'none';",
                    "default-src 'self';",
                    "object-src 'none';",
                    "font-src 'self';",
                    "base-uri 'self';",
                ].join(' '),
            });
        } else {
            // allow https://www.googletagmanager.com


            headers.push({
                key: 'Content-Security-Policy',
                value: [
                    "connect-src 'self' http://api.crude.local:12345 ws://api.crude.local:12345 https:/www.googletagmanager.com;",
                    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com;",
                    "style-src 'self' 'unsafe-inline';",
                    "img-src 'self' data: blob:;",
                    "frame-ancestors 'none';",
                    "default-src 'self';",
                    "object-src 'none';",
                    "font-src 'self';",
                    "base-uri 'self';",
                ].join(' '),
            });
        }

        return [
            {
                source: '/(.*)',
                headers,
            },
        ];
    },

    rewrites: () => [
        {
            destination: '/game',
            source: '/game/:gameCode',
        },
    ],
};

export default nextConfig;
