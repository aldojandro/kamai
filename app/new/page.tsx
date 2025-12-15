import HeroNew from '@/components/hero-new';
import TheTeam from '@/components/the-team';
import Services from '@/components/services';
import Phrase from '@/components/phrase';
import Contacto from '@/components/contacto';

export default function Home() {
  return (
    <>
      <HeroNew />
      <Phrase />
      <Services />
      <TheTeam />
      <Contacto />
    </>
  );
}
