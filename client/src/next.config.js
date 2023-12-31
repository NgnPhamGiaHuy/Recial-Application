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
        domains: ["storage.cloud.google.com", "storage.googleapis.com", "firebasestorage.googleapis.com", "lh3.googleusercontent.com", "cloudflare-ipfs.com", "loremflickr.com", "picsum.photos", "avatars.githubusercontent.com"],
    },
    reactStrictMode: true,
}

module.exports = nextConfig
