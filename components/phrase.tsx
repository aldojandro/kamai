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
        return;
      }

      if (sectionTop + sectionHeight < 0) {
        setScrollProgress(2.5);
        setIsComplete(true);
        setHasPassed(true); // La sección ha pasado completamente
        return;
      } else {
        setHasPassed(false);
      }

      const scrollableDistance = sectionHeight - windowHeight;
      const scrolled = -sectionTop;
      
      // Dividimos el scroll en 5 partes iguales del scrollableDistance:
      // Parte 1 (0 a 1/5): scrollProgress 0 a 0.5 → rotación 0° a 360° (1 rotación completa) → texto aparece cuando scrollProgress = 0.5
      // Parte 2-3 (1/5 a 3/5): scrollProgress 0.5 a 1.5 → rotación 360° a 720° (1 rotación adicional)
      // Parte 4-5 (3/5 a 1): scrollProgress 1.5 a 2.5 → rotación 720° a 1080° (1 rotación adicional)
      // 
      // El texto aparece cuando scrollProgress >= 0.5 (después de exactamente 1 rotación = 360°)
      const partSize = scrollableDistance / 5;
      let progress = 0;
      
      if (scrolled <= partSize) {
        // Primera parte (1/5): 1 rotación completa (0° a 360°)
        progress = (scrolled / partSize) * 0.5; // 0 a 0.5
      } else if (scrolled <= partSize * 3) {
        // Segunda y tercera parte (2/5): primera rotación adicional (360° a 720°)
        progress = 0.5 + ((scrolled - partSize) / (partSize * 2)) * 1; // 0.5 a 1.5
      } else if (scrolled <= scrollableDistance) {
        // Cuarta y quinta parte (2/5): segunda rotación adicional (720° a 1080°)
        progress = 1.5 + ((scrolled - partSize * 3) / (partSize * 2)) * 1; // 1.5 a 2.5
      } else {
        // Scroll normal después de completar las 3 rotaciones
        progress = 2.5;
      }
      progress = Math.max(0, Math.min(2.5, progress));

      setScrollProgress(progress);

      if (progress >= 0.5) {
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

  // Rotación ajustada para que el texto aparezca después de exactamente 1 rotación visual:
  // - scrollProgress 0 a 0.5: Primera rotación completa (0° a 360°) → texto aparece cuando scrollProgress = 0.5
  // - scrollProgress 0.5 a 1.5: Primera rotación adicional (360° a 720°)
  // - scrollProgress 1.5 a 2.5: Segunda rotación adicional (720° a 1080°)
  // Total: 1080° (3 rotaciones) cuando scrollProgress = 2.5
  // 
  // Fórmula: cuando scrollProgress = 0.5, rotation = 360° (1 rotación completa)
  let rotation = 0;
  if (scrollProgress <= 0.5) {
    // Primera rotación: 0° a 360° cuando scrollProgress va de 0 a 0.5
    rotation = (scrollProgress / 0.5) * 360;
  } else if (scrollProgress <= 1.5) {
    // Primera rotación adicional: 360° a 720° cuando scrollProgress va de 0.5 a 1.5
    rotation = 360 + ((scrollProgress - 0.5) / 1) * 360;
  } else if (scrollProgress <= 2.5) {
    // Segunda rotación adicional: 720° a 1080° cuando scrollProgress va de 1.5 a 2.5
    rotation = 720 + ((scrollProgress - 1.5) / 1) * 360;
  } else {
    // Máximo: 1080° (3 rotaciones completas)
    rotation = 1080;
  }

  // Control del cambio de color del background
  // El color cambia durante la primera rotación (0 a 0.5)
  const bgProgress = Math.min(1, scrollProgress / 0.5);
  
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
  
  // El texto aparece exactamente cuando scrollProgress = 0.5 (rotación = 360°, 1 rotación completa)
  // Y permanece visible durante las dos rotaciones adicionales (scrollProgress 0.5 a 2.5)
  const showText = scrollProgress >= 0.5;
  const textOpacity = showText ? 1 : 0;

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: '500vh' }}
    >
      <div
        ref={containerRef}
        className="sticky top-0 w-full h-screen flex items-start justify-center"
          style={{
            backgroundColor: scrollProgress < 0.5 ? bgColor : `rgb(${finalColor.r}, ${finalColor.g}, ${finalColor.b})`,
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
              transition: scrollProgress >= 2.5 ? 'transform 0.3s ease-out' : 'none',
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
              className="absolute inset-0 z-30 flex items-end justify-start px-8 pb-8"
              style={{
                opacity: textOpacity,
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
                    className="font-hepta-slab text-[32px] leading-10 md:text-7xl md:leading-18 text-stone-950 font-normal w-full"
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
