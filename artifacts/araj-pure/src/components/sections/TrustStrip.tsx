import React from 'react';
import { Leaf, FlaskConical, BadgeCheck, MapPin, Award } from 'lucide-react';

export default function TrustStrip() {
  const items = [
    { icon: Award, text: "100% Pure Bilona" },
    { icon: Leaf, text: "No Preservatives" },
    { icon: FlaskConical, text: "Lab Tested" },
    { icon: BadgeCheck, text: "FSSAI Certified" },
    { icon: MapPin, text: "Made in India" }
  ];
  
  return (
    <div className="bg-foreground py-6 w-full overflow-hidden border-y border-primary/20 shadow-inner">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center w-full flex-wrap gap-y-6 gap-x-4 md:flex-nowrap">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-primary flex-1 justify-center min-w-[150px]">
              <item.icon size={22} className="opacity-90" />
              <span className="font-medium tracking-wider uppercase text-xs md:text-sm text-primary-foreground/90">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}