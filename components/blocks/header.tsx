'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';

export default function Header() {
  // State
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isOverTheTeam, setIsOverTheTeam] = useState(false);
  const [isOverServices, setIsOverServices] = useState(false);

  // Scroll detection and color change logic
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);

      // Check if header is over Services section (when Services sticky items are at top)
      const servicesSection = document.getElementById('servicios');
      if (servicesSection) {
        const servicesRect = servicesSection.getBoundingClientRect();
        // Check if Services section has reached the top of viewport
        // This happens when the sticky services are at top: 0
        // The section top is at or above viewport top, and still visible
        const isServicesAtTop = servicesRect.top <= 0 && servicesRect.bottom > 0;
        setIsOverServices(isServicesAtTop);
      } else {
        setIsOverServices(false);
      }

      // Check if header is over the-team section
      const theTeamSection = document.getElementById('nosotros');
      if (theTeamSection) {
        const teamRect = theTeamSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Check if the-team section is visible in viewport and header is above it
        // Header changes color when the section is in the upper part of the viewport
        const isOverlapping = teamRect.top < windowHeight && teamRect.bottom > 0;
        setIsOverTheTeam(isOverlapping);
      } else {
        setIsOverTheTeam(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculated color classes based on scroll position
  // Header changes to white when over Services (at top) or over the-team
  const shouldBeWhite = isOverServices || isOverTheTeam;
  const textColorClass = shouldBeWhite ? 'text-white' : 'text-stone-900';
  const borderColorClass = shouldBeWhite ? 'border-white/30' : 'border-stone-300';
  const hoverColorClass = 'hover:text-yellow-400';

  return (
    <div className={`bg-transparent fixed top-0 left-0 right-0 z-50 px-7 transition-all duration-300 ${hasScrolled ? 'backdrop-blur-sm' : ''}`}>
      <div className={`flex items-center justify-between py-4 border-b ${borderColorClass}`}>
        {/* Logo - appears on left */}
        <div 
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="cursor-pointer"
        >
          <Image
            src="/logo/kamai-logo-dark.svg"
            alt="Kamai Logo"
            height={24}
            width={100}
            className={`h-5 md:h-6 w-auto transition-all duration-300 ${shouldBeWhite ? 'brightness-0 invert' : ''}`}
            priority
          />
        </div>

        {/* Navigation Menu - appears in center */}
        <NavigationMenu viewport={false}>
          <NavigationMenuList className="gap-6">
            <NavigationMenuItem className="hidden md:block">
              <NavigationMenuLink asChild>
                <a
                  href="#servicios"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`font-hepta-slab nav-link-underline text-base! ${textColorClass} ${hoverColorClass} transition-colors px-4 py-2 rounded-md hover:bg-transparent overflow-visible cursor-pointer`}
                >
                  Servicios
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="hidden md:block">
              <NavigationMenuLink asChild>
                <a
                  href="#valores"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    document.getElementById('valores')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`font-hepta-slab nav-link-underline text-base! ${textColorClass} ${hoverColorClass} transition-colors px-4 py-2 rounded-md hover:bg-transparent overflow-visible cursor-pointer`}
                >
                  Valores
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="hidden md:block">
              <NavigationMenuLink asChild>
                <a
                  href="#nosotros"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    document.getElementById('nosotros')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`font-hepta-slab nav-link-underline text-base! ${textColorClass} ${hoverColorClass} transition-colors px-4 py-2 rounded-md hover:bg-transparent overflow-visible cursor-pointer`}
                >
                  Equipo
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {/* Button - appears on right */}
            <NavigationMenuItem>
              <Button 
                variant="default" 
                className="font-hepta-slab text-sm md:text-base text-stone-950 bg-[#FFE700] rounded-full hover:bg-white cursor-pointer"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Conversemos
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
