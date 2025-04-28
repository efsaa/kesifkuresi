
import React from 'react';
import type { Country } from '../data/CountryData';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface CountryInfoProps {
  country: Country | null;
  onClose: () => void;
  onSpeak: (text: string) => void;
}

const CountryInfo: React.FC<CountryInfoProps> = ({ country, onClose, onSpeak }) => {
  if (!country) return null;

  const handleSpeak = () => {
    const textToSpeak = `${country.name} hakkında bilgi. ${country.name} ülkesinin başkenti ${country.capital}. Nüfusu ${country.population}. ${country.description} İlginç bilgi: ${country.funFact}`;
    onSpeak(textToSpeak);
  };

  return (
    <Card className="info-panel w-full max-w-md animate-scale-in">
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <div className="flex items-center gap-3">
          <img 
            src={country.flagImageUrl} 
            alt={`${country.name} bayrağı`} 
            className="h-8 w-auto shadow-md"
          />
          <h2 className="text-2xl font-semibold text-primary-foreground">{country.name}</h2>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-muted-foreground hover:text-foreground"
          onClick={onClose}
        >
          Kapat
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 bg-muted/40 rounded-md">
              <p className="text-xs text-muted-foreground">Başkent</p>
              <p className="font-medium">{country.capital}</p>
            </div>
            <div className="p-2 bg-muted/40 rounded-md">
              <p className="text-xs text-muted-foreground">Nüfus</p>
              <p className="font-medium">{country.population}</p>
            </div>
            <div className="p-2 bg-muted/40 rounded-md">
              <p className="text-xs text-muted-foreground">Dil</p>
              <p className="font-medium">{country.language}</p>
            </div>
            <div className="p-2 bg-muted/40 rounded-md">
              <p className="text-xs text-muted-foreground">Para Birimi</p>
              <p className="font-medium">{country.currency}</p>
            </div>
          </div>
          
          <div className="mt-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Açıklama</h3>
            <p className="text-foreground">{country.description}</p>
          </div>
          
          <div className="mt-1 p-3 bg-secondary/10 rounded-md border border-secondary/20">
            <h3 className="text-sm font-medium text-secondary mb-1">İlginç Bilgi</h3>
            <p>{country.funFact}</p>
          </div>
          
          <Button 
            className="mt-3 w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            onClick={handleSpeak}
          >
            <span className="mr-2">&#127908;</span>
            Sesli Bilgi Al
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CountryInfo;
