'use client';

import Image from 'next/image';
import RotatingText from '@/components/text-effects/rotating-text';
import Header from './header';

export default function Hero() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background layers - bottom to top */}
      {/* Background image layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-stone-950">
          <Image src="/photos/temporary-photo-montain.avif" alt="" fill className="object-cover grayscale" />
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
      <div className="absolute inset-0 z-2 bg-white opacity-70 pointer-events-none" />

      {/* Header Component - appears at top */}
      <Header />

      {/* Main content container */}
      <div className="relative z-30 w-full h-full p-7">
        <div className="relative flex max-w-4xl mx-auto h-full">
          <div className="flex flex-col justify-center gap-6 w-full">
            <div className="flex flex-col justify-between w-full gap-4 md:gap-8">
              {/* Top section: Pattern and Title */}
              <div className="w-full text-left">
                <div className="mb-6">
                  <Image
                    src="/illustration/kamain-pattern-small-1.svg"
                    alt="Kamai pattern"
                    width={200}
                    height={100}
                    className="w-20 md:w-30 h-auto"
                  />
                </div>
                <h1 className="font-hepta-slab font-normal text-5xl leading-[0.9] md:text-7xl md:leading-16 text-stone-950 max-w-3xl">
                  Convierte la IA <br className="hidden md:block" /> en una ventaja
                </h1>
              </div>

              {/* Bottom section: Description and Rotating Text */}
              <div className="w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-10 md:gap-4">
                <p className="font-hepta-slab text-base md:text-xl font-normal tracking-wide text-stone-700 w-full md:w-auto text-left order-2 md:order-1">
                  Formamos equipos que dominan IA. <br /> Desarrollamos soluciones que funcionan.
                </p>
                <div className="w-full md:w-auto text-right order-1 md:order-2">
                  <RotatingText
                    texts={['operativa', 'rentable', 'escalable']}
                    mainClassName="font-hepta-slab font-medium text-5xl leading-[0.9] md:text-7xl md:leading-16 px-2 bg-stone-950 text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-none inline-flex"
                    staggerFrom={"last"}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={2000}
                  />
                  <div className="mt-4 flex justify-end">
                    <Image
                      src="/illustration/kamain-pattern-small-1.svg"
                      alt="Kamai pattern"
                      width={200}
                      height={100}
                      className="w-30 md:w-40 h-auto scale-x-[-1]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
