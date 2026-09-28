const puppeteer = require('puppeteer');
const fs = require('fs');

const urls = [
    { name: 'CodeSrijan', url: 'https://www.figma.com/design/hCaNWKm2qTY2kQ0KOZRywa/M-1?node-id=40-2&t=vfPIBYY278lzphVq-1' },
    { name: 'AI_Interview', url: 'https://www.figma.com/design/ezDh2NmBto6iv7xaQNs3Ha/AI-Interview?node-id=11-1842&t=siyh0b32g2XWrRNe-1' },
    { name: 'Movie_Tickets', url: 'https://www.figma.com/design/0cJQWX8qYssPfK4hmPtdVj/Movie-Ticket-Booking-App-Design?node-id=31-86&t=Jd933TVzkrlBb4MQ-1' },
    { name: 'Expensify', url: 'https://www.figma.com/design/3mw8XBHEZ3b8HKNNqcs6U2/Expensify---Budget-Tracker-App?node-id=135-318&t=gUJEMUlyDc8ERNeR-1' }
];

(async () => {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ headless: 'new', defaultViewport: { width: 1440, height: 900 } });

    for (const item of urls) {
        try {
            console.log(`Navigating to ${item.name}...`);
            const page = await browser.newPage();
            await page.goto(item.url, { waitUntil: 'networkidle2', timeout: 30000 });
            console.log(`Waiting 8 seconds for Figma canvas to render ${item.name}...`);
            await new Promise(r => setTimeout(r, 8000));
            const outPath = `public/figma_${item.name}.png`;
            await page.screenshot({ path: outPath });
            console.log(`Saved screenshot to ${outPath}`);
            await page.close();
        } catch (e) {
            console.error(`Failed on ${item.name}:`, e);
        }
    }

    await browser.close();
    console.log('Done!');
})();
