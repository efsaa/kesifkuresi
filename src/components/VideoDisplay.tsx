
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Country } from '../data/CountryData';

interface VideoDisplayProps {
  country: Country | null;
}

const VideoDisplay: React.FC<VideoDisplayProps> = ({ country }) => {
  // Expanded video URLs for more countries
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
  
  // Default video URL for countries without specific videos
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
