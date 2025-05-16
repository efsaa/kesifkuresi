import { getAnswerFromSQuAD } from '../utils/qaApi';

const handleUserInput = async (userQuestion) => {
  const context = "Buraya context metni (örneğin Wikipedia'dan) gelecek";
  const answer = await getAnswerFromSQuAD(userQuestion, context);
  setMessages(prev => [...prev, { role: 'assistant', content: answer }]);
};
