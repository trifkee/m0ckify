import createNextIntlPlugin from "next-intl/plugin";
import path from "path";
import { fileURLToPath } from "url";
import injectWhyDidYouRender from "./lib/testing/wdyr.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "ui/styles")],
  },
  webpack: (config, context) => {
    injectWhyDidYouRender(config);
    return config;
  },
};

export default withNextIntl(nextConfig);
