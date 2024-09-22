import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
    stories: [
        "../src/**/*.mdx",
        "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
    ],
    addons: [
        "@storybook/addon-onboarding",
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@chromatic-com/storybook",
        "@storybook/addon-interactions",
        "storybook-css-modules", // 👈 The addon registered here
    ],
    framework: {
        name: "@storybook/nextjs",
        options: {},
    },
    staticDirs: [
        "../public"
    ],
};
export default config;
