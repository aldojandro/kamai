'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Contact() {
  const [isPhoneHoveredMobile, setIsPhoneHoveredMobile] = useState(false);
  const [isPhoneHoveredDesktop, setIsPhoneHoveredDesktop] = useState(false);
  return (
    <section id="contacto" className="relative w-full bg-black">
      <div className="px-7 pt-24 pb-0 md:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Mobile: Single column layout */}
          <div className="flex flex-col md:hidden gap-8">
            {/* Title */}
            <div className="flex items-center">
              <h2 className="font-hepta-slab font-semibold text-4xl leading-[0.9] text-stone-200">
                Contacto.
              </h2>
            </div>

            {/* Contact details */}
            <div className="flex flex-col items-start gap-4">
              <a
                href="mailto:contacto@kamailab.com"
                className="font-hepta-slab font-medium text-lg transition-opacity text-[#FFE700] hover:bg-amber-100 hover:text-stone-950 px-2"
              >
                contacto@kamailab.com
              </a>
              <a
                href="tel:+51946169112"
                className="font-hepta-slab font-medium text-lg transition-opacity text-[#FFE700] hover:bg-amber-100 hover:text-stone-950 px-2 flex items-center gap-2"
                onMouseEnter={() => setIsPhoneHoveredMobile(true)}
                onMouseLeave={() => setIsPhoneHoveredMobile(false)}
              >
                <Image
                  src={isPhoneHoveredMobile ? "/logo/whatsapp-icon-stone-950.svg" : "/logo/whatsapp-icon-yellow.svg"}
                  alt="WhatsApp"
                  width={20}
                  height={20}
                  className="w-5 h-5 transition-all"
                />
                +51 946 169 112
              </a>
            </div>

            {/* Logo section - appears at bottom on mobile */}
            <div className="relative w-full flex flex-row justify-center items-center gap-10 pt-10">
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
          </div>

          {/* Desktop: Two column layout */}
          <div className="hidden md:flex md:flex-row md:items-end md:justify-between gap-8">
            {/* Left column: Title and contact details */}
            <div className="flex flex-col gap-8">
              {/* Title */}
              <div className="flex items-center">
                <h2 className="font-hepta-slab font-semibold text-5xl leading-[0.9] text-stone-200">
                  Contacto.
                </h2>
              </div>

              {/* Contact details */}
              <div className="flex flex-col items-start gap-4">
                <a
                  href="mailto:contacto@kamailab.com"
                  className="font-hepta-slab font-medium text-lg transition-opacity text-[#FFE700] hover:bg-amber-100 hover:text-stone-950 px-2"
                >
                  contacto@kamailab.com
                </a>
                <a
                  href="tel:+51946169112"
                  className="font-hepta-slab font-medium text-lg transition-opacity text-[#FFE700] hover:bg-amber-100 hover:text-stone-950 px-2 flex items-center gap-2"
                  onMouseEnter={() => setIsPhoneHoveredDesktop(true)}
                  onMouseLeave={() => setIsPhoneHoveredDesktop(false)}
                >
                  <Image
                    src={isPhoneHoveredDesktop ? "/logo/whatsapp-icon-stone-950.svg" : "/logo/whatsapp-icon-yellow.svg"}
                    alt="WhatsApp"
                    width={20}
                    height={20}
                    className="w-5 h-5 transition-all"
                  />
                  +51 946 169 112
                </a>
              </div>
            </div>

            {/* Right column: Logo aligned to right */}
            <div className="flex justify-end items-end opacity-50">
              <img
                src="/logo/kamai-logo-dark.svg"
                alt="Kamai Logo"
                style={{ 
                  height: 'auto', 
                  width: '200px',
                  filter: 'brightness(0) invert(1)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

