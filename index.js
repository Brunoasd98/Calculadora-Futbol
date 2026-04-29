const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const { scrapeSofaScore, getTeamStats } = require('./scraper');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.get('/api/matches', async (req, res) => {
    try {
        const dataFile = path.join(__dirname, 'matchData.json');
        if (fs.existsSync(dataFile)) {
            const cachedData = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
            return res.json({ success: true, data: cachedData, cached: true, timestamp: new Date().toISOString() });
        }
        res.json({ success: true, data: [], cached: false, message: 'No cached data available. Run scraper.js to fetch data.' });
    } catch (error) {
        console.error('Error fetching matches:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});
app.get('/api/team/:teamName', async (req, res) => {
    try {
        const teamName = req.params.teamName;
        const stats = await getTeamStats(teamName);
        res.json({ success: true, data: stats, timestamp: new Date().toISOString() });
    } catch (error) {
        console.error('Error fetching team stats:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});
app.post('/api/scrape', async (req, res) => {
    try {
        console.log('🔄 Manual scrape triggered...');
        const matches = await scrapeSofaScore();
        res.json({ success: true, message: `Successfully scraped ${matches.length} matches`, data: matches, timestamp: new Date().toISOString() });
    } catch (error) {
        console.error('Error during scraping:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});
app.get('/api/health', (req, res) => {
    res.json({ success: true, status: 'Server is running', timestamp: new Date().toISOString() });
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ success: false, error: 'Internal server error', message: err.message });
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
module.exports = app;