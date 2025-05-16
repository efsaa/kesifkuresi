import React, { useEffect, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import axios from "axios";

const theme = {
  // Basit tema tanımı
  paragraph: "text-base text-gray-900",
};

const editorConfig = {
  theme,
  onError(error) {
    console.error("Lexical Error:", error);
  },
};

export default function AIEnhancedEditor() {
  const [response, setResponse] = useState("");

  const handleChange = async (editorState) => {
    editorState.read(async () => {
      const textContent = editorState.toJSON().root.children
        .map((node) => node.text || "")
        .join(" ");

      if (textContent.length > 5) {
        try {
          const res = await axios.post("/api/analyze", { text: textContent });
          setResponse(res.data.answer);
        } catch (err) {
          console.error("API error:", err);
        }
      }
    });
  };

  return (
    <div className="p-4 space-y-4">
      <LexicalComposer initialConfig={editorConfig}>
        <RichTextPlugin
          contentEditable={<ContentEditable className="border p-4 rounded" />}
          placeholder={<div className="text-gray-400">Metni buraya yaz...</div>}
        />
        <HistoryPlugin />
        <OnChangePlugin onChange={handleChange} />
      </LexicalComposer>

      {response && (
        <div className="bg-gray-100 p-4 rounded shadow">
          <strong>AI Yanıtı:</strong> {response}
        </div>
      )}
    </div>
  );
}
