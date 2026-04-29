const puppeteer = require('puppeteer');

async function scrapeSofaScore() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.sofascore.com/');

    // Add your scraping logic here
    // Example: Scraping match data
    const data = await page.evaluate(() => {
        const matches = [];
        document.querySelectorAll('.match-row').forEach(match => {
            matches.push({
                homeTeam: match.querySelector('.team--home').innerText,
                awayTeam: match.querySelector('.team--away').innerText,
                score: match.querySelector('.score').innerText
            });
        });
        return matches;
    });

    console.log(data);

    await browser.close();
}

scrapeSofaScore();