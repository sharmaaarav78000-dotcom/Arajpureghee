import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function LegacyFAQ() {
  return (
    <>
      {/* 10. OUR LEGACY */}
      <section id="roots" className="py-32 bg-background relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-primary mb-12">Our Legacy Since 1985</h2>
            
            <p className="font-serif text-2xl md:text-3xl leading-relaxed text-foreground mb-16 italic">
              "Founded under the visionary leadership of our M.D., Ankur Sharma, Araj Dry Fruits & Spices has been a beacon of trust and purity since 1985. For nearly four decades, we have remained steadfast in our commitment to crafting Premium Quality pantry staples. Driven by a deep respect for Ayurvedic traditions, Ankur Sharma established Araj with a singular mission: to safeguard authentic, time-honored methods and deliver 100% Natural, unadulterated goodness that nourishes both body and soul."
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-border">
              <div className="flex flex-col items-center">
                <span className="text-primary text-3xl mb-2">❦</span>
                <h4 className="font-semibold text-foreground uppercase tracking-widest text-sm">Since 1985</h4>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-primary text-3xl mb-2">❦</span>
                <h4 className="font-semibold text-foreground uppercase tracking-widest text-sm">Bilona Method</h4>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-primary text-3xl mb-2">❦</span>
                <h4 className="font-semibold text-foreground uppercase tracking-widest text-sm">Free-grazing Cows</h4>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 11. FAQ */}
      <section className="py-24 bg-card border-t border-border">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-foreground mb-4">Frequently Asked Questions</h2>
            <div className="h-0.5 w-16 bg-primary mx-auto" />
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is A2 Cow Ghee?</AccordionTrigger>
              <AccordionContent>
                A2 ghee is made from the milk of indigenous cow breeds that produce only A2 beta-casein protein, which is easier to digest and richer in nutrients compared to conventional ghee.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>What is the Bilona method?</AccordionTrigger>
              <AccordionContent>
                The Bilona method is a traditional hand-churning process where curd made from whole cow milk is churned using a wooden churner, producing the most authentic and nutritionally rich ghee.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>How long does Araj Pure Ghee last?</AccordionTrigger>
              <AccordionContent>
                When stored in a cool, dry place away from direct sunlight, our ghee remains fresh for up to 12 months. Refrigeration is not required.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Do you ship pan-India?</AccordionTrigger>
              <AccordionContent>
                Yes, we ship to all major cities and towns across India. Delivery typically takes 3-7 business days.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>Is there a minimum order quantity?</AccordionTrigger>
              <AccordionContent>
                No minimum order required. You can order as little as 1 jar.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  );
}