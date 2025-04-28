
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Country } from '../data/CountryData';

interface VideoDisplayProps {
  country: Country | null;
}

const VideoDisplay: React.FC<VideoDisplayProps> = ({ country }) => {
  const [videoError, setVideoError] = useState(false);
  
  // Güncellenmiş embed URL'leri - "watch?v=" yerine "embed/" formatını kullanıyoruz
  const countryVideos: Record<string, string> = {
    turkey: "https://youtu.be/_jjIKMl90iM?si=JZlCikCMRjMlnysL",
    usa: "https://youtu.be/AlmK64-o8d4?si=3usg5wjJnxGh4Mdu",
    france: "https://www.youtube.com/embed/AQ6GmpMu5L8",
    japan: "https://www.youtube.com/embed/cS-hFKC_RKI",
    brazil: "https://youtu.be/yeukgKerfqM?si=hUCdM8jMTS_ZT_je",
    germany: "https://youtu.be/SEo8EOmxEuY?si=7sFGUALBLTUhteoV",
    italy: "https://youtu.be/qDaLSX16VTM?si=e_H2F705On8vWM8-",
    spain: "https://youtu.be/QIiet7Mv0lk?si=Ro-INiYfMobMflej",
    uk: "https://www.youtube.com/embed/X8zLJlU_-60",
    china: "https://youtu.be/aLzKNCc2vwY?si=kjbOKGy0WzDvbr2-",
    russia: "https://youtu.be/6PucIvOn964?si=3NW3s185H2CoZX2N",
    canada: "https://youtu.be/YQrTIC7T-mw?si=4WM8fhbC8u1PhxIC",
    australia: "https://youtu.be/h0yYXjvHV3I?si=2n9cEkBzcfbFa8fY",
    india: "https://youtu.be/35npVaFGHMY?si=MWRcyzbyxp1-lG9B",
    egypt: "https://youtu.be/BapSQFJPMM0?si=A05ln-yvqKU94WBn",
  };
  
  // Varsayılan video URL'i
  const defaultVideo = "https://youtu.be/QQYgCxu988s?si=w4Eg7pBnOzJOaPpm";
  
  const videoSrc = country ? countryVideos[country.id] || defaultVideo : defaultVideo;
  
  // Video hatalarını yönet
  const handleVideoError = () => {
    setVideoError(true);
  };

  // Video başarıyla yüklendiğinde
  const handleVideoLoad = () => {
    setVideoError(false);
  };
  
  return (
    <Card className="info-panel w-full max-w-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-primary">
          {country ? `${country.name} Video Tanıtımı` : 'Dünya Tanıtım Videosu'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-hidden rounded-md" style={{ paddingTop: '56.25%' }}>
          {!videoError ? (
            <iframe
              src={videoSrc}
              className="absolute top-0 left-0 w-full h-full rounded-md"
              title={country ? `${country.name} tanıtım videosu` : 'Dünya tanıtım videosu'}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onError={handleVideoError}
              onLoad={handleVideoLoad}
            ></iframe>
          ) : (
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-muted/20 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2 text-muted-foreground">
                <path d="m10 9 5 3-5 3z"></path>
                <rect width="20" height="14" x="2" y="3" rx="2"></rect>
              </svg>
              <p className="text-muted-foreground text-center px-4">Video şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoDisplay;
