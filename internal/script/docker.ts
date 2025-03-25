#!/usr/bin/env zx

import { $ } from 'zx';


// The full AWS ECR registry domain.
const registry = '938413686327.dkr.ecr.us-east-1.amazonaws.com';

// The name of the ECS cluster to deploy services to.
const cluster = 'crude-cards-production';

// The ECS service components to deploy: api, web, and ui.
const images = ['api', 'web', 'ui'];

// The base repository name for the ECR image.
const repo = 'crude-cards';

/**
 * Utility function to log a step with an emoji and run a shell command.
 *
 * @param icon    - Emoji symbol to prefix the log.
 * @param message - Description of the action.
 * @param command - The `zx` command to execute.
 * @returns A promise that resolves when the command finishes.
 */
const logAndRun = async (icon: string, message: string, command: any) => {
    console.log(`${icon} ${message}`);

    return command;
};

/**
 * Processes a single service image:
 * - Tags the image
 * - Pushes it to ECR
 * - Forces an ECS service deployment
 * - Waits for the service to stabilize
 *
 * @param name - The service name (e.g., 'api', 'web', or 'ui').
 */
const processImage = async (name: string) => {
    const fullTag = `${registry}/${repo}/${name}:latest`;

    await logAndRun('🔖', `Tagging ${name}...`,
        $`docker tag ${fullTag} ${fullTag}`);

    await logAndRun('📤', `Pushing ${name}...`,
        $`docker push ${fullTag}`);

    await logAndRun('🚀', `Deploying ${name}...`,
        $`aws ecs update-service --cluster ${cluster} --service ${repo}-${name}-service --force-new-deployment`);

    await logAndRun('⏳', `Waiting for deployment of ${name}...`,
        $`aws ecs wait services-stable --cluster ${cluster} --services ${repo}-${name}-service`);

    console.log('✅', `${name} deployment complete.`);
};

/**
 * Wraps a function call with error handling. Logs and exits the process on error.
 *
 * @param callback - An async function to run within a try/catch block.
 */
const wrapWithTryCatch = async (callback: () => Promise<void>) => {
    try {
        await callback();
    } catch (err) {
        if (err instanceof Error)
            console.error('❌', `Failed: ${err.message}`);
        else
            console.error('❌', 'Failed: Unknown error', err);

        process.exit(1);
    }
};

/**
 * Main entry point:
 * - Logs into ECR
 * - Builds all service images using Docker Compose
 * - Processes each image (tag, push, deploy, wait)
 */
const mainTasks = async () => {
    await logAndRun('🔐', 'Logging into ECR...',
        $`aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${registry}`);

    await logAndRun('🔨', 'Building Docker Images...',
        $`IS_BUILDING=true COMPOSE_BAKE=true DOCKER_BUILDKIT=1 COMPOSE_DOCKER_CLI_BUILD=1 docker compose build`);

    // eslint-disable-next-line max-len
    console.log('🔗 View progress at https://us-east-1.console.aws.amazon.com/ecs/v2/clusters/crude-cards-production/services?region=us-east-1');

    await Promise.all(
        images.map(async name =>
            wrapWithTryCatch(async () =>
                processImage(name))));
};

// Run the deployment flow with error handling.
wrapWithTryCatch(mainTasks);
