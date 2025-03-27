import puppeteer from 'puppeteer';

(async () => {
  // Hard-code three browser windows
  const windowConfigs = [
    {
      url    : 'http://crude.local:3000',
      width  : 500,
      height : 900,
      left   : 0,
      top    : 50,
    },
    {
      url    : 'http://crude.local:3000',
      width  : 500,
      height : 900,
      left   : 600,
      top    : 50,
    },
    {
      url    : 'http://crude.local:3000',
      width  : 500,
      height : 900,
      left   : 1200,
      top    : 50,
    },
  ];

  for (const { url, width, height, left, top } of windowConfigs) {
    console.log('Launching browser window', url, width, height, left, top);

    const browser = await puppeteer.launch({
      headless : false,
      args     : [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        `--window-size=${width},${height}`,
        `--window-position=${left},${top}`,
        '--disable-features=RendererCodeIntegrity',
      ],
    });

    console.log('Browser launched', url, width, height, left, top);

    // Open a new page in the newly launched browser
    const page = await browser.newPage();
    await page.setViewport({ width, height });

    console.log('Viewport set', url);
    await page.goto(url);
  }
})();
