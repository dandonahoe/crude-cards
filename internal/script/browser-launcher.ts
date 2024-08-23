import { exec } from 'child_process';

// URLs to be opened in the browser windows with their respective dimensions and positions
const urls: { url: string, width: number, height: number, left: number, top: number }[] = [
    { url: 'http://example.com/foo', width: 800, height: 600, left: 0, top: 0 },
    { url: 'http://example.com/bar', width: 800, height: 600, left: 800, top: 0 },
    { url: 'http://example.com/baz', width: 800, height: 600, left: 1600, top: 0 },
];

// Function to open a URL in the default web browser with specified dimensions and position
const openUrl = (url: string, width: number, height: number, left: number, top: number): void => {
    const startCommand =
        process.platform === 'win32' ? 'start "" "chrome"' :
            process.platform === 'darwin' ? 'open -na "Google Chrome" --args' :
                'google-chrome'; // Assuming Google Chrome is installed on Linux

    const command = `${startCommand} --new-window "${url}" --window-size=${width},${height} --window-position=${left},${top}`;

    console.log(`Executing command: ${command}`); // Debugging output to verify the command

    exec(command, error => {
        if (error)
            console.error(`Error opening ${url}:`, error);
    });
};

// Open each URL in a new browser window with specified dimensions and positions
urls.forEach(({ url, width, height, left, top }) => openUrl(url, width, height, left, top));
