export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const API_KEY = process.env.FOOTBALL_API_KEY || '3e5b49dfb5c2291216b7937efb8a751e';

  // Extraer el endpoint y reenviar TODOS los query params excepto "endpoint"
  const { endpoint, ...params } = req.query;
  if (!endpoint) return res.status(400).json({ error: 'Falta endpoint' });

  try {
    const qs = new URLSearchParams(params).toString();
    const url = `https://v3.football.api-sports.io/${endpoint}${qs ? '?' + qs : ''}`;
    console.log('Fetching:', url);

    const response = await fetch(url, {
      headers: {
        'x-apisports-key': API_KEY,
        'Accept': 'application/json',
      }
    });

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json(data);
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
