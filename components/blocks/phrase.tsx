'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import BlurText from '@/components/text-effects/blur-text';

export default function Phrase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [shouldShowText, setShouldShowText] = useState(false);

  // Smooth scroll-based rotation using framer-motion
  const { scrollY } = useScroll();
  // Rotación más lenta: cada 1000px de scroll = 1 rotación completa (360°)
  const rotation = useTransform(scrollY, [0, 1000], [0, 360], {
    clamp: false,
  });

  // Text appearance effect when section enters viewport
  useEffect(() => {
    const currentRef = textRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldShowText(true);
          observer.unobserve(currentRef);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-35 md:py-45">
      <div className="flex flex-col items-center justify-center gap-20 md:gap-25 px-7 max-w-7xl mx-auto">
        {/* Rotating pattern */}
        <motion.div
          style={{
            rotate: rotation,
          }}
          className="will-change-transform"
        >
          <Image
            src="/illustration/kamain-pattern-small-1.svg"
            alt=""
            width={200}
            height={100}
            className="w-24 md:w-32 h-auto"
          />
        </motion.div>

        {/* Blur text */}
        <div ref={textRef} className="text-left w-full">
          {shouldShowText && (
            <div className="w-full [&_.blur-text]:inline! [&_.blur-text]:w-auto!">
              {/* @ts-expect-error - BlurText is a .jsx component with optional props that TypeScript incorrectly infers as required */}
              <BlurText
                text="Trabajamos con equipos pequeños y empresas mid-size en Latinoamérica que quieren <b>usar IA para competir contra gigantes.</b> <br/><br/>En un mercado lleno de promesas vacías y demos bonitas, nosotros entregamos <b>resultados concretos</b> y priorizamos la <b>transparencia</b> ante todo."
                className="font-hepta-slab text-xl leading-7 md:text-4xl md:leading-11 text-stone-950 font-normal"
                delay={10}
                animateBy="words"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
