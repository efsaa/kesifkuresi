# backend/app.py
from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

qa_pipeline = pipeline("question-answering", model="bert-large-uncased-whole-word-masking-finetuned-squad")

@app.route("/qa", methods=["POST"])
def qa():
    data = request.get_json()
    question = data["question"]
    context = data["context"]
    result = qa_pipeline(question=question, context=context)
    return jsonify(result)

if __name__ == "__main__":
    app.run(port=5000)
