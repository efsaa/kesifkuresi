
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
  }
];

export default countryData;
