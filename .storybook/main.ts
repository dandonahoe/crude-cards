import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
    stories: [
        "../src/**/*.mdx",
        "../src/**/stories.@(js|jsx|mjs|ts|tsx)"
    ],

    addons: [
        "@storybook/addon-onboarding",
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@chromatic-com/storybook",
        "@storybook/addon-interactions",
        "@storybook/addon-mdx-gfm"
    ],

    framework: {
        name: "@storybook/nextjs",
        options: {},
    },

    docs: {},

    staticDirs: [
        "../public"
    ],

    core : {
        disableTelemetry: true,
        enableCrashReports: false, // 👈 Appends the crash reports to the telemetry events

    },

    typescript: {
        reactDocgen: "react-docgen-typescript"
    }
};

export default config;
