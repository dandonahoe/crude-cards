import { valueToString } from "../test/TestUtil";
import * as dotenv from "dotenv";
import * as fs from "fs";

const envPath = "../../.env";

if (fs.existsSync(envPath)) dotenv.config({ path : envPath });
else console.error("Env file not found at the specified path");

describe("Environment Variables", () => {
    const requiredEnvVars = [
        "NEXT_PUBLIC_NEXT_COUNTDOWN_TIMER_DURATION_SECONDS",
        "NEXT_PUBLIC_BROWSER_WINDOW_LOCATION_ORIGIN",
        "NEXT_PUBLIC_IS_DEBUG_OVERLAY_VISIBLE",
        "NEXT_PUBLIC_ENV_CLERK_IS_SATELLITE",
        "NEXT_PUBLIC_WEB_SOCKET_HOST_ORIGIN",
        "NEXT_PUBLIC_ENV_CLERK_SIGN_IN_URL",
        "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
        "AI_AWS_TEXTRACT_NOTIFICATION_ROLE",
        "NEXT_PUBLIC_GOOGLE_ANALYTICS_ID",
        "WEB_SOCKET_CORS_ALLOWED_ORIGIN",
        "NEXT_PUBLIC_CLERK_SIGN_IN_URL",
        "AI_AWS_BUCKET_PREFIX_TEXTRACT",
        "NEXT_PUBLIC_ENV_CLERK_DOMAIN",
        "STRIPE_LOCAL_WEBHOOK_SECRET",
        "DATABASE_CONNECTION_STRING",
        "NEXT_GOOGLE_GEMINI_API_KEY",
        "DATABASE_SEED_MEDIUM_LIMIT",
        "AI_AWS_TEXTRACT_SNS_TOPIC",
        "GOOGLE_CLOUD_PROCESSOR_ID",
        "DATABASE_SEED_LARGE_LIMIT",
        "DATABASE_SEED_SMALL_LIMIT",
        "AI_AWS_SECRET_ACCESS_KEY",
        "CLOUDMAILIN_FROM_ADDRESS",
        "DATABASE_SEED_MULTIPLIER",
        "INSTANCE_CONNECTION_NAME",
        "DEEPGRAM_API_SECRET_KEY",
        "DANGER_GITHUB_API_TOKEN",
        "NEW_RELIC_API_SOMETHING",
        "GOOGLE_CLOUD_PROJECT_ID",
        "DATABASE_SEED_MIN_LIMIT",
        "NEXT_PUBLIC_PUSHER_KEY",
        "GCP_ALLOYDB_CLUSTER_ID",
        "PEOPLEDATALABS_API_KEY",
        "CLIO_AUTHORIZATION_URI",
        "NEW_RELIC_LICENSE_KEY",
        "GOOGLE_CLOUD_ENDPOINT",
        "GOOGLE_CLOUD_LOCATION",
        "CLIO_ACCESS_TOKEN_URI",
        "STRIPE_PRICE_ID_MONTH",
        "BACKEND_DATABASE_HOST",
        "BACKEND_DATABASE_USER",
        "BACKEND_DATABASE_PASS",
        "BACKEND_DATABASE_NAME",
        "BACKEND_DATABASE_PORT",
        "GCP_ALLOYDB_PASSWORD",
        "NEW_RELIC_API_KEY_ID",
        "AI_AWS_ACCESS_KEY_ID",
        "CLOUDMAILIN_USERNAME",
        "AI_AWS_BUCKET_REGION",
        "STRIPE_PRICE_ID_YEAR",
        "CLOUDMAILIN_API_KEY",
        "NEXT_PUSHER_SECRET",
        "NEXT_PUSHER_APP_ID",
        "CLIO_CLIENT_SECRET",
        "NEXT_PUBLIC_APP_ID",
        "AI_AWS_BUCKET_NAME",
        "NEW_RELIC_APP_NAME",
        "STRIPE_SECRET_KEY",
        "CLIO_REDIRECT_URI",
        "CLERK_SECRET_KEY",
        "CLERK_TRUST_HOST",
        "DEEPGRAM_API_KEY",
        "DATADOG_KEY_ID",
        "OPENAI_API_KEY",
        "CLIO_CLIENT_ID",
        "BACKEND_PORT",
        "GH_TOKEN",
    ];

    requiredEnvVars.forEach(envVar => {
        it(`should have all required environment variables defined (${valueToString(envVar)})`, () => {
            expect(process.env[envVar]).toBeDefined();
        });
    });

    it("should log missing environment variables if any", () => {
        const missingEnvVars = requiredEnvVars.filter(
            envVar => !process.env[envVar],
        );

        if (missingEnvVars.length > 0)
            console.warn(
                `Missing environment variables: ${missingEnvVars.join(", ")}`,
            );

        expect(missingEnvVars).toHaveLength(0); // Ensure the test fails if any are missing
    });
});
