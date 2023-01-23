import Hero from '~/components/Hero';
import HomeInfo from '~/components/HomeInfo';
import Discover from '~/components/Discover';
import { useNavigation } from '@remix-run/react';
import Spinner from '~/components/Spinner';

export default function Index() {
  const navi = useNavigation();

  if (navi.state === 'loading') return <Spinner />;

  return (
    <div>
      <Hero />
      <Discover />
      <HomeInfo />
    </div>
  );
}
