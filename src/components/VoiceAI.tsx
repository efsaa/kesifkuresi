
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { Mic, MicOff, Volume2 } from "lucide-react";

interface VoiceAIProps {
  onSpeak: (text: string) => void;
  isSpeaking: boolean;
}

const VoiceAI: React.FC<VoiceAIProps> = ({ onSpeak, isSpeaking }) => {
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState<{
    question: string;
    answer: string;
  }[]>([]);
  const [isListening, setIsListening] = useState(false);
  const conversationContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'tr-TR';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuestion(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast.error('Ses algılamada bir hata oluştu.');
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast.error('Ses tanıma bu tarayıcıda desteklenmiyor.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      toast.info('Sizi dinliyorum...');
    }
  };

  const handleAsk = () => {
    if (!question.trim()) {
      toast.error('Lütfen bir soru sorunuz.');
      return;
    }

    // Simulated AI response - in a real app, you would connect to an AI API
    // This is a simple mock response system
    let answer = '';
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('merhaba') || lowerQuestion.includes('selam')) {
      answer = 'Merhaba! Size nasıl yardımcı olabilirim?';
    } else if (lowerQuestion.includes('adın ne') || lowerQuestion.includes('kimsin')) {
      answer = 'Ben Discovery Globe yapay zekasıyım. Dünya hakkında size bilgi vermek için buradayım.';
    } else if (lowerQuestion.includes('türkiye')) {
      answer = 'Türkiye, Avrupa ve Asya kıtalarının kesişiminde yer alan benzersiz bir ülkedir. Zengin tarihi, çeşitli kültürü ve nefes kesici manzaraları ile bilinir. Harika yemekleri, misafirperver insanları ve tarihi yerleri ile turistler için popüler bir destinasyondur.';
    } else if (lowerQuestion.includes('amerika') || lowerQuestion.includes('abd')) {
      answer = 'Amerika Birleşik Devletleri, 50 eyalet ve bir federal bölgeden oluşan bir ülkedir. Dünyanın en büyük ekonomisine ve en güçlü ordusuna sahiptir. Özgürlük, demokrasi ve fırsatlar ülkesi olarak bilinir.';
    } else if (lowerQuestion.includes('fransa')) {
      answer = 'Fransa, Batı Avrupa\'da yer alan bir ülkedir. Sanat, moda, mutfak ve kültür açısından dünyaca ünlüdür. Paris\'teki Eyfel Kulesi, Louvre Müzesi ve Notre Dame Katedrali gibi ikonik yerlerle bilinir.';
    } else if (lowerQuestion.includes('japonya')) {
      answer = 'Japonya, Doğu Asya\'da bulunan bir ada ülkesidir. İleri teknolojisi, geleneksel kültürü ve eşsiz mutfağı ile tanınır. Fuji Dağı, kiraz çiçekleri ve suşi gibi kültürel sembolleri dünyaca meşhurdur.';
    } else if (lowerQuestion.includes('brezilya')) {
      answer = 'Brezilya, Güney Amerika\'nın en büyük ülkesidir. Canlı kültürü, Amazon Yağmur Ormanları, futbol tutkusu ve renkli karnavalları ile bilinir. Rio de Janeiro\'daki Kurtarıcı İsa heykeli, dünyanın en tanınmış anıtlarından biridir.';
    } else {
      answer = 'Bu konu hakkında detaylı bilgim yok. Dünya üzerindeki ülkeler hakkında daha fazla bilgi için lütfen haritada bir ülkeye tıklayın veya bana belirli bir ülke hakkında soru sorun.';
    }
    
    // Update conversation
    const newConversationItem = { question, answer };
    setConversation([...conversation, newConversationItem]);
    
    // Clear input
    setQuestion('');
    
    // Speak the answer
    onSpeak(answer);
    
    // Scroll to the bottom of conversation
    setTimeout(() => {
      if (conversationContainerRef.current) {
        conversationContainerRef.current.scrollTop = conversationContainerRef.current.scrollHeight;
      }
    }, 100);
  };

  return (
    <Card className="info-panel w-full max-w-md h-[400px] flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-primary">Yapay Zeka Asistan</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <div 
          ref={conversationContainerRef} 
          className="overflow-y-auto h-full pr-2 space-y-4"
        >
          {conversation.length === 0 ? (
            <div className="text-center text-muted-foreground py-10">
              <p>Merhaba! Dünya hakkında bir sorunuz var mı?</p>
              <p className="text-sm mt-2">Örneğin: "Türkiye hakkında bilgi verir misin?"</p>
            </div>
          ) : (
            conversation.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="bg-primary/20 p-3 rounded-lg rounded-br-none">
                  <p className="text-sm text-foreground">{item.question}</p>
                </div>
                <div className="bg-secondary/20 p-3 rounded-lg rounded-bl-none">
                  <p className="text-sm text-foreground">{item.answer}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t border-border pt-3">
        <div className="w-full flex gap-2">
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Bir soru sorun..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAsk();
            }}
            disabled={isSpeaking || isListening}
            className="flex-grow"
          />
          <Button 
            onClick={toggleListening}
            variant="outline"
            className={`${isListening ? 'bg-red-500/20' : 'bg-primary/10'}`}
            disabled={isSpeaking}
            title={isListening ? "Ses Algılamayı Durdur" : "Sesli Soru Sor"}
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </Button>
          <Button 
            onClick={handleAsk}
            disabled={isSpeaking || !question.trim()}
            className={isSpeaking ? "opacity-50" : ""}
          >
            {isSpeaking ? <Volume2 size={18} className="animate-pulse" /> : "Sor"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default VoiceAI;
