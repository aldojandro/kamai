'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import GradientTextNew from '@/components/GradientTextNew';
import TextType from '@/components/TextType';
import RotatingText from '@/components/rotating-text';

export default function HeroNew() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showOperativa, setShowOperativa] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleTextComplete = () => {
    setShowOperativa(true);
  };
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background image layer */}
      <div className="absolute inset-0 z-0">
        {/* Add your background image here */}
        <div className="absolute inset-0 bg-stone-950">
          <Image src="/photos/temporary-photo-montain.avif" alt="" fill className="object-cover grayscale" />
          {/* Placeholder for background image - replace with your image */}
          {/* <Image src="/your-image.jpg" alt="" fill className="object-cover" /> */}
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

      {/* Fixed Header: Logo and Navigation */}
      <div className={`bg-transparent fixed top-0 left-0 right-0 z-50 px-7 transition-all duration-300 ${hasScrolled ? 'backdrop-blur-sm' : ''}`}>
        <div className="flex items-center justify-between py-4 border-b border-stone-300">
          {/* Logo */}
          <div>
            <Image
              src="/logo/kamai-logo-dark.svg"
              alt="Kamai Logo"
              height={24}
              width={100}
              className="h-5 md:h-6 w-auto"
              priority
            />
          </div>

          {/* Navigation Menu */}
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="gap-6">
              <NavigationMenuItem className="hidden md:block">
                <NavigationMenuLink asChild>
                  <a
                    href="#nosotros"
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      e.preventDefault();
                      document.getElementById('nosotros')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="nav-link-underline text-base! text-stone-900 hover:text-yellow-400 transition-colors px-4 py-2 rounded-md hover:bg-transparent overflow-visible cursor-pointer"
                  >
                    Nosotros
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="hidden md:block">
                <NavigationMenuLink asChild>
                  <a
                    href="#servicios"
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      e.preventDefault();
                      document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="nav-link-underline text-base! text-stone-900 hover:text-yellow-400 transition-colors px-4 py-2 rounded-md hover:bg-transparent overflow-visible cursor-pointer"
                  >
                    Servicios
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="hidden md:block">
                <NavigationMenuLink asChild>
                  <Link
                    href="#clientes"
                    className="nav-link-underline text-base! text-stone-900 hover:text-yellow-400 transition-colors px-4 py-2 rounded-md hover:bg-transparent overflow-visible"
                  >
                    Clientes
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button variant="default" className="text-sm md:text-base text-stone-950 bg-[#FFE700] rounded-none hover:bg-white">
                  Conversemos
                  <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      {/* Main container */}
      <div className="relative z-30 w-full h-full p-7">
        {/* Hero content */}
        <div className="relative flex w-full h-full">
          <div className="flex flex-col justify-center gap-6 w-full">
            <div className="flex flex-col justify-between w-full gap-4">
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
                <h1 className="font-hepta-slab font-normal text-5xl leading-[0.9] md:text-8xl md:leading-20 text-stone-950 max-w-4xl">
                  Convierte la IA en una ventaja
                </h1>
              </div>

              <div className="w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-10 md:gap-4">
                <p className="font-hepta-slab text-base md:text-xl font-normal tracking-wide text-stone-700 w-full md:w-auto text-left order-2 md:order-1">
                  Formamos equipos que dominan IA. <br /> Desarrollamos soluciones que funcionan.
                </p>
                <div className="w-full md:w-auto text-right order-1 md:order-2">
                  <RotatingText
                    texts={['operativa', 'rentable', 'escalable']}
                    mainClassName="font-hepta-slab font-medium text-5xl leading-[0.9] md:text-8xl md:leading-20 px-2 bg-stone-950 text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-none inline-flex"
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
