'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Services() {
  const services = [
    {
      title: '1. formar',
      intro: 'Nuestra meta es despedirnos: Formamos líderes dentro de tu equipo que entienden la IA desde la práctica y continúan la implementación sin depender de nosotros.',
      cta: 'Quiero formar a mi equipo',
    },
    {
      title: '2. implementar',
      intro: 'Diseñamos e implementamos workflows y agentes de IA integrados a tus procesos reales. Tú defines el problema, nosotros lo resolvemos.',
      cta: 'Tengo un proyecto en mente',
    },
  ];

  return (
    <section id="servicios" className="relative w-full bg-stone-950 min-h-screen md:min-h-[200vh]">
      {/* Section title - appears first at top */}
      <div className="max-w-7xl mx-auto pt-20 md:pt-25 px-7">
        <div className="w-full">
          <h2 className="font-hepta-slab font-semibold text-4xl leading-[0.9] md:text-6xl md:leading-16 text-white">
            Nuestros <br/> Servicios.
          </h2>
        </div>
      </div>

      {/* Services container - services stacked with sticky effect */}
      <div className="relative">
        {services.map((service, index) => {
          return (
            <div
              key={index}
              className={`sticky w-full ${
                index === 0 
                  ? 'bg-stone-950 overflow-hidden pointer-events-auto top-0 h-screen' 
                  : 'bg-transparent overflow-visible pointer-events-auto md:pointer-events-none top-[50vh] md:top-0 h-[50vh] md:h-screen'
              }`}
              style={{
                zIndex: 10 + index, // First service: 10, second: 11 (higher = on top)
              }}
            >
              {index === 0 ? (
                <div className="relative z-30 max-w-7xl mx-auto h-full flex items-center px-7 overflow-y-auto pointer-events-auto">
                  {/* Grid layout: 2 columns on desktop, 1 column on mobile */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full h-full pointer-events-auto">
                    {/* Left column - with content */}
                    <div className="w-full flex flex-col justify-start md:justify-center pt-30 md:pt-0 md:pr-15 md:min-h-120 relative z-50 pointer-events-auto">
                      {/* Service title */}
                      <div className="mb-4 md:mb-10">
                        <h3 className="font-hepta-slab font-semibold text-3xl md:text-5xl text-stone-950 mb-2">
                          <span className="bg-amber-100">{service.title}</span>
                        </h3>
                      </div>

                      {/* Service intro text */}
                      <div className="mb-4 md:mb-8">
                        <p className="font-hepta-slab text-base leading-6 md:text-3xl md:leading-10 text-white">
                          {service.intro}
                        </p>
                      </div>

                      {/* CTA Button */}
                      <div className="relative z-50 pointer-events-auto">
                        <Button 
                          variant="outline"
                          size="lg"
                          type="button"
                          className="font-hepta-slab h-9 md:h-12 text-sm md:text-lg text-white bg-white/10 border-2 border-white/10 rounded-full hover:text-[#FFE700] hover:bg-transparent hover:border-[#FFE700] cursor-pointer group relative z-50 pointer-events-auto"
                          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const contacto = document.getElementById('contacto');
                            if (contacto) {
                              contacto.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                        >
                          {service.cta}
                          <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
                        </Button>
                      </div>
                    </div>

                    {/* Right column - empty on desktop */}
                    <div className="hidden md:block"></div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Left column wrapper - transparent background on desktop */}
                  <div className="hidden md:block absolute left-0 top-0 w-1/2 h-full bg-transparent z-20 pointer-events-none"></div>
                  
                  {/* Right column wrapper - extends to viewport edge */}
                  <div className="hidden md:block absolute right-0 top-0 w-1/2 h-full bg-stone-900 z-30 pointer-events-auto">
                    <div className="max-w-[640px] ml-0 mr-auto h-full flex items-center pr-7 pointer-events-auto">
                      <div className="w-full flex flex-col justify-center pl-15 min-h-120 pointer-events-auto">
                        {/* Service title */}
                        <div className="mb-10 pointer-events-none">
                          <h3 className="font-hepta-slab font-semibold text-3xl md:text-5xl text-stone-950 mb-2">
                            <span className="bg-amber-100">{service.title}</span>
                          </h3>
                        </div>

                        {/* Service intro text */}
                        <div className="mb-8 pointer-events-none">
                          <p className="font-hepta-slab text-xl leading-7 md:text-3xl md:leading-10 text-white">
                            {service.intro}
                          </p>
                        </div>

                        {/* CTA Button */}
                        <div className="pointer-events-auto">
                          <Button 
                            variant="outline"
                            size="lg"
                            className="font-hepta-slab h-12 text-base md:text-lg text-white bg-white/10 border-2 border-white/10 rounded-full hover:text-[#FFE700] hover:bg-transparent hover:border-[#FFE700] cursor-pointer group pointer-events-auto"
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                              e.preventDefault();
                              e.stopPropagation();
                              document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                          >
                            {service.cta}
                            <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile layout */}
                  <div className="md:hidden relative z-30 max-w-7xl mx-auto h-full flex items-center px-7 overflow-y-auto pointer-events-auto bg-stone-900">
                    <div className="w-full flex flex-col justify-center pointer-events-auto">
                      {/* Service title */}
                      <div className="mb-4 pointer-events-none">
                        <h3 className="font-hepta-slab font-semibold text-3xl text-stone-950 mb-2">
                          <span className="bg-amber-100">{service.title}</span>
                        </h3>
                      </div>

                      {/* Service intro text */}
                      <div className="mb-4 pointer-events-none">
                        <p className="font-hepta-slab text-base leading-6 text-white">
                          {service.intro}
                        </p>
                      </div>

                      {/* CTA Button */}
                      <div className="pointer-events-auto">
                        <Button 
                          variant="outline"
                          size="default"
                          className="font-hepta-slab h-9 text-sm text-white bg-white/10 border-2 border-white/10 rounded-full hover:text-[#FFE700] hover:bg-transparent hover:border-[#FFE700] cursor-pointer group pointer-events-auto"
                          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            e.stopPropagation();
                            document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          {service.cta}
                          <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
