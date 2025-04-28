
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
    turkey: "https://youtube/embed/_jjIKMl90iM",
    usa: "https://youtube/embed/AlmK64-o8d4",
    france: "https://youtube/embed/j9q3NLqUvxI",
    japan: "https://youtube/embed/WLIv7HnZ_fE",
    brazil: "https://youtube/embed/yeukgKerfqM",
    germany: "https://youtube/embed/SEo8EOmxEuY",
    italy: "https://youtube/embed/qDaLSX16VTM",
    spain: "https://youtube/embed/PNK0HCyUx8Y",
    uk: "https://youtube/embed/Gc1B-vGEXko",
    china: "https://youtube/embed/aLzKNCc2vwY",
    russia: "https://youtube/embed/6PucIvOn964",
    canada: "https://youtube/embed/YQrTIC7T-mw",
    australia: "https://youtube/embed/f0PvMmTAUAQ",
    india: "https://youtube/embed/35npVaFGHMY",
    egypt: "https://youtube/embed/BapSQFJPMM0",
  };
  
  // Varsayılan video URL'i
  const defaultVideo = "https://www.youtube.com/embed/QQYgCxu988s?si=A3oY2Gi0zLgZYlWd";
  
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
