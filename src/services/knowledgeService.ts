
// Knowledge service that manages different knowledge sources for the AI assistant

// Generic Wikipedia API service
export const fetchFromWikipedia = async (searchTerm: string, language = 'tr'): Promise<string> => {
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
    
    // Get the extract (summary) of the article with a longer length for more detail
    const extractUrl = `https://${language}.wikipedia.org/w/api.php?origin=*&action=query&prop=extracts&explaintext&pageids=${pageId}&format=json`;
    const extractResponse = await fetch(extractUrl);
    const extractData = await extractResponse.json();
    
    const extract = extractData.query.pages[pageId].extract;
    
    // Return a reasonable excerpt for more detailed information
    if (extract.length > 1200) {
      return extract.substring(0, 1200) + '...';
    }
    
    return extract;
  } catch (error) {
    console.error('Wikipedia API error:', error);
    return 'Wikipedia\'dan bilgi alınırken bir hata oluştu.';
  }
};

// Historical events API - simulated based on known historical dates
interface HistoricalEvent {
  date: string;
  event: string;
  importance: string;
}

const historicalEvents: HistoricalEvent[] = [
  { date: "29 Ekim 1923", event: "Türkiye Cumhuriyeti'nin ilanı", importance: "Türk tarihinde dönüm noktası" },
  { date: "19 Mayıs 1919", event: "Mustafa Kemal'in Samsun'a çıkışı", importance: "Kurtuluş Savaşı'nın başlangıcı" },
  { date: "30 Ağustos 1922", event: "Büyük Taarruz ve Dumlupınar Zaferi", importance: "Kurtuluş Savaşı'nın dönüm noktası" },
  { date: "10 Kasım 1938", event: "Mustafa Kemal Atatürk'ün vefatı", importance: "Ulusal yas günü" },
  { date: "23 Nisan 1920", event: "Türkiye Büyük Millet Meclisi'nin açılışı", importance: "Ulusal egemenlik ve çocuk bayramı" },
  { date: "1 Ocak 1923", event: "Miladi takvimin kabulü", importance: "Modernleşme hareketi" },
  { date: "3 Mart 1924", event: "Halifeliğin kaldırılması", importance: "Laiklik ilkesine geçiş" },
  { date: "14 Temmuz 1789", event: "Fransız Devrimi: Bastille Baskını", importance: "Dünya tarihinde dönüm noktası" },
  { date: "4 Temmuz 1776", event: "Amerikan Bağımsızlık Bildirgesi'nin ilanı", importance: "Amerika Birleşik Devletleri'nin kuruluşu" },
  { date: "12 Ekim 1492", event: "Kristof Kolomb'un Amerika kıtasına ulaşması", importance: "Yeni Dünya'nın keşfi" },
  { date: "1453", event: "İstanbul'un Fethi", importance: "Orta Çağ'ın sonu, Yeni Çağ'ın başlangıcı" },
  { date: "1071", event: "Malazgirt Zaferi", importance: "Türklerin Anadolu'ya yerleşmesi" },
  { date: "632", event: "Hz. Muhammed'in vefatı", importance: "İslam tarihinde dönüm noktası" },
  { date: "1914-1918", event: "Birinci Dünya Savaşı", importance: "Global çatışma" },
  { date: "1939-1945", event: "İkinci Dünya Savaşı", importance: "Modern tarihin en büyük savaşı" },
  { date: "9 Kasım 1989", event: "Berlin Duvarı'nın yıkılışı", importance: "Soğuk Savaş'ın sonu" },
  { date: "20 Temmuz 1969", event: "Apollo 11 ile ilk insanın Ay'a ayak basması", importance: "Uzay çağında dönüm noktası" },
];

// Search for historical events based on a query
export const searchHistoricalEvents = (query: string): string => {
  const queryLower = query.toLowerCase();
  const matchingEvents = historicalEvents.filter(event => 
    event.date.toLowerCase().includes(queryLower) || 
    event.event.toLowerCase().includes(queryLower)
  );
  
  if (matchingEvents.length === 0) {
    return "";
  }
  
  let response = "Tarihte bu konuyla ilgili önemli olaylar:\n\n";
  matchingEvents.forEach(event => {
    response += `📅 ${event.date}: ${event.event}\n${event.importance}\n\n`;
  });
  
  return response;
};

