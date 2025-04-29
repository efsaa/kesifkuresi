
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

  const fetchFromWikipedia = async (searchTerm: string, language = 'tr'): Promise<string> => {
    try {
      // First, search for the article
      const searchUrl = `https://${language}.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch=${encodeURIComponent(searchTerm)}&format=json`;
      const searchResponse = await fetch(searchUrl);
      const searchData = await searchResponse.json();
      
      if (!searchData.query.search.length) {
        return `Wikipedia'da "${searchTerm}" ile ilgili bilgi bulunamadı.`;
      }
      
      // Get the page ID of the first result
      const pageId = searchData.query.search[0].pageid;
      
      // Get the extract (summary) of the article
      const extractUrl = `https://${language}.wikipedia.org/w/api.php?origin=*&action=query&prop=extracts&exintro&explaintext&pageids=${pageId}&format=json`;
      const extractResponse = await fetch(extractUrl);
      const extractData = await extractResponse.json();
      
      const extract = extractData.query.pages[pageId].extract;
      
      // Limit the length of the extract
      if (extract.length > 500) {
        return extract.substring(0, 500) + '...';
      }
      
      return extract;
    } catch (error) {
      console.error('Wikipedia API error:', error);
      return 'Wikipedia\'dan bilgi alınırken bir hata oluştu.';
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

    // Process the question to determine the intent
    const lowerQuestion = question.toLowerCase();
    let answer = '';
    
    // Basic greeting patterns
    if (lowerQuestion.includes('merhaba') || lowerQuestion.includes('selam')) {
      answer = 'Merhaba! Size nasıl yardımcı olabilirim?';
    } 
    else if (lowerQuestion.includes('adın ne') || lowerQuestion.includes('kimsin')) {
      answer = 'Ben Keşif Küresi yapay zekasıyım. Dünya hakkında size bilgi vermek için buradayım.';
    }
    // Country information pattern
    else if (
      lowerQuestion.includes('türkiye') || 
      lowerQuestion.includes('amerika') || 
      lowerQuestion.includes('abd') ||
      lowerQuestion.includes('fransa') ||
      lowerQuestion.includes('japonya') ||
      lowerQuestion.includes('brezilya') ||
      lowerQuestion.includes('çin') ||
      lowerQuestion.includes('almanya') ||
      lowerQuestion.includes('italya') ||
      lowerQuestion.includes('ispanya') ||
      lowerQuestion.includes('ingiltere') ||
      lowerQuestion.includes('rusya') ||
      lowerQuestion.includes('kanada') ||
      lowerQuestion.includes('avustralya') ||
      lowerQuestion.includes('hindistan') ||
      lowerQuestion.includes('mısır')
    ) {
      // Determine which country to search for
      let country = '';
      if (lowerQuestion.includes('türkiye')) country = 'Türkiye';
      else if (lowerQuestion.includes('amerika') || lowerQuestion.includes('abd')) country = 'Amerika Birleşik Devletleri';
      else if (lowerQuestion.includes('fransa')) country = 'Fransa';
      else if (lowerQuestion.includes('japonya')) country = 'Japonya';
      else if (lowerQuestion.includes('brezilya')) country = 'Brezilya';
      else if (lowerQuestion.includes('çin')) country = 'Çin Halk Cumhuriyeti';
      else if (lowerQuestion.includes('almanya')) country = 'Almanya';
      else if (lowerQuestion.includes('italya')) country = 'İtalya';
      else if (lowerQuestion.includes('ispanya')) country = 'İspanya';
      else if (lowerQuestion.includes('ingiltere')) country = 'Birleşik Krallık';
      else if (lowerQuestion.includes('rusya')) country = 'Rusya';
      else if (lowerQuestion.includes('kanada')) country = 'Kanada';
      else if (lowerQuestion.includes('avustralya')) country = 'Avustralya';
      else if (lowerQuestion.includes('hindistan')) country = 'Hindistan';
      else if (lowerQuestion.includes('mısır')) country = 'Mısır';
      
      // Fetch from Wikipedia API
      answer = await fetchFromWikipedia(country);
    } else {
      // For any other query, try to extract a topic and search for it
      // Remove common question words and phrases
      const cleanedQuestion = lowerQuestion
        .replace(/ne(dir)?|nerede(dir)?|nasıl(dır)?|kim(dir)?|bana anlat|hakkında bilgi ver|bilgi ver|bilgi|hakkında/g, '')
        .trim();
        
      if (cleanedQuestion.length > 2) {
        answer = await fetchFromWikipedia(cleanedQuestion);
      } else {
        answer = 'Bu konu hakkında detaylı bilgim yok. Lütfen daha açık bir soru sorunuz veya haritada bir ülkeye tıklayınız.';
      }
    }
    
    // Update conversation with the actual answer
    setConversation(prev => 
      prev.map((item, idx) => 
        idx === prev.length - 1 ? { ...item, answer } : item
      )
    );
    
    setIsLoading(false);
    
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
                  {item.answer === 'Yanıt aranıyor...' ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-pulse h-2 w-2 bg-primary rounded-full"></div>
                      <div className="animate-pulse h-2 w-2 bg-primary rounded-full delay-150"></div>
                      <div className="animate-pulse h-2 w-2 bg-primary rounded-full delay-300"></div>
                      <span className="text-sm text-muted-foreground ml-1">Yanıt aranıyor...</span>
                    </div>
                  ) : (
                    <p className="text-sm text-foreground">{item.answer}</p>
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
