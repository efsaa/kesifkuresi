async function fetchWikiSummary(query) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  return data.extract; // Wikipedia'dan özet metin
}

// 2. OpenAI'ye Wikipedia özetini prompt olarak yolla
async function getAnswerFromOpenAI(question, context) {
  const messages = [
    { role: "system", content: "Sen bilgiye dayalı, net cevap veren yardımcı bir yapay zekasın." },
    { role: "user", content: `Aşağıdaki metni dikkate alarak soruyu cevapla:\n\n${context}\n\nSoru: ${question}` },
  ];

  const response = await fetch("/api/openai-chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  const data = await response.json();
  return data.answer;
}

