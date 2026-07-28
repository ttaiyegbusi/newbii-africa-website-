import { Header } from './sections/Header/Header';
import { Hero } from './sections/Hero/Hero';
import { Stats } from './sections/Stats/Stats';
import { Backstory } from './sections/Backstory/Backstory';
import { About } from './sections/About/About';
import { Programs } from './sections/Programs/Programs';
import { Events } from './sections/Events/Events';
import { Testimonials } from './sections/Testimonials/Testimonials';
import { Partnership } from './sections/Partnership/Partnership';
import { Faq } from './sections/Faq/Faq';
import { CommunityBanner } from './sections/CommunityBanner/CommunityBanner';
import { Footer } from './sections/Footer/Footer';
import { PixelRailDivider } from './components/layout/PixelRailDivider';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PixelRailDivider variant="down" />
        <Stats />
        <Backstory />
        <About />
        <Programs />
        <Events />
        <Testimonials />
        <Partnership />
        <Faq />
        <CommunityBanner />
        <PixelRailDivider variant="up" />
        <Footer />
      </main>
    </>
  );
}
