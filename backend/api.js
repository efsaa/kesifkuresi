async function fetchWikiSummary(query) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  return data.extract; // Wikipedia'dan özet metin
}
