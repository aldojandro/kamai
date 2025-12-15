'use client';

import Image from 'next/image';

// Subcomponente para items del grid (fases y resultado)
function GridItem({ title, description, duration }: { title: string; description: string; duration?: string }) {
  return (
    <div className="flex flex-col items-end md:items-start gap-2">
      <h4 className="font-hepta-slab text-base md:text-lg font-semibold text-stone-100 shrink-0 uppercase w-full md:w-40 text-right md:text-left">
        {title}
      </h4>
      <div className="flex-1 text-right md:text-left w-full">
        <p className={`font-hepta-slab text-sm text-stone-300 font-normal ${duration ? 'mb-2' : ''}`}>
          {description}
        </p>
        {duration && (
          <span className="font-hepta-slab text-sm text-amber-200 uppercase">
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
      <h4 className="font-hepta-slab text-base md:text-lg font-semibold text-stone-100 shrink-0 uppercase w-full md:w-40 text-right md:text-left">
        {title}
      </h4>
      <div className="flex-1 text-right md:text-left w-full">
        <ul className="space-y-2">
          {items.map((item, itemIndex) => (
            <li key={itemIndex} className="flex items-start gap-2 justify-end md:justify-start">
              <span className="font-hepta-slab text-stone-300 mt-0.5 order-2 md:order-1">•</span>
              <span className="font-hepta-slab text-sm text-stone-300 font-normal flex-1 order-1 md:order-2">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Services() {
  const services = [
    {
      title: 'formar',
      intro: 'Formamos líderes dentro de tu equipo que entienden la IA desde la práctica y continúan la implementación sin depender de nosotros.',
      phases: [
        {
          name: 'Fase 1: Mythbusters',
          description: 'Desmitificamos la IA. Qué puede hacer, qué NO puede hacer, y cómo usarla de forma segura.',
          duration: '2 semanas',
        },
        {
          name: 'Fase 2: Discovery',
          description: 'Mapeamos tus procesos y priorizamos las oportunidades de mayor impacto.',
          duration: '4 semanas',
        },
        {
          name: 'Fase 3: Implementación',
          description: 'Células de 2-4 personas (Champions) construyen soluciones reales con nuestra guía diaria.',
          duration: '6 semanas',
        },
      ],
      resultado: 'Tu equipo tiene Champions internos que pueden crear y mantener soluciones de IA por su cuenta.',
    },
    {
      title: 'implementar',
      intro: 'Diseñamos e implementamos workflows y agentes de IA integrados a tus procesos reales.',
      comoFunciona: [
        'Análisis de procesos existentes',
        'Diseño de soluciones de IA personalizadas',
        'Implementación y integración',
        'Seguimiento y optimización continua',
      ],
      tiposSoluciones: [
        'Agentes conversacionales',
        'Automatización de workflows',
        'Análisis y procesamiento de datos',
        'Integraciones con sistemas existentes',
      ],
      resultado: 'Tienes sistemas de IA funcionando en producción, integrados a tus procesos reales.',
    },
  ];

  return (
    <section id="servicios" className="relative w-full bg-amber-50" style={{ minHeight: '200vh' }}>
      {/* Title - scrolls away normally */}
      <div className="pt-16 md:pt-24 px-7">
        <div className="w-full mx-auto">
          <h2 className="font-hepta-slab font-medium text-5xl md:text-8xl leading-[0.9] md:leading-20 text-stone-950 -mb-2">
            Servicios
          </h2>
        </div>
      </div>

      {/* Services container - services stacked with sticky effect */}
      <div className="relative">
        {services.map((service, index) => {
          // Assign background images: first service gets image 1, second gets image 2
          const backgroundImage = index === 0 
            ? '/photos/pexels-texture-background-1.jpg'
            : '/photos/pexels-texture-background-2.jpg';

          return (
            <div
              key={index}
              className="sticky top-0 w-full overflow-hidden"
              style={{
                height: '100vh',
                zIndex: 10 + index, // First service: 10, second: 11 (higher = on top)
              }}
            >
              {/* Background image layer */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-stone-950">
                  <Image 
                    src={backgroundImage} 
                    alt="" 
                    fill 
                    className="object-cover grayscale" 
                  />
                </div>
              </div>

              {/* Grainy overlay effect */}
              <div
                className="absolute inset-0 z-1 pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'repeat',
                  backgroundSize: '182px',
                  opacity: 0.12,
                }}
              />

              {/* White overlay with opacity */}
              <div className="absolute inset-0 z-2 bg-black opacity-80 pointer-events-none" />

              {/* Content */}
              <div className="relative z-30 w-full h-full flex md:items-center px-7 overflow-y-auto py-10 md:py-0">
                <div className="flex flex-col md:flex-row gap-8 w-full">
                  {/* Left Column: Title and Intro (400px fixed) */}
                  <div className="w-full md:w-[400px] shrink-0">
                    {/* Title */}
                    <div className="mb-4">
                      <h3 className="font-hepta-slab font-semibold text-4xl md:text-6xl leading-[0.9] md:leading-20 text-stone-950 mb-2">
                        <span className="bg-amber-100">{service.title}</span>
                      </h3>
                    </div>

                    {/* Intro text */}
                    <div>
                      <p className="font-hepta-slab text-sm md:text-base text-stone-300 leading-relaxed">
                        {service.intro}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Service Details (flex-1) */}
                  <div className="flex-1 w-full max-w-[320px] md:max-w-none ml-auto md:ml-0">
                    {/* Formaciones: Grid Layout (Service 1 only) */}
                    {service.phases && index === 0 && (
                      <div className="mb-8 md:mb-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                          <GridItem
                            title={service.phases[0].name}
                            description={service.phases[0].description}
                            duration={service.phases[0].duration}
                          />
                          <GridItem
                            title={service.phases[1].name}
                            description={service.phases[1].description}
                            duration={service.phases[1].duration}
                          />
                          <GridItem
                            title={service.phases[2].name}
                            description={service.phases[2].description}
                            duration={service.phases[2].duration}
                          />
                          <GridItem
                            title="Resultado"
                            description={service.resultado}
                          />
                        </div>
                      </div>
                    )}

                    {/* Formaciones: Original Layout (Service 2 and others) */}
                    {service.phases && index !== 0 && (
                      <div className="mb-8 md:mb-12 space-y-6 md:space-y-8">
                        {service.phases.map((phase, phaseIndex) => (
                          <div key={phaseIndex} className="border-b border-stone-200 pb-6 md:pb-8">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
                              <h4 className="font-hepta-slab text-xl md:text-2xl font-semibold text-stone-950">
                                {phase.name}
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                          <GridItemList
                            title="Cómo funciona"
                            items={service.comoFunciona}
                          />
                          <GridItemList
                            title="Tipos de soluciones"
                            items={service.tiposSoluciones}
                          />
                          <div className="md:col-span-2">
                            <GridItem
                              title="Resultado"
                              description={service.resultado}
                            />
                          </div>
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
