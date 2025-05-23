
import React, { useState, useEffect, useRef } from 'react';
import Globe from '../components/Globe';
import CountryInfo from '../components/CountryInfo';
import VoiceAI from '../components/VoiceAI';
import VideoDisplay from '../components/VideoDisplay';
import countryData from '../data/CountryData';
import { Toaster } from '@/components/ui/sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { Square } from 'lucide-react';

const Index = () => {
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isMobile = useIsMobile();

  // Get the selected country data
  const selectedCountry = selectedCountryId 
    ? countryData.find(country => country.id === selectedCountryId) || null
    : null;

  // Handle speech synthesis
  const speakText = (text: string) => {
    // Stop any current speech
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }

    // Create a new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesisRef.current = utterance;
    
    // Set the language to Turkish
    utterance.lang = 'tr-TR';
    
    // Set voice (if available Turkish voice)
    const voices = speechSynthesis.getVoices();
    const turkishVoice = voices.find(voice => voice.lang.includes('tr-TR'));
    if (turkishVoice) {
      utterance.voice = turkishVoice;
    }
    
    // Adjust speech parameters
    utterance.rate = 1.1;
    utterance.pitch = 1;
    
    // Setup events
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    // Start speaking
    speechSynthesis.speak(utterance);
  };

  // Stop speaking function
  const stopSpeaking = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Setup click outside to close panels
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only process clicks directly on the background element
    if (e.target === e.currentTarget) {
      setSelectedCountryId(null);
      stopSpeaking();
    }
  };

  // Stop speaking when component unmounts
  useEffect(() => {
    return () => {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  // Load voices when component mounts
  useEffect(() => {
    // This is needed for Chrome
    if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => {
        // Just to ensure voices are loaded
        console.log('Voices loaded:', speechSynthesis.getVoices().length);
      };
    }
  }, []);

  // Update document title
  useEffect(() => {
    document.title = "Keşif Küresi";
  }, []);

  return (
    <div 
      className="min-h-screen w-screen overflow-hidden bg-background relative"
      onClick={handleBackgroundClick}
    >
      {/* App header */}
      <header className="absolute top-0 left-0 w-full z-10 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl md:text-3xl font-bold text-white text-glow">
            Keşif Küresi
          </h1>
          <p className="ml-3 opacity-70 hidden md:block">Dokun ve Keşfet</p>
        </div>
      </header>

      {/* Globe container */}
      <div className="w-full h-screen">
        <Globe onCountrySelect={setSelectedCountryId} />
      </div>

      {/* Content panels - responsive layout */}
      {isMobile ? (
        <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-stretch max-h-[80vh] overflow-y-auto">
          <div className="p-2">
            {selectedCountry && (
              <CountryInfo 
                country={selectedCountry} 
                onClose={() => setSelectedCountryId(null)}
                onSpeak={speakText}
              />
            )}
            <div className="flex flex-col gap-4 mt-4">
              <VoiceAI onSpeak={speakText} isSpeaking={isSpeaking} />
              <VideoDisplay country={selectedCountry} />
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute bottom-8 right-8 z-10 flex flex-col lg:flex-row gap-4 items-end lg:items-start max-h-[70vh] overflow-y-auto no-scrollbar">
          {selectedCountry && (
            <CountryInfo 
              country={selectedCountry} 
              onClose={() => setSelectedCountryId(null)}
              onSpeak={speakText}
            />
          )}
          
          <div className="flex flex-col gap-4">
            <VoiceAI onSpeak={speakText} isSpeaking={isSpeaking} />
            <VideoDisplay country={selectedCountry} />
          </div>
        </div>
      )}
      
      {/* Speaking indicator and stop button */}
      {isSpeaking && (
        <div className={`fixed ${isMobile ? 'bottom-2 left-2' : 'bottom-4 left-4'} z-20 flex items-center gap-2`}>
          <div className="bg-accent/20 border border-accent/40 px-4 py-2 rounded-full">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
              </span>
              <p className="text-sm font-medium">Konuşuyor...</p>
            </div>
          </div>
          <button 
            onClick={stopSpeaking} 
            className="bg-destructive/80 hover:bg-destructive text-white rounded-full p-2 transition-colors"
            title="Konuşmayı Durdur"
          >
            <Square size={16} />
          </button>
        </div>
      )}
      
      <Toaster position="top-center" />
    </div>
  );
};

export default Index;
