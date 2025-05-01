
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { getEnhancedAnswer } from '../services/aiAnswerService';

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
  const [isLoading, setIsLoading] = useState(false);
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

  const handleAsk = async () => {
    if (!question.trim()) {
      toast.error('Lütfen bir soru sorunuz.');
      return;
    }

    setIsLoading(true);

    // Prepare the conversation with the question first
    const newConversationItem = { 
      question, 
      answer: 'Yanıt aranıyor...' 
    };
    
    // Add to conversation immediately to show loading state
    setConversation(prev => [...prev, newConversationItem]);
    
    // Clear input
    setQuestion('');
    
    try {
      // Get enhanced answer from multiple knowledge sources
      const answer = await getEnhancedAnswer(newConversationItem.question);
      
      // Update conversation with the actual answer
      setConversation(prev => 
        prev.map((item, idx) => 
          idx === prev.length - 1 ? { ...item, answer } : item
        )
      );
      
      // Speak the answer
      onSpeak(answer);
    } catch (error) {
      console.error('Error getting answer:', error);
      
      // Update conversation with error message
      setConversation(prev => 
        prev.map((item, idx) => 
          idx === prev.length - 1 ? { 
            ...item, 
            answer: 'Üzgünüm, cevap alırken bir sorun oluştu. Lütfen tekrar deneyin.' 
          } : item
        )
      );
      
      toast.error('Cevap alınamadı. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
      
      // Scroll to the bottom of conversation
      setTimeout(() => {
        if (conversationContainerRef.current) {
          conversationContainerRef.current.scrollTop = conversationContainerRef.current.scrollHeight;
        }
      }, 100);
    }
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
              <p className="text-sm mt-2">Örnekler:</p>
              <ul className="text-sm mt-1 space-y-1 list-disc list-inside">
                <li>"Türkiye hakkında bilgi verir misin?"</li>
                <li>"İstanbul'da hava nasıl?"</li>
                <li>"Cumhuriyet Bayramı ne zaman?"</li>
                <li>"İstanbul'un Fethi hangi tarihte oldu?"</li>
                <li>"Mısır kültürü hakkında bilgi verir misin?"</li>
              </ul>
            </div>
          ) : (
            conversation.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="bg-primary/20 p-3 rounded-lg rounded-br-none">
                  <p className="text-sm text-foreground">{item.question}</p>
                </div>
                <div className="bg-secondary/20 p-3 rounded-lg rounded-bl-none">
                  {item.answer === 'Yanıt aranıyor...' ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-pulse h-2 w-2 bg-primary rounded-full"></div>
                      <div className="animate-pulse h-2 w-2 bg-primary rounded-full delay-150"></div>
                      <div className="animate-pulse h-2 w-2 bg-primary rounded-full delay-300"></div>
                      <span className="text-sm text-muted-foreground ml-1">Yanıt aranıyor...</span>
                    </div>
                  ) : (
                    <p className="text-sm text-foreground whitespace-pre-line">{item.answer}</p>
                  )}
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
              if (e.key === 'Enter' && !isLoading) handleAsk();
            }}
            disabled={isSpeaking || isListening || isLoading}
            className="flex-grow"
          />
          <Button 
            onClick={toggleListening}
            variant="outline"
            className={`${isListening ? 'bg-red-500/20' : 'bg-primary/10'}`}
            disabled={isSpeaking || isLoading}
            title={isListening ? "Ses Algılamayı Durdur" : "Sesli Soru Sor"}
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </Button>
          <Button 
            onClick={handleAsk}
            disabled={isSpeaking || !question.trim() || isLoading}
            className={isLoading || isSpeaking ? "opacity-50" : ""}
          >
            {isLoading ? 
              <div className="flex items-center">
                <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full mr-2"></div>
              </div> : 
              isSpeaking ? <Volume2 size={18} className="animate-pulse" /> : "Sor"
            }
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default VoiceAI;
