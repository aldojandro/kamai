import HeroNew from '@/components/heroNew';
import ClientStoriesNew from '@/components/ClientStoriesNew';
import ServicesNew from '@/components/ServicesNew';
import ScrollTransformation from '@/components/ScrollTransformation';

export default function Home() {
  return (
    <>
      <HeroNew />
      <ScrollTransformation />
      <ClientStoriesNew />
      <ServicesNew />
    </>
  );
}
