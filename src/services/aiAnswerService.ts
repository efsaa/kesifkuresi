
import { 
  fetchFromWikipedia, 
  searchHistoricalEvents, 
  getCulturalInfo, 
  getImportantDayInfo,
  getGeographyInfo,
  fetchWeatherData,
  getCurrentTimeAndDate 
} from './knowledgeService';

// Enhanced answer function to determine the best source based on the question
export const getEnhancedAnswer = async (userQuestion: string): Promise<string> => {
  const lowerQuestion = userQuestion.toLowerCase();
  
  // Handle greetings and basic questions
  if (lowerQuestion.includes('merhaba') || lowerQuestion.includes('selam')) {
    return 'Merhaba! Size nasıl yardımcı olabilirim?';
  } 
  else if (lowerQuestion.includes('adın ne') || lowerQuestion.includes('kimsin')) {
    return 'Ben Keşif Küresi yapay zekasıyım. Dünya hakkında size bilgi vermek için buradayım. Tarih, coğrafya, kültür ve güncel bilgiler hakkında sorular sorabilirsiniz.';
  }
  else if (lowerQuestion.includes('nasılsın') || lowerQuestion.includes('iyi misin')) {
    return 'Teşekkür ederim, ben bir yapay zeka olduğum için duygularım yok ama size yardımcı olmak için hazırım!';
  }
  
  // Check for time and date queries
  if (lowerQuestion.includes('saat kaç') || lowerQuestion.includes('tarih') || 
      lowerQuestion.includes('bugün günlerden') || lowerQuestion.includes('bugün ne')) {
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
  
  // Check for historical events
  const historyKeywords = ['tarih', 'savaş', 'kuruluş', 'devrim', 'meydan muharebesi', 'fetih', 'tarihi olay', 'ne zaman oldu'];
  const hasHistoryQuestion = historyKeywords.some(keyword => lowerQuestion.includes(keyword));
  
  if (hasHistoryQuestion) {
    const historicalAnswer = searchHistoricalEvents(lowerQuestion);
    if (historicalAnswer) return historicalAnswer;
  }
  
  // Check for important days
  const dayKeywords = ['bayram', 'özel gün', 'kutlama', 'anma günü'];
  const hasImportantDayQuestion = dayKeywords.some(keyword => lowerQuestion.includes(keyword));
  
  if (hasImportantDayQuestion || lowerQuestion.includes('bugün özel') || lowerQuestion.includes('önemli gün')) {
    const dayInfo = getImportantDayInfo(lowerQuestion);
    if (dayInfo) return dayInfo;
  }
  
  // Check for geography questions
  const geoKeywords = ['nerede', 'coğrafya', 'dağ', 'nehir', 'göl', 'deniz', 'okyanus', 'kıta', 'ada'];
  const hasGeoQuestion = geoKeywords.some(keyword => lowerQuestion.includes(keyword));
  
  if (hasGeoQuestion) {
    const geoInfo = getGeographyInfo(lowerQuestion);
    if (geoInfo) return geoInfo;
  }
  
  // Check for country information and culture
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
  
  // First check for culture-specific queries
  if (lowerQuestion.includes('kültür') || lowerQuestion.includes('gelenek') || 
      lowerQuestion.includes('yemek') || lowerQuestion.includes('mutfak')) {
    
    let countryName = '';
    for (const [key, value] of Object.entries(countries)) {
      if (lowerQuestion.includes(key)) {
        countryName = value;
        break;
      }
    }
    
    if (countryName) {
      const culturalInfo = getCulturalInfo(countryName);
      if (culturalInfo) return culturalInfo;
    }
  }
  
  // Then check for general country information
  let country = '';
  for (const [key, value] of Object.entries(countries)) {
    if (lowerQuestion.includes(key)) {
      country = value;
      break;
    }
  }
  
  if (country) {
    try {
      return await fetchFromWikipedia(country);
    } catch (error) {
      console.error("Wikipedia error:", error);
    }
  }
  
  // For any other query, try to extract meaningful terms and use Wikipedia
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
    try {
      return await fetchFromWikipedia(cleanedQuestion);
    } catch (error) {
      console.error("Wikipedia error:", error);
    }
  }
  
  return 'Bu konu hakkında detaylı bilgim yok. Lütfen daha açık bir soru sorunuz veya haritada bir ülkeye tıklayınız. Tarih, coğrafya, kültür veya güncel olaylar hakkında sorular sorabilirsiniz.';
};
