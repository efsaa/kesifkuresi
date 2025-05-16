// frontend/src/utils/qaApi.js

export const getAnswerFromSQuAD = async (question, context) => {
  const response = await fetch(process.env.REACT_APP_QA_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question, context }),
  });

  const data = await response.json();
  return data.answer;
};
