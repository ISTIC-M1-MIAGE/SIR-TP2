import type {NextConfig} from "next";
import packageJson from './package.json';

const nextConfig: NextConfig = {
    /* config options here */
    env: {
        APP_VERSION: packageJson.version,
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '100mb',
        },
    },
};

export default nextConfig;
