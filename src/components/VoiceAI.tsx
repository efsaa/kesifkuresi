
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

  // Fetch summary data from Wikipedia
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
      
      // Return a longer excerpt for more detailed information
      if (extract.length > 800) {
        return extract.substring(0, 800) + '...';
      }
      
      return extract;
    } catch (error) {
      console.error('Wikipedia API error:', error);
      return 'Wikipedia\'dan bilgi alınırken bir hata oluştu.';
    }
  };

  // Fetch weather data for a city (simplified mock function)
  const fetchWeatherData = async (city: string): Promise<string> => {
    const cities: Record<string, {temp: number, condition: string}> = {
      'istanbul': {temp: 22, condition: 'güneşli'},
      'ankara': {temp: 18, condition: 'parçalı bulutlu'},
      'izmir': {temp: 25, condition: 'açık'},
      'antalya': {temp: 28, condition: 'güneşli'},
      'bursa': {temp: 20, condition: 'yağmurlu'},
      'adana': {temp: 30, condition: 'açık'},
      'konya': {temp: 17, condition: 'bulutlu'},
      'paris': {temp: 16, condition: 'yağmurlu'},
      'londra': {temp: 14, condition: 'sisli'},
      'new york': {temp: 18, condition: 'parçalı bulutlu'},
      'tokyo': {temp: 20, condition: 'yağmurlu'},
      'pekin': {temp: 19, condition: 'bulutlu'},
    };
    
    const lowerCaseCity = city.toLowerCase();
    if (cities[lowerCaseCity]) {
      const { temp, condition } = cities[lowerCaseCity];
      return `${city} için hava durumu: ${temp}°C ve ${condition}.`;
    }
    
    return `${city} için hava durumu bilgisi bulunamadı.`;
  };

  // Get current time and date
  const getCurrentTimeAndDate = (): string => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return now.toLocaleDateString('tr-TR', options);
  };

  // Enhanced answer function to determine the best source based on the question
  const getEnhancedAnswer = async (userQuestion: string): Promise<string> => {
    const lowerQuestion = userQuestion.toLowerCase();
    
    // Handle greetings and basic questions
    if (lowerQuestion.includes('merhaba') || lowerQuestion.includes('selam')) {
      return 'Merhaba! Size nasıl yardımcı olabilirim?';
    } 
    else if (lowerQuestion.includes('adın ne') || lowerQuestion.includes('kimsin')) {
      return 'Ben Keşif Küresi yapay zekasıyım. Dünya hakkında size bilgi vermek için buradayım.';
    }
    else if (lowerQuestion.includes('nasılsın') || lowerQuestion.includes('iyi misin')) {
      return 'Teşekkür ederim, ben bir yapay zeka olduğum için duygularım yok ama size yardımcı olmak için hazırım!';
    }
    else if (lowerQuestion.includes('saat kaç') || lowerQuestion.includes('tarih') || lowerQuestion.includes('bugün günlerden')) {
      return `Şu an: ${getCurrentTimeAndDate()}`;
    }
    
    // Check for weather queries
    const weatherKeywords = ['hava durumu', 'hava nasıl', 'yağmur', 'sıcaklık'];
    const hasWeatherQuestion = weatherKeywords.some(keyword => lowerQuestion.includes(keyword));
    
    if (hasWeatherQuestion) {
      // Extract city name from question
      const cities = ['istanbul', 'ankara', 'izmir', 'antalya', 'bursa', 'adana', 'konya', 'paris', 'londra', 'new york', 'tokyo', 'pekin'];
      const foundCity = cities.find(city => lowerQuestion.includes(city.toLowerCase()));
      
      if (foundCity) {
        return await fetchWeatherData(foundCity);
      }
    }
    
    // Check for country information
    const countries = {
      'türkiye': 'Türkiye',
      'amerika': 'Amerika Birleşik Devletleri',
      'abd': 'Amerika Birleşik Devletleri',
      'fransa': 'Fransa',
      'japonya': 'Japonya',
      'brezilya': 'Brezilya',
      'çin': 'Çin Halk Cumhuriyeti',
      'almanya': 'Almanya',
      'italya': 'İtalya',
      'ispanya': 'İspanya',
      'ingiltere': 'Birleşik Krallık',
      'rusya': 'Rusya',
      'kanada': 'Kanada',
      'avustralya': 'Avustralya',
      'hindistan': 'Hindistan',
      'mısır': 'Mısır'
    };
    
    // Check if the question mentions a country
    let country = '';
    for (const [key, value] of Object.entries(countries)) {
      if (lowerQuestion.includes(key)) {
        country = value;
        break;
      }
    }
    
    if (country) {
      return await fetchFromWikipedia(country);
    }
    
    // For any other query, try to extract meaningful terms
    // Remove common question words and phrases
    const questionWords = [
      'ne', 'nedir', 'nerede', 'nereden', 'nasıl', 'kim', 'kimin', 'hangi', 
      'kaç', 'ne zaman', 'niçin', 'neden', 'hakkında', 'anlat', 'bilgi ver'
    ];
    
    let cleanedQuestion = lowerQuestion;
    questionWords.forEach(word => {
      cleanedQuestion = cleanedQuestion.replace(new RegExp(`\\b${word}\\b`, 'g'), '');
    });
    
    cleanedQuestion = cleanedQuestion.trim();
    
    if (cleanedQuestion.length > 2) {
      // Try to find the most relevant topics in the question
      let searchTerms = cleanedQuestion.split(' ')
        .filter(term => term.length > 3)
        .slice(0, 2)
        .join(' ');
      
      if (searchTerms) {
        return await fetchFromWikipedia(searchTerms);
      } else {
        return await fetchFromWikipedia(cleanedQuestion);
      }
    }
    
    return 'Bu konu hakkında detaylı bilgim yok. Lütfen daha açık bir soru sorunuz veya haritada bir ülkeye tıklayınız.';
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
    
    // Get enhanced answer from multiple sources
    const answer = await getEnhancedAnswer(newConversationItem.question);
    
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
              <p className="text-sm mt-2">Örneğin: "Türkiye hakkında bilgi verir misin?" veya "İstanbul'da hava nasıl?"</p>
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
