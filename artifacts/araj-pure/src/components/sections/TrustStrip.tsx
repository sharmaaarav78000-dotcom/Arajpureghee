import React from 'react';
import { FlaskConical, BadgeCheck, Leaf, PackageCheck, Clock, Wheat, Droplets } from 'lucide-react';

const ITEMS = [
  { icon: FlaskConical, text: 'Lab Tested'          },
  { icon: BadgeCheck,   text: 'FSSAI Certified'     },
  { icon: Leaf,         text: 'No Preservatives'    },
  { icon: Clock,        text: 'Traditional Process' },
  { icon: PackageCheck, text: 'Freshly Packed'      },
  { icon: Wheat,        text: 'Bilona Churned'      },
  { icon: Droplets,     text: 'Pure A2 Milk'        },
];

const ALL = [...ITEMS, ...ITEMS];

export default function TrustStrip() {
  return (
    <div
      className="py-4 w-full overflow-hidden relative select-none bg-[#121414]/92 backdrop-blur-xl border-y border-[#D6B36A]/20 shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {ALL.map((item, i) => (
          <div key={i} className="inline-flex items-center gap-3 px-10 shrink-0">
            <item.icon size={13} className="text-[#D6B36A] opacity-95" />
            <span
              className="font-sans text-[10px] tracking-[0.26em] uppercase text-[#F5F1E8]/75"
            >
              {item.text}
            </span>
            <span className="font-sans text-[7px] ml-5 text-[#D6B36A]/45">◆</span>
          </div>
        ))}
      </div>

      {/* Fade edges */}
      <div
        className="absolute inset-y-0 left-0 w-32 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #121414, transparent)' }}
      />
      <div
        className="absolute inset-y-0 right-0 w-32 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #121414, transparent)' }}
      />
    </div>
  );
}
