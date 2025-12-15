'use client';

import Image from 'next/image';

export default function Contacto() {
  return (
    <section id="contacto" className="relative w-full bg-black">
      {/* Top block - Contact info */}
      <div className="px-7 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-8 md:gap-12">
          {/* Title */}
          <div className="flex items-center">
            <h2 className="font-hepta-slab font-semibold text-5xl md:text-7xl leading-[0.9] md:leading-16 text-stone-200">
              Contacto
            </h2>
          </div>

          {/* Contact details */}
          <div className="flex flex-col items-start md:items-start gap-4">
            <a
              href="mailto:contacto@kamailab.com"
              className="font-hepta-slab font-medium text-xl md:text-3xl hover:opacity-80 transition-opacity bg-[#FFE700] text-black px-2"
            >
              contacto@kamailab.com
            </a>
            <a
              href="tel:+51946169112"
              className="font-hepta-slab font-medium text-xl md:text-3xl hover:opacity-80 transition-opacity bg-[#FFE700] text-black px-2"
            >
              +51 946 169 112
            </a>
          </div>
        </div>
      </div>

      {/* Logo section */}
      <div className="relative w-full flex flex-row justify-center items-center gap-10">
        <div className="flex justify-center items-center opacity-20">
            <img
              src="/logo/kamai-logo-dark.svg"
              alt="Kamai Logo"
              style={{ 
                height: 'auto', 
                width: '100%',
                maxWidth: '800px',
                filter: 'brightness(0) invert(1)',
              }}
            />
        </div>
      </div>

    </section>
  );
}

