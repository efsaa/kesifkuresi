
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
    turkey: "https://www.youtube.com/embed/74Q93P6Y0kk",
    usa: "https://www.youtube.com/embed/WSY4gGHGIr8",
    france: "https://www.youtube.com/embed/AQ6GmpMu5L8",
    japan: "https://www.youtube.com/embed/cS-hFKC_RKI",
    brazil: "https://www.youtube.com/embed/yHLB_0VWJ94",
    germany: "https://www.youtube.com/embed/YT6Pd7A4YVY",
    italy: "https://www.youtube.com/embed/H3XlC_RbCO8",
    spain: "https://www.youtube.com/embed/SqLZAHt1r5g",
    uk: "https://www.youtube.com/embed/X8zLJlU_-60",
    china: "https://www.youtube.com/embed/wdv7gYEkP9k",
    russia: "https://www.youtube.com/embed/M2P1mRCEBWc",
    canada: "https://www.youtube.com/embed/zYJVLex-vFE",
    australia: "https://www.youtube.com/embed/f0hXXoZvmMY",
    india: "https://www.youtube.com/embed/35npVaFGHMY",
    egypt: "https://www.youtube.com/embed/aT1LaX4JmFg",
  };
  
  // Varsayılan video URL'i
  const defaultVideo = "https://www.youtube.com/embed/DKmrVTGMOCM";
  
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
