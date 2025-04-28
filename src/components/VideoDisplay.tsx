
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Country } from '../data/CountryData';

interface VideoDisplayProps {
  country: Country | null;
}

const VideoDisplay: React.FC<VideoDisplayProps> = ({ country }) => {
  // Sample video URLs - in a real app, these would be actual country videos
  const countryVideos: Record<string, string> = {
    turkey: "https://www.youtube.com/embed/74Q93P6yY0k",
    usa: "https://www.youtube.com/embed/WSY4gGHGIr8",
    france: "https://www.youtube.com/embed/AQ6GmpMu5L8",
    japan: "https://www.youtube.com/embed/cS-hFKC_RKI",
    brazil: "https://www.youtube.com/embed/yHLB_0VWJ94",
  };
  
  // Default video URL
  const defaultVideo = "https://www.youtube.com/embed/DKmrVTGMOCM";
  
  const videoSrc = country ? countryVideos[country.id] || defaultVideo : defaultVideo;
  
  return (
    <Card className="info-panel w-full max-w-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-primary">
          {country ? `${country.name} Video Tanıtımı` : 'Dünya Tanıtım Videosu'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-hidden rounded-md" style={{ paddingTop: '56.25%' }}>
          <iframe
            src={videoSrc}
            className="absolute top-0 left-0 w-full h-full rounded-md"
            title={country ? `${country.name} tanıtım videosu` : 'Dünya tanıtım videosu'}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoDisplay;
