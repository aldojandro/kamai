'use client';

import { Brain, Users, Rocket } from 'lucide-react';

export default function ServicesDeprecated() {
  const cards = [
    {
      title: 'Sistemas de IA',
      description: 'Diseñamos e implementamos workflows y agentes de IA integrados a tus procesos reales.',
      bgColor: 'bg-black',
      textColor: 'text-white',
      icon: Brain,
    },
    {
      title: 'Champions internos',
      description: 'Formamos líderes dentro de tu equipo que entienden la IA desde la práctica y continúan la implementación sin depender de nosotros.',
      bgColor: 'bg-[#FFE700]',
      textColor: 'text-black',
      icon: Users,
    },
    {
      title: 'Trabajo guiado',
      description: '3 horas semanales de trabajo conjunto para destrabar problemas, iterar rápido y acelerar resultados en producción.',
      bgColor: 'bg-black',
      textColor: 'text-white',
      icon: Rocket,
    },
  ];

  return (
    <section id="servicios" className="relative w-full bg-gray-950" style={{ minHeight: '360vh' }}>
      {/* Title - scrolls away normally */}
      <div className="pt-24 pb-16 px-8 max-w-6xl mx-auto">
        <h2 className="text-7xl md:text-8xl font-bebas-neue text-white font-bold">
          Nuestros servicios
        </h2>
      </div>

      {/* Cards container - cards stacked with no gap */}
      <div className="relative">
        {cards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <div
              key={index}
              className={`${card.bgColor} ${card.textColor} sticky top-0 w-full`}
              style={{
                minHeight: '360px',
                zIndex: 10 + index, // First card: 10, second: 11, third: 12 (higher = on top)
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '2rem',
                paddingBottom: '2rem',
              }}
            >
              <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12 px-8 py-10">
                <div className="flex-1 flex flex-col gap-4 w-full md:w-auto">
                  <h3 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-left">
                    {card.title}
                  </h3>
                  <p className="text-xl text-left font-light">
                    {card.description}
                  </p>
                </div>
                <div className="shrink-0">
                  <IconComponent className="w-20 h-20 md:w-24 md:h-24" strokeWidth={1} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Final spacer */}
      <div className="h-screen bg-gray-950" />
    </section>
  );
}
