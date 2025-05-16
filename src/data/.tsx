async function handleQuestion(question) {
  const wikiSummary = await fetchWikiSummary(question);
  let answer;

  if (wikiSummary) {
    answer = await getAnswerFromOpenAI(question, wikiSummary);
  } else {
    // Wikipedia bulunamadıysa sadece OpenAI kullan
    answer = await getAnswerFromOpenAI(question, "");
  }

  return answer;
}
