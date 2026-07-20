import React from 'react';
import { Leaf, FlaskConical, BadgeCheck, MapPin, Award, Star, Sparkles } from 'lucide-react';

const ITEMS = [
  { icon: Award,       text: '100% Pure Bilona'  },
  { icon: Leaf,        text: 'No Preservatives'  },
  { icon: FlaskConical, text: 'Lab Tested'        },
  { icon: BadgeCheck,  text: 'FSSAI Certified'   },
  { icon: MapPin,      text: 'Made in India'     },
  { icon: Star,        text: 'A2 Certified Milk' },
  { icon: Sparkles,    text: 'Bilona Churned'    },
];

// Double for seamless infinite loop
const ALL = [...ITEMS, ...ITEMS];

export default function TrustStrip() {
  return (
    <div
      className="py-4 w-full overflow-hidden relative select-none"
      style={{
        background: 'var(--espresso-mid)',
        borderTop: '1px solid rgba(200,164,94,0.15)',
        borderBottom: '1px solid rgba(200,164,94,0.15)',
      }}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {ALL.map((item, i) => (
          <div key={i} className="inline-flex items-center gap-3 px-8 shrink-0">
            <item.icon size={14} style={{ color: 'var(--gold)', opacity: 0.85 }} />
            <span className="font-sans text-[10px] tracking-[0.22em] uppercase font-medium" style={{ color: 'rgba(240,226,204,0.75)' }}>
              {item.text}
            </span>
            <span className="font-sans text-[10px] ml-4" style={{ color: 'rgba(200,164,94,0.25)' }}>✦</span>
          </div>
        ))}
      </div>

      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 pointer-events-none" style={{ background: 'linear-gradient(to right, var(--espresso-mid), transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-24 pointer-events-none" style={{ background: 'linear-gradient(to left, var(--espresso-mid), transparent)' }} />
    </div>
  );
}
