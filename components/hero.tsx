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

      {/* Main container */}
      <div className="relative z-30 w-full h-full p-8">
        {/* Logo */}
        <div className="absolute top-8 left-8 z-20">
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
        <div className="absolute top-8 right-8 z-20">
        <NavigationMenu viewport={false}>
          <NavigationMenuList className="gap-6">
            <NavigationMenuItem className="hidden md:block">
              <NavigationMenuLink asChild>
                <Link
                  href="#nosotros"
                  className="nav-link-underline text-base! text-white hover:text-yellow-400 transition-colors px-4 py-2 rounded-md hover:bg-transparent overflow-visible"
                >
                  Nosotros
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="hidden md:block">
              <NavigationMenuLink asChild>
                <Link
                  href="#servicios"
                  className="nav-link-underline text-base! text-white hover:text-yellow-400 transition-colors px-4 py-2 rounded-md hover:bg-transparent overflow-visible"
                >
                  Servicios
                </Link>
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
              <Button variant="default" className="text-base text-gray-950 bg-[#FFE700] rounded-none hover:bg-white">
                Contáctanos
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

        {/* Hero content */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
        <div className="flex flex-col items-center justify-center max-w-5xl mx-auto gap-4">
          <h1 className="font-bebas-neue text-7xl leading-[0.9] md:text-9xl md:leading-26 text-white text-center">
            CONVIERTE{' '}
            <GradientText inline className="font-bebas-neue text-7xl md:text-9xl">
              IA
            </GradientText>
            <br />
            EN VENTAJA<br className="md:hidden" /> OPERATIVA
          </h1>
          <p className="text-base md:text-lg px-4 font-extralight text-gray-100 text-center">En <b>KAMAI</b> implementamos workflows y agentes de IA que generan impacto real desde el día uno.</p>
        </div>
      </div>
      </div>
    </div>
  );
}

