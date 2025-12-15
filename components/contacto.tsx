'use client';

import Image from 'next/image';

export default function Contacto() {
  return (
    <section id="contacto" className="relative w-full bg-amber-100">
      {/* Top block - Contact info */}
      <div className="px-7 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12">
          {/* Left column - Title */}
          <div className="flex items-end">
            <h2 className="font-hepta-slab font-semibold text-5xl md:text-7xl leading-[0.9] md:leading-16 text-stone-950">
              Contacto
            </h2>
          </div>

          {/* Right column - Contact details */}
          <div className="flex flex-col items-end md:items-end gap-4">
            <a
              href="mailto:contacto@kamailab.com"
              className="font-hepta-slab text-base md:text-lg text-stone-950 hover:text-stone-700 transition-colors"
            >
              contacto@kamailab.com
            </a>
            <a
              href="tel:+51946169112"
              className="font-hepta-slab text-base md:text-lg text-stone-950 hover:text-stone-700 transition-colors"
            >
              +51 946 169 112
            </a>
          </div>
        </div>
      </div>

      {/* Marquee section */}
      <div className="relative w-full overflow-hidden bg-amber-100">
        <div className="flex animate-marquee whitespace-nowrap">
          {/* First set of items */}
          {[...Array(10)].map((_, i) => (
            <div key={`set1-${i}`} className="flex items-center gap-8 px-8">
              <Image
                src="/logo/kamai-logo-dark.svg"
                alt="Kamai Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
              <Image
                src="/illustration/kamain-pattern-small-1.svg"
                alt="Pattern"
                width={80}
                height={40}
                className="h-10 w-auto"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {[...Array(10)].map((_, i) => (
            <div key={`set2-${i}`} className="flex items-center gap-8 px-8">
              <Image
                src="/logo/kamai-logo-dark.svg"
                alt="Kamai Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
              <Image
                src="/illustration/kamain-pattern-small-1.svg"
                alt="Pattern"
                width={80}
                height={40}
                className="h-10 w-auto"
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

