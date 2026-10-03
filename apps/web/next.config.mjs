import path from 'node:path';
import { fileURLToPath } from 'node:url';
import bundleAnalyzer from '@next/bundle-analyzer';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
  reactStrictMode: false,
  output: 'standalone',
  // Пакеты монорепо отдаются исходниками (TS) — Next должен их транспилировать
  transpilePackages: ['@otc/contracts'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    // standalone-сборка в монорепо: трейсить зависимости от корня репозитория
    outputFileTracingRoot: path.join(dirname, '../../'),
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  webpack: (config) => {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
});
