const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Example endpoint to get football data
app.get('/api/football', async (req, res) => {
    try {
        const response = await axios.get('https://api.football-data.org/v2/matches', {
            headers: { 'X-Auth-Token': 'YOUR_API_KEY' }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching football data');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});