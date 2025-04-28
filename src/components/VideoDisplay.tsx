
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
    turkey: "https://www.youtube.com/embed/UQAReYr9wko?si=I5LvFo0MU3kbdC-i",
    usa: "https://www.youtube.com/embed/AlmK64-o8d4?si=RdlEJiopUoWvIg_T",
    france: "https://www.youtube.com/embed/j9q3NLqUvxI?si=qOe403VQ5aWxWIxH",
    japan: "https://www.youtube.com/embed/WLIv7HnZ_fE?si=tJh1yPFyrR05zKxh",
    brazil: "https://www.youtube.com/embed/sW1SWAN6zlQ?si=PgWu1NczVltjta93",
    germany: "https://www.youtube.com/embed/SEo8EOmxEuY?si=YAwf_TKn0Q3kmZ1t",
    italy: "https://www.youtube.com/embed/qDaLSX16VTM?si=vvD7yyBSN0FdP8Ez",
    spain: "https://www.youtube.com/embed/PNK0HCyUx8Y?si=Oz9n0sSrtOVr8qE9",
    uk: "https://www.youtube.com/embed/Gc1B-vGEXko?si=WscxfwgvhCyvM7vF",
    china: "https://www.youtube.com/embed/aLzKNCc2vwY?si=ACgw1YtC7h5oWU2U",
    russia: "https://www.youtube.com/embed/6PucIvOn964?si=murwiIBx6G9KEMta",
    canada: "https://www.youtube.com/embed/YQrTIC7T-mw?si=1f-kEqVLYvzvfPe8",
    australia: "https://www.youtube.com/embed/f0PvMmTAUAQ?si=DqeuaC2X22VcJjnO",
    india: "https://www.youtube.com/embed/35npVaFGHMY?si=f-GBvRtFBVWfVq_N",
    egypt: "https://www.youtube.com/embed/h9GaP1k6KXk?si=xA1-ad9O6UEh0pmC",
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
