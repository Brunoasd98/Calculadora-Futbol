export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { path } = req.query;
  if (!path) return res.status(400).json({ error: 'Falta path' });

  const API_KEY = process.env.FOOTBALL_API_KEY || '3e5b49dfb5c2291216b7937efb8a751e';

  try {
    const url = `https://v3.football.api-sports.io/${path}`;
    const response = await fetch(url, {
      headers: {
        'x-apisports-key': API_KEY,
        'Accept': 'application/json',
      }
    });

    if (!response.ok) throw new Error(`API respondió con ${response.status}`);
    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
