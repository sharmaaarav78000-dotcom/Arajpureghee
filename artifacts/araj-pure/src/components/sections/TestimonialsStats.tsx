import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function AnimatedCounter({ end, suffix = "", duration = 2 }: { end: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = end / (duration * 60); // assuming 60fps
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [end, duration, isInView]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function TestimonialsStats() {
  const reviews = [
    {
      text: "Best A2 Ghee I've ever tasted. The aroma fills the entire kitchen!",
      author: "Rahul Sharma",
      location: "Delhi"
    },
    {
      text: "Pure, natural, and exactly as described. Been ordering every month.",
      author: "Priya Menon",
      location: "Mumbai"
    },
    {
      text: "You can taste the difference from the first spoon. This is the real deal.",
      author: "Ankit Verma",
      location: "Jaipur"
    }
  ];

  return (
    <>
      {/* TESTIMONIALS */}
      <section className="py-24 bg-background border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">What Our Customers Say</h2>
            <div className="h-0.5 w-16 bg-primary mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-card p-8 rounded-xl shadow-sm border border-border flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 text-primary mb-6">
                    {[1, 2, 3, 4, 5].map(star => <span key={star}>★</span>)}
                  </div>
                  <p className="text-foreground/80 font-serif italic text-xl leading-relaxed mb-8">
                    "{review.text}"
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-foreground uppercase tracking-wider text-sm">{review.author}</p>
                  <p className="text-muted-foreground text-sm">{review.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 bg-foreground text-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
          
          <div className="flex flex-col items-center gap-2">
            <div className="text-4xl md:text-5xl font-serif font-bold">
              <AnimatedCounter end={10000} suffix="+" />
            </div>
            <p className="text-primary-foreground/70 uppercase tracking-widest text-sm font-medium">Happy Customers</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="text-4xl md:text-5xl font-serif font-bold">
              <AnimatedCounter end={100} suffix="%" />
            </div>
            <p className="text-primary-foreground/70 uppercase tracking-widest text-sm font-medium">Pure Bilona</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="text-4xl md:text-5xl font-serif font-bold">
              <AnimatedCounter end={500} suffix="+" />
            </div>
            <p className="text-primary-foreground/70 uppercase tracking-widest text-sm font-medium">Orders/Month</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="text-4xl md:text-5xl font-serif font-bold">
              4.9<span className="text-3xl ml-1">★</span>
            </div>
            <p className="text-primary-foreground/70 uppercase tracking-widest text-sm font-medium">Rating</p>
          </div>

        </div>
      </section>
    </>
  );
}