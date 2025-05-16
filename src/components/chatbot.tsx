import { getAnswerFromSQuAD } from '../utils/qaApi';

const handleUserInput = async (userQuestion) => {
  const context = "Buraya context metni (örneğin Wikipedia'dan) gelecek";
  const answer = await getAnswerFromSQuAD(userQuestion, context);
  setMessages(prev => [...prev, { role: 'assistant', content: answer }]);
};

// varsayalım Chatbot.js dosyan var

import React, { useState } from "react";

const SYSTEM_PROMPT = `
Sen Keşif Küresi adlı bir projeyle ilgili yardımcı bir yapay zekasın.
Proje: Dünya küresi modeli üzerinde keşif yapılmasına olanak sağlar.
Sesli yapay zeka desteklidir.
Soruları proje kapsamına uygun ve detaylı yanıtla.
`;

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function handleSend() {
    if (!input.trim()) return;

    // Yeni mesajı ekle
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);

    // API çağrısı için prompt oluştur
    const promptMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...newMessages,
    ];

    // OpenAI çağrısı (örnek, senin kullandığın yapıya göre adapte et)
    const response = await fetch("/api/openai-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: promptMessages }),
    });
    const data = await response.json();

    // Modelden yanıt al
    setMessages((prev) => [...prev, { role: "assistant", content: data.answer }]);
    setInput("");
  }

  return (
    <div>
      <div className="chat-window">
        {messages.map((msg, i) => (
          <p key={i} className={msg.role}>
            {msg.content}
          </p>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Sorunuzu yazın..."
      />
      <button onClick={handleSend}>Gönder</button>
    </div>
  );
}
