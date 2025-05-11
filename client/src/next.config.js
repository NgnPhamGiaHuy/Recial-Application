/** @type {import("next").NextConfig} */
const nextConfig = {
    webpack(config, { isServer }) {
        const prefix = config.assetPrefix ?? config.basePath ?? '';
        config.module.rules.push({
            test: /\.mp4$/,
            use: [{
                loader: "file-loader",
                options: {
                    publicPath: `${prefix}/_next/static/media/`,
                    outputPath: `${isServer ? "../" : ''}static/media/`,
                    name: "[name].[hash].[ext]",
                },
            }],
        });

        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "example.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "storage.cloud.google.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "cdn.jsdelivr.net",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "storage.googleapis.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "cloudflare-ipfs.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "loremflickr.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "picsum.photos",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "scontent.fsgn2-10.fna.fbcdn.net",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "scontent.fsgn2-11.fna.fbcdn.net",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "scontent.fsgn2-5.fna.fbcdn.net",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "static.xx.fbcdn.net",
                pathname: "**",
            },
        ],
    },

    reactStrictMode: true,
}

module.exports = nextConfig
