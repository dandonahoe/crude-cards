import { exec } from 'child_process';

const commands = [
    'docker build --progress=plain --no-cache -f DockerfileUI -t crude-cards-ui-container .',
    'docker build --progress=plain --no-cache -f DockerfileAPI -t rude-cards-api-container .',
    'docker build --progress=plain --no-cache -f DockerfileWeb -t rude-cards-web-container .',
];

commands.forEach(command => {
    const process = exec(command);

    process.stdout?.on('data', data => {
        console.log(`[stdout] ${data}`);
    });

    process.stderr?.on('data', data => {
        console.error(`[stderr] ${data}`);
    });

    process.on('close', code => {
        console.log(`Command "${command}" exited with code ${code}`);
    });
});
