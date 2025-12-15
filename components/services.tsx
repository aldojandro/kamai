'use client';

import Image from 'next/image';

// Subcomponente para items del grid (fases y resultado)
function GridItem({ title, description, duration, className }: { title: string; description: string; duration?: string; className?: string }) {
  return (
    <div className={`flex flex-col items-end md:items-start gap-2 ${className || ''}`}>
      <h4 className="font-hepta-slab text-lg md:text-xl font-semibold text-stone-100 shrink-0 uppercase w-full md:w-40 text-right md:text-left">
        {title}
      </h4>
      <div className="flex-1 text-right md:text-left w-full">
        <p className={`font-hepta-slab text-base text-stone-200 font-normal ${duration ? 'mb-2' : ''}`}>
          {description}
        </p>
        {duration && (
          <span className="hidden md:inline font-hepta-slab text-sm text-amber-200 uppercase">
            {duration}
          </span>
        )}
      </div>
    </div>
  );
}

// Subcomponente para items del grid con listas (servicio 2)
function GridItemList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col items-end md:items-start gap-2">
      <h4 className="font-hepta-slab text-lg md:text-xl font-semibold text-stone-100 shrink-0 uppercase w-full md:w-40 text-right md:text-left">
        {title}
      </h4>
      <div className="flex-1 text-right md:text-left w-full">
        <ul className="space-y-3">
          {items.map((item, itemIndex) => {
            const isFlipped = itemIndex % 2 === 1; // Alternate: odd indices are flipped
            return (
              <li key={itemIndex} className="flex items-start gap-4 justify-end md:justify-start">
                <div className={`mt-0.5 order-2 md:order-1 ${isFlipped ? 'scale-y-[-1]' : ''}`}>
                  <Image
                    src="/illustration/kamain-form.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                </div>
                <span className="font-hepta-slab text-base text-stone-200 font-normal flex-1 order-1 md:order-2">
                  {item}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default function Services() {
  const services = [
    {
      title: 'formar',
      intro: 'Formamos líderes que continúan sin depender de nosotros.',
      phases: [
        {
          name: 'Fase 1: Mythbusters',
          description: 'Qué sí, qué no y cómo usar IA de forma segura.',
          duration: '2 semanas',
        },
        {
          name: 'Fase 2: Discovery',
          description: 'Mapeo de procesos y foco en alto impacto.',
          duration: '4 semanas',
        },
        {
          name: 'Fase 3: Implementación',
          description: 'Champions construyen soluciones reales con guía diaria.',
          duration: '6 semanas',
        },
      ],
      resultado: 'Champions internos capaces de crear y mantener IA en la operación.',
    },
    {
      title: 'implementar',
      intro: 'Creamos workflows y agentes de IA integrados a tus procesos.',
      comoFunciona: [
        'Entendemos tus procesos',
        'Diseñamos soluciones de IA',
        'Construimos e integramos',
        'Medimos y ajustamos',
      ],
      tiposSoluciones: [
        'Agentes conversacionales',
        'Automatización de workflows',
        'Análisis de datos',
        'Integraciones',
      ],
      resultado: 'Tienes sistemas de IA funcionando en producción, integrados a tus procesos reales.',
    },
  ];

  return (
    <section id="servicios" className="relative w-full bg-stone-950" style={{ minHeight: '200vh' }}>
      {/* Title - scrolls away normally */}
      <div className="pt-16 md:pt-24 px-7">
        <div className="w-full mx-auto">
          <h2 className="font-hepta-slab font-semibold text-5xl md:text-7xl leading-[0.9] md:leading-16 text-white -mb-1">
            Servicios.
          </h2>
        </div>
      </div>

      {/* Services container - services stacked with sticky effect */}
      <div className="relative">
        {services.map((service, index) => {
          // Assign background colors: first service gets stone-950, second gets stone-800
          const backgroundColor = index === 0 ? 'bg-stone-950' : 'bg-stone-900';

          return (
            <div
              key={index}
              className={`sticky top-0 w-full overflow-hidden ${backgroundColor}`}
              style={{
                height: '100vh',
                zIndex: 10 + index, // First service: 10, second: 11 (higher = on top)
              }}
            >
              {/* Content */}
              <div className="relative z-30 w-full h-full flex items-center px-7 overflow-y-auto">
                <div className="flex flex-col md:flex-row gap-8 md:gap-40 w-full md:items-start">
                  {/* Left Column: Title and Intro (400px fixed) */}
                  <div className="w-full md:w-xl shrink-0 md:self-start">
                    {/* Title */}
                    <div className="mb-4">
                      <h3 className="font-hepta-slab font-semibold text-4xl md:text-6xl leading-[0.9] md:leading-20 text-stone-950 mb-2">
                        <span className="bg-amber-100">{service.title}</span>
                      </h3>
                    </div>

                    {/* Intro text */}
                    <div>
                      <p className="font-hepta-slab text-[32px] md:text-4xl leading-none text-white">
                        {service.intro}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Service Details (flex-1) */}
                  <div className="flex-1 w-full ml-auto md:ml-0 md:self-start">
                    {/* Formaciones: Flex Row Layout (Service 1 only) */}
                    {service.phases && index === 0 && (
                      <div className="mb-8 md:mb-0">
                        <div className="flex flex-col md:flex-row gap-8 md:gap-10">
                          <div className="flex-1">
                            <GridItem
                              title={service.phases[0].name}
                              description={service.phases[0].description}
                              duration={service.phases[0].duration}
                            />
                          </div>
                          <div className="flex-1">
                            <GridItem
                              title={service.phases[1].name}
                              description={service.phases[1].description}
                              duration={service.phases[1].duration}
                            />
                          </div>
                          <div className="flex-1">
                            <GridItem
                              title={service.phases[2].name}
                              description={service.phases[2].description}
                              duration={service.phases[2].duration}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Formaciones: Original Layout (Service 2 and others) */}
                    {service.phases && index !== 0 && (
                      <div className="mb-8 md:mb-0 space-y-6 md:space-y-8">
                        {service.phases.map((phase, phaseIndex) => (
                          <div key={phaseIndex} className="border-b border-stone-200 pb-6 md:pb-8">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
                              <h4 className="font-hepta-slab text-xl md:text-2xl font-semibold text-stone-950">
                                {phase.name}Creamos workflows y agentes de IA integrados a tus procesos.
                              </h4>
                              <span className="font-hepta-slab text-sm md:text-base text-stone-600">
                                {phase.duration}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Implementaciones: Grid Layout (Service 2 only) */}
                    {service.comoFunciona && index === 1 && (
                      <div className="mb-8 md:mb-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                          <GridItemList
                            title="Cómo funciona"
                            items={service.comoFunciona}
                          />
                          <GridItemList
                            title="Tipos de soluciones"
                            items={service.tiposSoluciones}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
