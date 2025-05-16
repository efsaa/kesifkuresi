export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { content } = req.body;

  // Burada SQuAD tarzı ya da GPT API ile bağlantı kurabilirsin
  const completion = await getAIResponse(content); // kendi fonksiyonun

  res.status(200).json({ text: completion });
}
