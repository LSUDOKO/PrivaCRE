/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["lh3.googleusercontent.com"],
    },
    webpack: (config) => {
        // Suppress optional peer dependency warnings from wagmi connectors
        // These connector packages (@metamask/sdk, porto, @walletconnect/ethereum-provider, etc.)
        // are optional - wagmi/rainbowkit still work without them for basic usage.
        config.resolve = config.resolve || {};
        config.resolve.fallback = {
            ...config.resolve.fallback,
            "@metamask/sdk": false,
            "porto": false,
            "porto/internal": false,
            "@safe-global/safe-apps-sdk": false,
            "@safe-global/safe-apps-provider": false,
            "@walletconnect/ethereum-provider": false,
            "@base-org/account": false,
            "@coinbase/wallet-sdk": false,
        };
        return config;
    },
};

export default nextConfig;
