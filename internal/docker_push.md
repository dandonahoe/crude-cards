# Building and Pushing Docker Images

-   **Authenticate**

`aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 938413686327.dkr.ecr.us-east-1.amazonaws.com`

-   **Tag the local 'crude-cards/api' image with the ECR repository URI**

```bash
docker tag crude-cards/api:latest 938413686327.dkr.ecr.us-east-1.amazonaws.com/crude-cards/api:latest
docker tag crude-cards/web:latest 938413686327.dkr.ecr.us-east-1.amazonaws.com/crude-cards/web:latest
docker tag crude-cards/ui:latest 938413686327.dkr.ecr.us-east-1.amazonaws.com/crude-cards/ui:latest
```

-   **Push the 'crude-cards/api' image to the ECR repository**

```bash
docker push 938413686327.dkr.ecr.us-east-1.amazonaws.com/crude-cards/api:latest
docker push 938413686327.dkr.ecr.us-east-1.amazonaws.com/crude-cards/web:latest
docker push 938413686327.dkr.ecr.us-east-1.amazonaws.com/crude-cards/ui:latest
```

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

// aws ecs update-service \
// --cluster crude-cards-production \
// --service crude-cards-api-service \
// --force-new-deployment

// aws ecs update-service \
// --cluster crude-cards-production \
// --service crude-cards-ui-service \
// --force-new-deployment

// aws ecs update-service \
// --cluster crude-cards-production \
// --service crude-cards-web-service \
// --force-new-deployment
