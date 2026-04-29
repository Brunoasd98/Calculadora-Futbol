const puppeteer = require('puppeteer');

async function scrapeMatchData() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.sofascore.com/'); // Example URL; update as necessary

    // Replace below selectors with actual ones after inspecting the target web page.
    const matches = await page.$$eval('.match-class', nodes => {
        return nodes.map(node => {
            return {
                homeTeam: node.querySelector('.home-team-class').innerText,
                awayTeam: node.querySelector('.away-team-class').innerText,
                score: node.querySelector('.score-class').innerText,
                date: node.querySelector('.date-class').innerText
            };
        });
    });

    // Save the data to matchData.json
    const fs = require('fs');
    fs.writeFileSync('matchData.json', JSON.stringify(matches, null, 2));

    await browser.close();
}

scrapeMatchData();