// Cultural information database
interface CulturalInfo {
  country: string;
  language: string;
  cuisine: string;
  traditions: string;
  landmarks: string;
}

const culturalDatabase: Record<string, CulturalInfo> = {
  "türkiye": {
    country: "Türkiye",
    language: "Türkçe",
    cuisine: "Kebap, baklava, döner, köfte, mantı, börek",
    traditions: "Ramazan Bayramı, Kurban Bayramı, halk oyunları, el sanatları",
    landmarks: "Kapadokya, Pamukkale, Ayasofya, Efes Antik Kenti, Nemrut Dağı"
  },
  "japonya": {
    country: "Japonya",
    language: "Japonca",
    cuisine: "Suşi, ramen, tempura, miso çorbası",
    traditions: "Çay seremonisi, ikebana, kimonolar, Sakura festivali",
    landmarks: "Fuji Dağı, Tokyo Kulesi, Kyoto tapınakları"
  },
  "fransa": {
    country: "Fransa",
    language: "Fransızca",
    cuisine: "Croissant, şaraplar, peynirler, ratatouille",
    traditions: "14 Temmuz Bastille Günü, festivaller, moda",
    landmarks: "Eyfel Kulesi, Louvre Müzesi, Notre Dame Katedrali"
  },
  "mısır": {
    country: "Mısır",
    language: "Arapça",
    cuisine: "Köshari, falafel, mulukhiyah, baklava",
    traditions: "Ramadan kutlamaları, halk dansları, el sanatları",
    landmarks: "Piramitler, Sfenks, Kahire Müzesi, Nil Nehri"
  }
};

// Search for cultural information
export const getCulturalInfo = (country: string): string => {
  const countryKey = country.toLowerCase();
  
  if (culturalDatabase[countryKey]) {
    const info = culturalDatabase[countryKey];
    return `${info.country} Kültürel Bilgiler:\n\n` +
           `🗣️ Dil: ${info.language}\n` +
           `🍲 Mutfak: ${info.cuisine}\n` +
           `🎭 Gelenekler: ${info.traditions}\n` +
           `🏛️ Önemli Yerler: ${info.landmarks}\n`;
  }
  
  return "";
};

// Important days calendar
interface ImportantDay {
  date: string;
  name: string;
  description: string;
}

const importantDays: ImportantDay[] = [
  { date: "1 Ocak", name: "Yılbaşı", description: "Yeni yılın başlangıcı" },
  { date: "8 Mart", name: "Dünya Kadınlar Günü", description: "Kadın hakları ve uluslararası barış günü" },
  { date: "23 Nisan", name: "Ulusal Egemenlik ve Çocuk Bayramı", description: "TBMM'nin açılışı ve çocuklara armağan edilen bayram" },
  { date: "1 Mayıs", name: "İşçi Bayramı", description: "Emek ve dayanışma günü" },
  { date: "19 Mayıs", name: "Atatürk'ü Anma, Gençlik ve Spor Bayramı", description: "Atatürk'ün Samsun'a çıkışını anma günü" },
  { date: "5 Haziran", name: "Dünya Çevre Günü", description: "Çevre koruma ve sürdürülebilirlik bilincini artırma günü" },
  { date: "30 Ağustos", name: "Zafer Bayramı", description: "Büyük Taarruz ve Dumlupınar Zaferi'nin anma günü" },
  { date: "29 Ekim", name: "Cumhuriyet Bayramı", description: "Türkiye Cumhuriyeti'nin kuruluş günü" },
  { date: "10 Kasım", name: "Atatürk'ü Anma Günü", description: "Atatürk'ün ölüm yıldönümü" },
  { date: "24 Kasım", name: "Öğretmenler Günü", description: "Öğretmenlere saygı ve minnet günü" },
];

