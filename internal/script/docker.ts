docker build --progress=plain --no-cache -f DockerfileUI -t crude-cards-ui-container .
docker build --progress=plain --no-cache -f DockerfileAPI -t rude-cards-api-container .
docker build --progress=plain --no-cache -f DockerfileWeb -t rude-cards-web-container .
