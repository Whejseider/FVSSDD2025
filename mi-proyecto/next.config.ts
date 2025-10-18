import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        remotePatterns: [new URL("https://raw.githubusercontent.com/PokeAPI/**")]
    },
};

export default nextConfig;
