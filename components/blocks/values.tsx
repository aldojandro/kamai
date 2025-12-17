'use client';

import { BookOpen, Award, Brain, Users, Sparkles, BookOpenText, CloudLightning, Boxes } from 'lucide-react';

interface Value {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties; strokeWidth?: number }>;
}

export default function Values() {
  const values: Value[] = [
    {
      title: 'Humildad',
      description: 'No presumimos saberlo todo: el que no aprende y mejora continuamente, se queda atrás.',
      icon: BookOpenText,
    },
    {
      title: 'Excelencia',
      description: 'Si lleva nuestro nombre, funciona y genera impacto.',
      icon: CloudLightning,
    },
    {
      title: 'AI-First',
      description: 'Usamos IA en todo lo que hacemos: desde cómo operamos internamente hasta las soluciones que construimos.',
      icon: Sparkles,
    },
    {
      title: 'Colaboración',
      description: 'Pedimos ayuda sin miedo y la damos sin condiciones.',
      icon: Boxes,
    },
  ];

  return (
    <section id="valores" className="relative w-full bg-stone-900 px-7 py-16 md:py-30">
      {/* Section title */}
      <div className="max-w-7xl mx-auto mb-12 md:mb-16">
        <div className="w-full">
          <h2 className="font-hepta-slab font-semibold text-4xl leading-[0.9] md:text-6xl md:leading-16 text-white">
            Nuestros <br/> Valores.
          </h2>
        </div>
      </div>

      {/* Values cards */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 items-stretch">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <div
                key={index}
                className="relative bg-amber-50 p-6 md:p-8 rounded-lg flex flex-col overflow-hidden"
              >
                {/* Content - Textos arriba */}
                <div className="relative z-10 flex flex-col mb-6 md:mb-8">
                  <h3 className="font-hepta-slab font-semibold text-2xl text-stone-950 mb-2">
                    {value.title}
                  </h3>
                  <p className="font-hepta-slab text-base text-stone-800 pb-20">
                    {value.description}
                  </p>
                </div>

                {/* Floating icon in bottom right corner - partially visible */}
                <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none overflow-hidden">
                  <IconComponent 
                    className="w-32 h-32 md:w-40 md:h-40 text-amber-800" 
                    strokeWidth={0.5}
                    style={{ 
                      transform: 'translate(15%, 0%)',
                    }} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

