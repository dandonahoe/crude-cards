#!/usr/bin/env zx

import { $ } from 'zx';

// aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 938413686327.dkr.ecr.us-east-1.amazonaws.com
// IS_BUILDING=true COMPOSE_BAKE=true DOCKER_BUILDKIT=1 COMPOSE_DOCKER_CLI_BUILD=1 docker compose build --no-cache
// docker tag crude-cards/web:latest 938413686327.dkr.ecr.us-east-1.amazonaws.com/crude-cards/web:latest
// docker push 938413686327.dkr.ecr.us-east-1.amazonaws.com/crude-cards/web:latest

// docker tag crude-cards/api:latest 938413686327.dkr.ecr.us-east-1.amazonaws.com/crude-cards/api:latest
// docker tag crude-cards/web:latest 938413686327.dkr.ecr.us-east-1.amazonaws.com/crude-cards/web:latest
// docker tag crude-cards/ui:latest 938413686327.dkr.ecr.us-east-1.amazonaws.com/crude-cards/ui:latest

// docker push 938413686327.dkr.ecr.us-east-1.amazonaws.com/crude-cards/api:latest
// docker push 938413686327.dkr.ecr.us-east-1.amazonaws.com/crude-cards/web:latest
// docker push 938413686327.dkr.ecr.us-east-1.amazonaws.com/crude-cards/ui:latest

const main = async () => {

    const registry = '938413686327.dkr.ecr.us-east-1.amazonaws.com';
    const images   = ['api', 'web', 'ui'];
    const repo     = 'crude-cards';

    console.log('Logging into ECR...')

    // eslint-disable-next-line max-len
    await $`aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 938413686327.dkr.ecr.us-east-1.amazonaws.com`.pipe(process.stdout);

    console.log('Building Docker Images...')

    await $`IS_BUILDING=true COMPOSE_BAKE=true DOCKER_BUILDKIT=1 COMPOSE_DOCKER_CLI_BUILD=1 docker compose build`.pipe(process.stdout);

    await Promise.all(
        images.map(async name => {

            const fullTag = `${registry}/${repo}/${name}:latest`;

            console.log(`🔖 Tagging ${name}...`);
            await $`docker tag ${fullTag} ${fullTag}`

            console.log(`📤 Pushing ${name}...`);
            await $`docker push ${fullTag}`
        }),
    );
}

main().catch(err => {
    console.error('❌ Failed:', err);
    process.exit(1);
});
