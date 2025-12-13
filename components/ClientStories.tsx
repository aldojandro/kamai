'use client';

import { useState, useRef, useEffect } from 'react';
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

interface ClientStoriesProps {
  title: string;
  description?: string;
  stories: ClientStory[];
}

function CardWithVideo({ story }: { story: ClientStory }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isHovered) {
      // Cancel any pending pause
      if (playPromiseRef.current) {
        playPromiseRef.current = null;
      }
      
      // Play video
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromiseRef.current = playPromise;
        playPromise
          .then(() => {
            // Video is playing
            playPromiseRef.current = null;
          })
          .catch((error) => {
            // Ignore abort errors (they happen when pause interrupts play)
            if (error.name !== 'AbortError') {
              console.error('Error playing video:', error);
            }
            playPromiseRef.current = null;
          });
      }
    } else {
      // Pause video
      if (playPromiseRef.current) {
        playPromiseRef.current.then(() => {
          video.pause();
          video.currentTime = 0;
        }).catch(() => {
          video.pause();
          video.currentTime = 0;
        });
        playPromiseRef.current = null;
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  }, [isHovered]);

  return (
    <Link
      href={story.href || '#'}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-[480px] rounded-none overflow-hidden transition-colors bg-gray-950">
        {/* Image - hidden on hover */}
        {story.image && (
          <Image
            src={story.image}
            alt={story.clientName}
            fill
            className={`object-cover transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
            style={{ zIndex: 1 }}
          />
        )}
        
        {/* Video - shown on hover */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            zIndex: isHovered ? 30 : 0,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            pointerEvents: isHovered ? 'auto' : 'none',
            visibility: isHovered ? 'visible' : 'hidden'
          }}
          loop
          muted
          playsInline
          preload="auto"
          onError={(e) => {
            console.error('Video error:', e);
          }}
          onLoadedData={() => {
            console.log('Video loaded successfully');
          }}
        >
          <source src="/videos/tati-speaking-video.mp4" type="video/mp4" />
          Tu navegador no soporta la reproducción de video.
        </video>

        {/* Text content - hidden on hover */}
        <div 
          className={`relative h-full flex flex-col justify-end transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`} 
          style={{ zIndex: isHovered ? 0 : 20, pointerEvents: isHovered ? 'none' : 'auto' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 20%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.05) 80%, transparent 100%)'
            }}
          />
          <div className="relative w-full px-5 md:px-6 py-8 backdrop-blur-xs">
            <Image
              src="/logo/taxfyle-logo-white.svg"
              alt="Taxfyle"
              width={70}
              height={24}
              className="h-3 md:h-4 w-auto mb-4"
            />
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-1">
              {story.clientName}
            </h3>
            <span className="text-xs md:text-sm text-gray-300">
              {story.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ClientStories({
  title,
  description,
  stories
}: ClientStoriesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const topLeftPatternRef = useRef<HTMLDivElement>(null);
  const bottomRightPatternRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !topLeftPatternRef.current || !bottomRightPatternRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress (0 when section enters viewport, 1 when fully scrolled)
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
      
      // Move top left pattern to the left (50% of its width)
      const topLeftOffset = scrollProgress * (topLeftPatternRef.current.offsetWidth * 0.5);
      topLeftPatternRef.current.style.transform = `translateX(-${topLeftOffset}px)`;
      
      // Move bottom right pattern to the right (50% of its width)
      const bottomRightOffset = scrollProgress * (bottomRightPatternRef.current.offsetWidth * 0.5);
      bottomRightPatternRef.current.style.transform = `translateX(${bottomRightOffset}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="nosotros" ref={sectionRef} className="relative w-full py-16 md:py-24 overflow-hidden bg-amber-50">
      {/* Top left pattern - at the extreme top left */}
      <div
        ref={topLeftPatternRef}
        className="hidden md:block absolute top-0 left-0 z-0 pointer-events-none"
        style={{ transition: 'transform 0.1s ease-out' }}
      >
        <Image
          src="/illustration/kamain-pattern.svg"
          alt="Pattern"
          width={160}
          height={160}
          className="h-[240px] w-auto"
        />
      </div>

      {/* Bottom right pattern - at the extreme bottom right, below cards */}
      <div
        ref={bottomRightPatternRef}
        className="absolute bottom-0 right-0 z-0 pointer-events-none"
        style={{ transition: 'transform 0.1s ease-out' }}
      >
        <Image
          src="/illustration/kamain-pattern.svg"
          alt="Pattern"
          width={160}
          height={160}
          className="h-[240px] w-auto"
        />
      </div>

      <div className="max-w-6xl mx-auto p-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[400px_1fr] gap-8 lg:gap-16 items-end">
          {/* Left column: Title and description */}
          <div className="lg:sticky lg:top-24 gap-4 w-full md:max-w-[400px]">
            <h2 className="font-bebas-neue font-bold text-7xl md:text-8xl leading-[0.9] md:leading-20 text-gray-950">
              {title}
            </h2>
            {description && (
              <p className="text-base md:text-lg text-gray-600 font-light">
                {description}
              </p>
            )}
          </div>

          {/* Right column: Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative">
            {stories.slice(0, 2).map((story) => (
              <CardWithVideo key={story.id} story={story} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
