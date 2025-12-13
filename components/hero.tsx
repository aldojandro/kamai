'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Particles from './Particles';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import GradientText from '@/components/GradientText';

export default function Hero() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Particles background effect */}
      <div className="absolute inset-0 z-0 bg-gray-950">
        <Particles
          className="w-full h-full"
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleColors={['#ffffff']}
          moveParticlesOnHover
          particleHoverFactor={1}
          alphaParticles
          particleBaseSize={100}
          sizeRandomness={1}
          cameraDistance={20}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      {/* Fixed Header: Logo and Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black flex items-center justify-between px-8 py-4">
          {/* Logo */}
          <div>
            <Image
              src="/logo/kamai-logo-yellow.svg"
              alt="Kamai Logo"
              height={24}
              width={100}
              className="h-5 md:h-7 w-auto"
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
                    className="nav-link-underline text-base! text-white hover:text-yellow-400 transition-colors px-4 py-2 rounded-md hover:bg-transparent overflow-visible cursor-pointer"
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
                    className="nav-link-underline text-base! text-white hover:text-yellow-400 transition-colors px-4 py-2 rounded-md hover:bg-transparent overflow-visible cursor-pointer"
                  >
                    Servicios
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="hidden md:block">
                <NavigationMenuLink asChild>
                  <Link
                    href="#clientes"
                    className="nav-link-underline text-base! text-white hover:text-yellow-400 transition-colors px-4 py-2 rounded-md hover:bg-transparent overflow-visible"
                  >
                    Clientes
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button variant="default" className="text-sm md:text-base text-gray-950 bg-[#FFE700] rounded-none hover:bg-white">
                  Contáctanos
                  <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
      </div>

      {/* Main container */}
      <div className="relative z-30 w-full h-full p-8">
        {/* Hero content */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <div className="flex flex-col items-center justify-center max-w-5xl mx-auto gap-4">
            <h1 className="font-archivo-black text-[40px] leading-[0.9] md:text-8xl md:leading-20 text-white text-center">
              CONVIERTE{' '}
              <GradientText inline className="text-[40px] md:text-8xl">
                IA
              </GradientText>
              <br />
              EN VENTAJA<br className="md:hidden" /> OPERATIVA
            </h1>
            <p className="text-base md:text-lg px-4 font-extralight text-gray-100 text-center">En <b>KAMAI</b> implementamos workflows y agentes de IA <br className="hidden md:block" /> que generan impacto real desde el día uno.</p>
          </div>
        </div>

        {/* Expertos en section */}
        <div className="absolute bottom-8 left-8 right-8 z-20 flex items-center justify-center gap-3 md:gap-6 flex-wrap">
          <span className="text-sm md:text-base text-gray-300 font-light">Expertos en</span>
          <div className="flex items-center gap-4 md:gap-8">
            <Image
              src="/logo/n8n-wordmark-white.svg"
              alt="n8n"
              width={60}
              height={24}
              className="h-4 md:h-5 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
            <Image
              src="/logo/claude-wordmark-white.svg"
              alt="Claude"
              width={70}
              height={24}
              className="h-4 md:h-5 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
            <Image
              src="/logo/openai-wordmark-white.svg"
              alt="OpenAI"
              width={80}
              height={24}
              className="h-4 md:h-5 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
            <Image
              src="/logo/gemini-wordmark-white.svg"
              alt="Gemini"
              width={80}
              height={24}
              className="h-4 md:h-5 w-auto mb-2 opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
