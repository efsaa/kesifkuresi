// /pages/api/openai-chat.js (Next.js API route örneği)

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  try {
    const { messages } = req.body;

    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const answer = completion.data.choices[0].message.content;

    res.status(200).json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "OpenAI API çağrısında hata" });
  }
}

