'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import TextType from '@/components/TextType';
import BlurText from '@/components/blur-text';

export default function Phrase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);
  const [shouldShowText, setShouldShowText] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const updateProgress = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      if (sectionTop > windowHeight) {
        setScrollProgress(0);
        setIsComplete(false);
        setShowSecondLine(false);
        setHasPassed(false);
        setShouldShowText(false);
        return;
      }

      if (sectionTop + sectionHeight < 0) {
        setScrollProgress(1);
        setIsComplete(true);
        setHasPassed(true);
        return;
      } else {
        setHasPassed(false);
      }

      const scrollableDistance = sectionHeight - windowHeight;
      const scrolled = -sectionTop;
      
      // Progreso simple de 0 a 1 mientras se hace scroll por la sección
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

      setScrollProgress(progress);

      // El texto aparece cuando la sección entra completamente en el viewport
      // Esto ocurre cuando la parte superior de la sección alcanza el top del viewport (sectionTop <= 0)
      // y la sección aún está visible (sectionTop + sectionHeight > 0)
      const isSectionFullyInViewport = sectionTop <= 0 && sectionTop + sectionHeight > 0;
      
      if (isSectionFullyInViewport && !shouldShowText) {
        setShouldShowText(true);
      }

      if (progress > 0) {
        setIsComplete(true);
      } else {
        setIsComplete(false);
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  // Rotación continua mientras se hace scroll
  // scrollProgress va de 0 a 1, rotación va de 0° a 720° (2 rotaciones completas)
  // El elemento gira continuamente mientras el usuario hace scroll
  const rotation = scrollProgress * 720;

  // Control del cambio de color del background
  // El color cambia durante todo el scroll (0 a 1)
  const bgProgress = scrollProgress;
  
  // Color inicial: blanco (255, 255, 255)
  // Color final: amarillo (255, 255, 0)
  // Puedes cambiar estos valores para ajustar los colores:
  const startColor = { r: 255, g: 255, b: 255 }; // Color inicial (blanco) 
  const endColor = { r: 255, g: 251, b: 235 };    // Color intermedio (amarillo)
  const finalColor = { r: 255, g: 251, b: 235 };                  // Color final después de scrollProgress >= 1
  
  // Interpolación entre color inicial y final
  const r = Math.floor(startColor.r + (endColor.r - startColor.r) * bgProgress);
  const g = Math.floor(startColor.g + (endColor.g - startColor.g) * bgProgress);
  const b = Math.floor(startColor.b + (endColor.b - startColor.b) * bgProgress);
  const bgColor = `rgb(${r}, ${g}, ${b})`;
  
  // El texto aparece cuando la sección entra completamente en el viewport
  // El BlurText maneja su propia animación una vez que se renderiza
  const showText = shouldShowText;

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: '200vh' }}
    >
      <div
        ref={containerRef}
        className="sticky top-0 w-full h-screen flex items-start justify-center"
          style={{
            backgroundColor: scrollProgress < 1 ? bgColor : `rgb(${finalColor.r}, ${finalColor.g}, ${finalColor.b})`,
            // Cambiar a relative solo cuando la sección haya pasado completamente
            // Esto permite scroll orgánico hacia la siguiente sección sin cortes bruscos
            position: hasPassed ? 'relative' : 'sticky',
          }}
      >
        <div className="relative w-full h-full flex items-start justify-center">
          <div
            className="absolute z-10 top-40"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: scrollProgress >= 1 ? 'transform 0.3s ease-out' : 'none',
            }}
          >
            <div className="relative">
              <Image
                src="/illustration/kamain-pattern-small-1.svg"
                alt=""
                width={200}
                height={100}
                className="w-24 md:w-32 h-auto"
              />
            </div>
          </div>

          {showText && (
            <div
              className="absolute inset-0 z-30 flex items-end justify-start px-7 pb-15"
              style={{
                opacity: 1,
                transition: 'opacity 0.8s ease-in',
              }}
            >
              <div
                className="font-hepta-slab text-2xl leading-[0.9] md:text-7xl md:leading-18 text-stone-950 text-left font-normal flex flex-col gap-2 w-full"
              >
                <div className="w-full">
                  {/* @ts-expect-error - BlurText is a .jsx component with optional props that TypeScript incorrectly infers as required */}
                  <BlurText
                    text="Transformamos a tu equipo en AI-native. En 12 semanas, tus Champions crean soluciones de IA por su cuenta."
                    className="font-hepta-slab text-[32px] leading-10 md:text-5xl md:leading-12 text-stone-950 font-normal w-full"
                    delay={50}
                    animateBy="words"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
