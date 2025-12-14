'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ClientStory {
  id: string;
  image: string;
  clientName: string;
  category: string;
  cta?: string;
  href?: string;
}

function CardWithVideo({ story, index }: { story: ClientStory; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current || !patternRef.current) return;

      const cardRect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress for this specific card
      // 0 when card enters viewport, 1 when card is fully scrolled past
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - cardRect.top) / (windowHeight + cardRect.height)));

      if (index === 0) {
        // Left card: pattern moves from left to center
        const patternWidth = patternRef.current.offsetWidth;
        const cardWidth = cardRef.current.offsetWidth;
        // Start at left edge, end at center
        const startX = -patternWidth / 2;
        const endX = (cardWidth / 2) - (patternWidth / 2);
        const currentX = startX + (endX - startX) * scrollProgress;
        patternRef.current.style.transform = `translateX(${currentX}px) translateY(-50%)`;
      } else {
        // Right card: pattern moves from right to center
        const patternWidth = patternRef.current.offsetWidth;
        const cardWidth = cardRef.current.offsetWidth;
        // Start at right edge, end at center
        const startX = cardWidth - (patternWidth / 2);
        const endX = (cardWidth / 2) - (patternWidth / 2);
        const currentX = startX + (endX - startX) * scrollProgress;
        patternRef.current.style.transform = `translateX(${currentX}px) translateY(-50%)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [index]);

  return (
    <Link
      href={story.href || '#'}
      className="group block"
    >
      <div ref={cardRef} className="relative w-full h-[320px] md:h-[360px] rounded-none overflow-hidden transition-colors bg-stone-200">
        {/* Pattern with parallax effect */}
        <div
          ref={patternRef}
          className="absolute top-1/2 pointer-events-none"
          style={{
            zIndex: 0,
            transition: 'transform 0.1s ease-out',
            left: index === 0 ? '0' : 'auto',
            right: index === 1 ? '0' : 'auto',
          }}
        >
          <Image
            src="/illustration/kamain-pattern.svg"
            alt="Pattern"
            width={160}
            height={160}
            className={`h-[240px] w-auto grayscale ${index === 0 ? 'opacity-20' : 'opacity-10'}`}
          />
        </div>

        {/* Image */}
        {story.image && (
          <>
            <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 1 }}>
              <Image
                src={story.image}
                alt={story.clientName}
                width={360}
                height={360}
                className="max-w-[360px] w-full h-auto object-contain grayscale"
              />
            </div>
            {/* Grainy overlay effect above image */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                zIndex: 2,
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
                backgroundSize: '182px',
                opacity: 0.12,
              }}
            />
          </>
        )}

        {/* Text content */}
        <div
          className="relative h-full flex flex-col justify-end"
          style={{ zIndex: 20 }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 20%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.05) 80%, transparent 100%)'
            }}
          />
          <div className="relative w-full px-5 md:px-6 py-8">
            <h3 className="font-hepta-slab text-lg md:text-xl font-semibold text-white mb-1">
              {story.clientName}
            </h3>
            <span className="font-hepta-slab text-xs md:text-sm text-gray-300">
              {story.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function TheTeam() {
  const clientStories: ClientStory[] = [
    {
      id: '1',
      image: '/photos/tati-headshot-transparent.png',
      clientName: 'Mariano Silva Sarria',
      category: 'Co-Founder & CEO',
      cta: 'View case',
      href: '#'
    },
    {
      id: '2',
      image: '/photos/tati-headshot-transparent.png',
      clientName: 'Tatiana León Iriarte',
      category: 'Co-Founder & CTO',
      cta: 'View case',
      href: '#'
    }
  ];

  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="nosotros" ref={sectionRef} className="relative w-full py-8 md:py-16 overflow-hidden bg-black">
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


      <div className="w-full p-4 md:p-8">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-end justify-between">
          {/* Title - aligned to left */}
          <div className="flex items-end w-full md:w-auto">
            <h2 className="font-hepta-slab font-normal text-5xl md:text-8xl leading-[0.9] md:leading-20 text-[#FFE700]">
              El equipo
            </h2>
          </div>
          {/* Description - aligned to right, below title on mobile */}
          <div className="flex items-end justify-end w-full md:w-auto">
            <p className="font-hepta-slab text-base md:text-lg text-gray-300 text-right max-w-2xl">
              Somos dos founders que trabajan directamente en cada proyecto. No hay capas de gerentes, no hay juniors aprendiendo con tu presupuesto. Quienes diseñan son quienes ejecutan.
            </p>
          </div>
        </div>
      </div>

      {/* Cards - Full width */}
      <div className="w-full px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative w-full">
          {clientStories.slice(0, 2).map((story, index) => (
            <CardWithVideo key={story.id} story={story} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
