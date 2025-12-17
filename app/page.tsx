import Hero from '@/components/blocks/hero';
import Team from '@/components/blocks/team';
import Services from '@/components/blocks/services';
import Phrase from '@/components/blocks/phrase';
import Contact from '@/components/blocks/contact';
import Values from '@/components/blocks/values';

export default function Home() {
  return (
    <>
      <Hero />
      <Phrase />
      <Services />
      <Values />
      <Team />
      <Contact />
    </>
  );
}
