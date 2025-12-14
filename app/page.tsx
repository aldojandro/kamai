import Hero from '@/components/hero';
import ClientStories from '@/components/ClientStories';
import ServicesDeprecated from '@/components/services-deprecated';

export default function Home() {
  const clientStories = [
    {
      id: '1',
      image: '/photos/tati-headshot-transparent.png',
      clientName: 'Tatiana Leon',
      category: 'Marketing, Design and Product Director',
      cta: 'View case',
      href: '#'
    },
    {
      id: '2',
      image: '/photos/tati-headshot-transparent.png',
      clientName: 'Tatiana Leon',
      category: 'Marketing, Design and Product Director',
      cta: 'View case',
      href: '#'
    }
  ];

  return (
    <>
      <Hero />
      <ClientStories
        title="Los que convierten tus ideas en sistemas"
        stories={clientStories}
      />
      <ServicesDeprecated />
    </>
  );
}
