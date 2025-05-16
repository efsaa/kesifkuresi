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

from transformers import pipeline

pipe = pipeline("question-answering", model="google-bert/bert-large-uncased-whole-word-masking-finetuned-squad")

from transformers import AutoTokenizer, AutoModelForQuestionAnswering

tokenizer = AutoTokenizer.from_pretrained("google-bert/bert-large-uncased-whole-word-masking-finetuned-squad")
model = AutoModelForQuestionAnswering.from_pretrained("google-bert/bert-large-uncased-whole-word-masking-finetuned-squad")
