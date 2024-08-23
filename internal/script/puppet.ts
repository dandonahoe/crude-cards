import puppeteer from 'puppeteer';


(async () => {
    const urls = [{
        url: 'http://localhost:3000', width: 500, height: 900, left: 600, top: 50,
    }, {
        url: 'http://localhost:3000', width: 500, height: 900, left: 1200, top: 50,
    }];

    for (const { url, width, height, left, top } of urls) {

        const browser = await puppeteer.launch({
            headless: false,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                `--window-size=${width},${height}`,
                `--window-position=${left},${top}`,
                '--disable-features=RendererCodeIntegrity',
            ],
        });


        const page = await browser.newPage();

        await page.setViewport({ width, height });


        await page.goto(url);
    }
})();
