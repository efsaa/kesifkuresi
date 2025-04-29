
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Country } from '../data/CountryData';

interface VideoDisplayProps {
  country: Country | null;
}

const VideoDisplay: React.FC<VideoDisplayProps> = ({ country }) => {
  const [videoError, setVideoError] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  
  // Güncellenmiş embed URL'leri - "watch?v=" yerine "embed/" formatını kullanıyoruz
  const countryVideos: Record<string, { url: string, name: string }> = {
    turkey: { url: "https://www.youtube.com/embed/UQAReYr9wko?si=I5LvFo0MU3kbdC-i", name: "Türkiye" },
    usa: { url: "https://www.youtube.com/embed/AlmK64-o8d4?si=RdlEJiopUoWvIg_T", name: "ABD" },
    france: { url: "https://www.youtube.com/embed/j9q3NLqUvxI?si=qOe403VQ5aWxWIxH", name: "Fransa" },
    japan: { url: "https://www.youtube.com/embed/WLIv7HnZ_fE?si=tJh1yPFyrR05zKxh", name: "Japonya" },
    brazil: { url: "https://www.youtube.com/embed/sW1SWAN6zlQ?si=PgWu1NczVltjta93", name: "Brezilya" },
    germany: { url: "https://www.youtube.com/embed/SEo8EOmxEuY?si=YAwf_TKn0Q3kmZ1t", name: "Almanya" },
    italy: { url: "https://www.youtube.com/embed/qDaLSX16VTM?si=vvD7yyBSN0FdP8Ez", name: "İtalya" },
    spain: { url: "https://www.youtube.com/embed/PNK0HCyUx8Y?si=Oz9n0sSrtOVr8qE9", name: "İspanya" },
    uk: { url: "https://www.youtube.com/embed/Gc1B-vGEXko?si=WscxfwgvhCyvM7vF", name: "İngiltere" },
    china: { url: "https://www.youtube.com/embed/aLzKNCc2vwY?si=ACgw1YtC7h5oWU2U", name: "Çin" },
    russia: { url: "https://www.youtube.com/embed/6PucIvOn964?si=murwiIBx6G9KEMta", name: "Rusya" },
    canada: { url: "https://www.youtube.com/embed/YQrTIC7T-mw?si=1f-kEqVLYvzvfPe8", name: "Kanada" },
    australia: { url: "https://www.youtube.com/embed/f0PvMmTAUAQ?si=DqeuaC2X22VcJjnO", name: "Avustralya" },
    india: { url: "https://www.youtube.com/embed/35npVaFGHMY?si=f-GBvRtFBVWfVq_N", name: "Hindistan" },
    egypt: { url: "https://www.youtube.com/embed/h9GaP1k6KXk?si=xA1-ad9O6UEh0pmC", name: "Mısır" },
  };
  
  // Varsayılan video URL'i
  const defaultVideo = "https://www.youtube.com/embed/QQYgCxu988s?si=A3oY2Gi0zLgZYlWd";
  
  // If country is provided, use its video, otherwise use selected or default video
  const videoSrc = country ? 
    countryVideos[country.id]?.url || defaultVideo : 
    selectedVideo || defaultVideo;
  
  // Video hatalarını yönet
  const handleVideoError = () => {
    setVideoError(true);
  };

  // Video başarıyla yüklendiğinde
  const handleVideoLoad = () => {
    setVideoError(false);
  };

  // Handle country button click
  const handleCountrySelect = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
    setVideoError(false);
  };

  // Get a name for the current video
  const getVideoTitle = () => {
    if (country) {
      return `${country.name} Video Tanıtımı`;
    } 
    
    if (selectedVideo) {
      const selectedCountry = Object.values(countryVideos).find(c => c.url === selectedVideo);
      return selectedCountry ? `${selectedCountry.name} Video Tanıtımı` : 'Ülke Tanıtım Videosu';
    }
    
    return 'Dünya Tanıtım Videosu';
  };
  
  return (
    <Card className="info-panel w-full max-w-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-primary">
          {getVideoTitle()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-hidden rounded-md" style={{ paddingTop: '56.25%' }}>
          {!videoError ? (
            <iframe
              src={videoSrc}
              className="absolute top-0 left-0 w-full h-full rounded-md"
              title={getVideoTitle()}
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
      <CardFooter className="flex flex-wrap gap-2 justify-center">
        {Object.entries(countryVideos).map(([id, { url, name }]) => (
          <Button
            key={id}
            size="sm"
            variant={selectedVideo === url || (country && country.id === id) ? "default" : "outline"}
            onClick={() => handleCountrySelect(url)}
            className="text-xs"
          >
            {name}
          </Button>
        ))}
      </CardFooter>
    </Card>
  );
};

export default VideoDisplay;
