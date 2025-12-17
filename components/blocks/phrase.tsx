'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Globe, Handshake } from 'lucide-react';
import { motion } from 'motion/react';
import BlurText from '@/components/text-effects/blur-text';

export default function Phrase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [shouldShowText, setShouldShowText] = useState(false);

  // Continuous rotation based on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Rotación continua basada en el scroll total de la página
      // Cada 200px de scroll = 1 rotación completa (360°)
      const scrollY = window.scrollY;
      const rotationDegrees = (scrollY / 200) * 360;
      setRotation(rotationDegrees);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
        <div
          style={{
            transform: `rotate(${rotation}deg)`,
          }}
        >
          <Image
            src="/illustration/kamain-pattern-small-1.svg"
            alt=""
            width={200}
            height={100}
            className="w-24 md:w-32 h-auto"
          />
        </div>

        {/* Blur text */}
        <div ref={textRef} className="text-left w-full">
          {shouldShowText && (
            <div className="w-full [&_.blur-text]:inline! [&_.blur-text]:w-auto!">
              {/* @ts-expect-error - BlurText is a .jsx component with optional props that TypeScript incorrectly infers as required */}
              <BlurText
                text="Trabajamos con equipos pequeños y empresas mid-size en Latinoamérica"
                className="font-hepta-slab text-xl leading-7 md:text-4xl md:leading-11 text-stone-950 font-normal"
                delay={10}
                animateBy="words"
              />
              {/* Globe icon with blur animation */}
              <motion.span
                className="inline-block align-middle will-change-[transform,filter,opacity]"
                initial={{ filter: 'blur(10px)', opacity: 0, y: -50 }}
                animate={{
                  filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
                  opacity: [0, 0.5, 1],
                  y: [-50, 5, 0]
                }}
                transition={{
                  duration: 0.7,
                  times: [0, 0.5, 1],
                  delay: (18 * 10) / 1000, // Delay based on word count: "Trabajamos con equipos pequeños y empresas mid-size en Latinoamérica" = 9 words
                  ease: 'easeOut'
                }}
              >
                <Globe className="w-5 h-5 md:w-7 md:h-7 text-stone-950 inline-block align-middle ml-2 md:ml-3 mb-1.5 md:mb-3" />
              </motion.span>
              {/* @ts-expect-error - BlurText is a .jsx component with optional props that TypeScript incorrectly infers as required */}
              <BlurText
                text=" que quieren <b>usar IA para competir contra gigantes.</b> <br/><br/>En un mercado lleno de promesas vacías y demos bonitas, nosotros entregamos <b>resultados concretos</b> y priorizamos la transparencia ante todo."
                className="font-hepta-slab text-xl leading-7 md:text-4xl md:leading-11 text-stone-950 font-normal"
                delay={10}
                animateBy="words"
              />
              {/* Handshake icon with blur animation */}
              <motion.span
                className="inline-block align-middle will-change-[transform,filter,opacity]"
                initial={{ filter: 'blur(10px)', opacity: 0, y: -50 }}
                animate={{
                  filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
                  opacity: [0, 0.5, 1],
                  y: [-50, 5, 0]
                }}
                transition={{
                  duration: 0.7,
                  times: [0, 0.5, 1],
                  // Delay calculation:
                  // First BlurText: "Trabajamos con equipos pequeños y empresas mid-size en Latinoamérica" = 9 words
                  // Second BlurText: " que quieren usar IA para competir contra gigantes. En un mercado lleno de promesas vacías y demos bonitas, nosotros entregamos resultados concretos y priorizamos la transparencia ante todo." = 28 words
                  // Total: (9 + 28) * 10ms = 370ms
                  delay: ((27 + 28) * 10) / 1000,
                  ease: 'easeOut'
                }}
              >
                <Handshake className="w-5 h-5 md:w-7 md:h-7 text-stone-950 inline-block align-middle ml-2 md:ml-3 mb-1.5 md:mb-3" />
              </motion.span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
