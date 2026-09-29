const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const figmaLinks = [
    { name: 'figma_CodeSrijan', url: 'https://www.figma.com/design/hCaNWKm2qTY2kQ0KOZRywa/M-1' },
    { name: 'figma_AI_Interview', url: 'https://www.figma.com/design/ezDh2NmBto6iv7xaQNs3Ha/AI-Interview' },
    { name: 'figma_Movie_Tickets', url: 'https://www.figma.com/design/0cJQWX8qYssPfK4hmPtdVj/Movie-Ticket-Booking-App-Design' },
    { name: 'figma_Expensify', url: 'https://www.figma.com/design/3mw8XBHEZ3b8HKNNqcs6U2/Expensify---Budget-Tracker-App' }
];

(async () => {
    // Launch headless but with stealth
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    for (const link of figmaLinks) {
        console.log(`Fetching ${link.name}...`);
        const page = await browser.newPage();
        await page.setViewport({ width: 1440, height: 900 });

        try {
            await page.goto(link.url, { waitUntil: 'networkidle2', timeout: 30000 });
            await new Promise(r => setTimeout(r, 12000)); // wait for canvas

            await page.screenshot({ path: `./public/${link.name}.png` });
            console.log(`Saved ${link.name}.png`);
        } catch (e) {
            console.error(`Error on ${link.name}:`, e.message);
        }
        await page.close();
    }
    await browser.close();
    console.log("Done");
})();