// Get information about important days
export const getImportantDayInfo = (dateQuery: string): string => {
  const today = new Date();
  const formattedToday = `${today.getDate()} ${getMonthName(today.getMonth())}`;
  
  // Check if asking for today's special day
  if (dateQuery.toLowerCase().includes("bugün") || dateQuery.toLowerCase().includes("günümüz")) {
    const todaySpecialDays = importantDays.filter(day => day.date === formattedToday);
    
    if (todaySpecialDays.length > 0) {
      let response = `Bugün (${formattedToday}) önemli bir gün:\n\n`;
      todaySpecialDays.forEach(day => {
        response += `🎉 ${day.name}: ${day.description}\n`;
      });
      return response;
    } else {
      return `Bugün (${formattedToday}) için kayıtlı özel bir gün bulunmuyor.`;
    }
  }
  
  // Check for specific day query
  const matchingDays = importantDays.filter(day => 
    day.date.toLowerCase().includes(dateQuery.toLowerCase()) || 
    day.name.toLowerCase().includes(dateQuery.toLowerCase())
  );
  
  if (matchingDays.length > 0) {
    let response = `Bu tarihle ilgili önemli günler:\n\n`;
    matchingDays.forEach(day => {
      response += `📅 ${day.date} - ${day.name}: ${day.description}\n`;
    });
    return response;
  }
  
  return "";
};

// Helper function to get month name in Turkish
function getMonthName(month: number): string {
  const monthNames = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
  ];
  return monthNames[month];
}

// Geography database with facts about regions and countries
interface GeographyInfo {
  name: string;
  continent: string;
  capital?: string;
  population?: string;
  area?: string;
  facts: string[];
}

const geographyDatabase: Record<string, GeographyInfo> = {
  "türkiye": {
    name: "Türkiye",
    continent: "Asya ve Avrupa",
    capital: "Ankara",
    population: "84 milyon (2021)",
    area: "783,356 km²",
    facts: [
      "Türkiye, Asya ve Avrupa kıtalarını birbirine bağlayan bir köprü konumundadır.",
      "Ülke topraklarının %97'si Asya'da, %3'ü Avrupa'dadır.",
      "Türkiye'nin en yüksek noktası 5.137 metre ile Ağrı Dağı'dır.",
      "Van Gölü, Türkiye'nin en büyük gölüdür ve bir sodalı göldür.",
      "Türkiye'de 7 coğrafi bölge vardır: Marmara, Ege, Akdeniz, Karadeniz, İç Anadolu, Doğu Anadolu ve Güneydoğu Anadolu."
    ]
  },
  "akdeniz": {
    name: "Akdeniz",
    continent: "Avrupa, Asya ve Afrika arasında",
    facts: [
      "Akdeniz, dünyanın en büyük iç denizidir.",
      "Cebelitarık Boğazı ile Atlas Okyanusu'na bağlanır.",
      "Akdeniz'in ortalama derinliği 1.500 metredir.",
      "Akdeniz'e kıyısı olan 21 ülke vardır.",
      "Akdeniz iklimi, sıcak ve kurak yazlar ile ılık ve yağışlı kışlarla karakterizedir."
    ]
  },
  "himalayalar": {
    name: "Himalayalar",
    continent: "Asya",
    facts: [
      "Himalayalar, dünyanın en yüksek dağ sırasıdır.",
      "Dünya'nın en yüksek 10 zirvesinin tamamı Himalayalarda yer alır.",
      "En yüksek nokta olan Everest Dağı 8.848 metredir.",
      "Himalayalar, Hindistan ve Avrasya levhalarının çarpışması sonucu oluşmuştur.",
      "Bölge, Tibet Platosu ve Güney Asya arasında doğal bir sınır oluşturur."
    ]
  }
};

// Get information about geography
export const getGeographyInfo = (query: string): string => {
  const queryLower = query.toLowerCase();
  
  for (const [key, info] of Object.entries(geographyDatabase)) {
    if (key.includes(queryLower) || info.name.toLowerCase().includes(queryLower)) {
      let response = `🌍 ${info.name} (${info.continent})\n\n`;
      
      if (info.capital) response += `Başkent: ${info.capital}\n`;
      if (info.population) response += `Nüfus: ${info.population}\n`;
      if (info.area) response += `Yüzölçümü: ${info.area}\n\n`;
      
      response += "Coğrafi Bilgiler:\n";
      info.facts.forEach((fact, index) => {
        response += `${index + 1}. ${fact}\n`;
      });
      
      return response;
    }
  }
  
  return "";
};

// Weather data API (mock)
export const fetchWeatherData = async (city: string): Promise<string> => {
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
export const getCurrentTimeAndDate = (): string => {
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
