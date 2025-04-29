
export interface Country {
  id: string;
  name: string;
  capital: string;
  population: string;
  language: string;
  currency: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  funFact: string;
  flagImageUrl: string;
}

const countryData: Country[] = [
  {
    id: "turkey",
    name: "Türkiye",
    capital: "Ankara",
    population: "84 milyon",
    language: "Türkçe",
    currency: "Türk Lirası (TRY)",
    description: "Avrupa ve Asya'nın kesişiminde yer alan Türkiye, zengin tarihi, eşsiz doğal güzellikleri ve çeşitli kültürel mirası ile bilinir. İstanbul, Kapadokya ve Pamukkale gibi dünyaca ünlü turistik yerlere ev sahipliği yapar.",
    coordinates: {
      lat: 38.9637,
      lng: 35.2433
    },
    funFact: "Türkiye, dünyanın en eski yerleşim yerlerinden biri olan Göbekli Tepe'ye ev sahipliği yapmaktadır. Bu arkeolojik alan, yaklaşık 12.000 yıl öncesine tarihlenmektedir.",
    flagImageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg"
  },
  {
    id: "usa",
    name: "Amerika Birleşik Devletleri",
    capital: "Washington, D.C.",
    population: "331 milyon",
    language: "İngilizce",
    currency: "Amerikan Doları (USD)",
    description: "Dünya'nın en güçlü ekonomilerinden birine sahip olan Amerika, 50 eyaletten oluşan federal bir cumhuriyettir. Teknoloji, sinema ve müzik alanlarında dünya liderliği yapmaktadır.",
    coordinates: {
      lat: 37.0902,
      lng: -95.7129
    },
    funFact: "ABD'nin Alaska eyaleti, 17 farklı AB ülkesinin toplam yüzölçümünden daha büyüktür.",
    flagImageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"
  },
  {
    id: "france",
    name: "Fransa",
    capital: "Paris",
    population: "67 milyon",
    language: "Fransızca",
    currency: "Euro (EUR)",
    description: "Batı Avrupa'nın en büyük ülkelerinden biri olan Fransa, sanat, moda, mutfak ve kültür alanında dünyaya öncülük etmektedir. Paris, Eyfel Kulesi ve Louvre Müzesi gibi ikonik yapılara ev sahipliği yapar.",
    coordinates: {
      lat: 46.2276,
      lng: 2.2137
    },
    funFact: "Fransa'nın resmi sınırları, Avrupa'nın yanı sıra Güney Amerika, Karayipler, Hint Okyanusu ve Güney Pasifik'te bulunan denizaşırı toprakları da içerir.",
    flagImageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg"
  },
  {
    id: "japan",
    name: "Japonya",
    capital: "Tokyo",
    population: "126 milyon",
    language: "Japonca",
    currency: "Japon Yeni (JPY)",
    description: "Doğu Asya'da bir ada ülkesi olan Japonya, teknoloji, otomotiv endüstrisi ve geleneksel kültürü ile tanınır. Fuji Dağı, kiraz çiçekleri ve suşi gibi kültürel sembolleriyle bilinir.",
    coordinates: {
      lat: 36.2048,
      lng: 138.2529
    },
    funFact: "Japonya'da 6,800'den fazla ada bulunmaktadır, ancak bunların sadece yaklaşık 430'u insanlar tarafından yerleşim yeri olarak kullanılmaktadır.",
    flagImageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg"
  },
  {
    id: "brazil",
    name: "Brezilya",
    capital: "Brasília",
    population: "213 milyon",
    language: "Portekizce",
    currency: "Brezilya Reali (BRL)",
    description: "Güney Amerika'nın en büyük ülkesi olan Brezilya, dünyanın en büyük yağmur ormanı Amazon'a ev sahipliği yapar. Futbol, karnavallar ve samba dansı ile dünyaca tanınır.",
    coordinates: {
      lat: -14.235,
      lng: -51.9253
    },
    funFact: "Brezilya, dünya kahve üretiminin yaklaşık üçte birini karşılayarak dünyanın en büyük kahve üreticisidir.",
    flagImageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg"
  },
  {
    id: "germany",
    name: "Almanya",
    capital: "Berlin",
    population: "83 milyon",
    language: "Almanca",
    currency: "Euro (EUR)",
    description: "Orta Avrupa'da bulunan Almanya, Avrupa'nın en büyük ekonomisi ve Avrupa Birliği'nin önde gelen üyelerindendir. Otomotiv sanayi, mühendislik ve bira kültürü ile tanınır.",
    coordinates: {
      lat: 51.1657,
      lng: 10.4515
    },
    funFact: "Almanya'da 1500'den fazla bira çeşidi ve 300'den fazla ekmek çeşidi üretilmektedir.",
    flagImageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg"
  },
  {
    id: "italy",
    name: "İtalya",
    capital: "Roma",
    population: "60 milyon",
    language: "İtalyanca",
    currency: "Euro (EUR)",
    description: "Akdeniz'in kuzeyinde yer alan ve çizme şeklindeki İtalya, zengin tarih ve kültürel mirasıyla bilinir. Roma İmparatorluğu'nun merkezi olarak dünya tarihinde önemli bir rol oynamıştır.",
    coordinates: {
      lat: 41.8719,
      lng: 12.5674
    },
    funFact: "İtalya'da 62 milyondan fazla zeytin ağacı bulunmaktadır ve dünyanın en büyük zeytin üreticilerinden biridir.",
    flagImageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg"
  },
  {
    id: "spain",
    name: "İspanya",
    capital: "Madrid",
    population: "47 milyon",
    language: "İspanyolca",
    currency: "Euro (EUR)",
    description: "İber Yarımadası'nda yer alan İspanya, flamenkodan boğa güreşine, tapaslardan paellaya kadar zengin bir kültürel mirasa sahiptir. Akdeniz iklimi ve plajlarıyla ünlüdür.",
    coordinates: {
      lat: 40.4637,
      lng: -3.7492
    },
    funFact: "İspanya, dünyanın en büyük üçüncü şarap üreticisidir ve dünyadaki üzüm bağlarının toplam alanının %15'ine sahiptir.",
    flagImageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg"
  },
  {
    id: "uk",
    name: "Birleşik Krallık",
    capital: "Londra",
    population: "67 milyon",
    language: "İngilizce",
    currency: "İngiliz Sterlini (GBP)",
    description: "İngiltere, İskoçya, Galler ve Kuzey İrlanda'dan oluşan Birleşik Krallık, zengin tarihi, edebiyat ve kültürü ile bilinir. Londra, dünyanın en önemli finans merkezlerinden biridir.",
    coordinates: {
      lat: 55.3781,
      lng: -3.4360
    },
    funFact: "Birleşik Krallık'taki Oxford Üniversitesi, İngilizce konuşulan ülkeler arasındaki en eski üniversitedir ve 900 yıldan uzun bir geçmişe sahiptir.",
    flagImageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg"
  },
  {
    id: "china",
    name: "Çin",
    capital: "Pekin",
    population: "1.4 milyar",
    language: "Mandarin Çincesi",
    currency: "Çin Yuanı (CNY)",
    description: "Dünyanın en kalabalık ülkesi olan Çin, dünyanın en eski medeniyetlerinden birine sahiptir. Büyük Çin Seddi, Yasak Şehir gibi tarihi yapıları ve zengin mutfağıyla tanınır.",
    coordinates: {
      lat: 35.8617,
      lng: 104.1954
    },
    funFact: "Çin'in ünlü Terra Cotta Askerleri, yaklaşık 8,000 farklı asker figüründen oluşur ve her birinin yüz ifadesi birbirinden farklıdır.",
    flagImageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg"
  },
  {
    id: "russia",
    name: "Rusya",
    capital: "Moskova",
    population: "144 milyon",
    language: "Rusça",
    currency: "Rus Rublesi (RUB)",
    description: "Dünyanın en büyük yüzölçümüne sahip ülkesi olan Rusya, Avrupa ve Asya kıtaları arasında uzanır. Zengin kültürü, edebiyatı ve tarihi ile bilinir.",
    coordinates: {
      lat: 61.5240,
      lng: 105.3188
    },
    funFact: "Rusya, dünyanın en derin gölü olan ve dünyanın tatlı su rezervlerinin yaklaşık %20'sini içeren Baykal Gölü'ne ev sahipliği yapmaktadır.",
    flagImageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg"
  },
  {
    id: "canada",
    name: "Kanada",
    capital: "Ottawa",
    population: "38 milyon",
    language: "İngilizce ve Fransızca",
    currency: "Kanada Doları (CAD)",
    description: "Kuzey Amerika kıtasında yer alan Kanada, dünyanın ikinci büyük yüzölçümüne sahip ülkesidir. Doğal güzellikleri, yaşam kalitesi ve çok kültürlü yapısıyla tanınır.",
    coordinates: {
      lat: 56.1304,
      lng: -106.3468
    },
    funFact: "Kanada'daki Churchill, Manitoba, 'Dünyanın Kutup Ayısı Başkenti' olarak bilinir ve her yıl yaklaşık 1,000 kutup ayısı bu bölgeye göç eder.",
    flagImageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg"
  },
  {
    id: "australia",
    name: "Avustralya",
    capital: "Kanberra",
    population: "25 milyon",
    language: "İngilizce",
    currency: "Avustralya Doları (AUD)",
    description: "Okyanusya kıtasında yer alan Avustralya, hem bir kıta hem de bir ülkedir. Kendine özgü doğal yaşamı, Büyük Mercan Resifi ve Opera Binası gibi simgeleriyle tanınır.",
    coordinates: {
      lat: -25.2744,
      lng: 133.7751
    },
    funFact: "Avustralya'nın Great Barrier Reef (Büyük Mercan Resifi), uzaydan görülebilen tek canlı yapıdır ve dünyanın en büyük mercan resifi sistemidir.",
    flagImageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg"
  },
  {
    id: "india",
    name: "Hindistan",
    capital: "Yeni Delhi",
    population: "1.3 milyar",
    language: "Hintçe ve İngilizce (resmi), artı 21 diğer resmi dil",
    currency: "Hint Rupisi (INR)",
    description: "Güney Asya'da yer alan Hindistan, dünyanın en kalabalık ikinci ülkesidir. Zengin kültürü, çeşitli dinleri ve Tac Mahal gibi tarihi yapılarıyla bilinir.",
    coordinates: {
      lat: 20.5937,
      lng: 78.9629
    },
    funFact: "Hindistan, sıfır kavramını bulan ve onu matematiksel bir değer olarak kullanan ilk uygarlıktır.",
    flagImageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg"
  },
  {
    id: "egypt",
    name: "Mısır",
    capital: "Kahire",
    population: "100 milyon",
    language: "Arapça",
    currency: "Mısır Poundu (EGP)",
    description: "Kuzey Afrika'da bulunan Mısır, dünyanın en eski uygarlıklarından birine sahiptir. Piramitler, Sfenks ve Nil Nehri gibi dünyaca ünlü simgeleriyle tanınır.",
    coordinates: {
      lat: 26.8206,
      lng: 30.8025
    },
    funFact: "Gize'deki Büyük Piramit, antik dünyanın yedi harikasından günümüze kalan tek yapıdır ve yaklaşık 4500 yıl önce inşa edilmiştir.",
    flagImageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Egypt.svg"
  }
];

export default countryData;
