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
      className="py-4 w-full overflow-hidden relative select-none"
      style={{
        background: 'var(--espresso-mid)',
        borderTop:    '1px solid rgba(200,164,94,0.12)',
        borderBottom: '1px solid rgba(200,164,94,0.12)',
      }}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {ALL.map((item, i) => (
          <div key={i} className="inline-flex items-center gap-2.5 px-9 shrink-0">
            <item.icon size={12} style={{ color: 'var(--gold)', opacity: 0.75 }} />
            <span
              className="font-sans text-[10px] tracking-[0.24em] uppercase"
              style={{ color: 'rgba(240,226,204,0.6)', fontFamily: "'Manrope', 'Inter', sans-serif" }}
            >
              {item.text}
            </span>
            <span className="font-sans text-[8px] ml-5" style={{ color: 'rgba(200,164,94,0.2)' }}>◆</span>
          </div>
        ))}
      </div>

      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-28 pointer-events-none"
        style={{ background: 'linear-gradient(to right, var(--espresso-mid), transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-28 pointer-events-none"
        style={{ background: 'linear-gradient(to left, var(--espresso-mid), transparent)' }} />
    </div>
  );
}
