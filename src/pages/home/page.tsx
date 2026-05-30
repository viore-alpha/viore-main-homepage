import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WhyNowSection from './components/WhyNowSection';
import AccelerationSection from './components/AccelerationSection';
import OurAnswerSection from './components/OurAnswerSection';
import AlphadocSection from './components/AlphadocSection';
import HowWeBuildSection from './components/HowWeBuildSection';
import AdvisoryBoardSection from './components/AdvisoryBoardSection';
import VisionSection from './components/VisionSection';
import CareersSection from './components/CareersSection';
import ClosingSection from './components/ClosingSection';
import Footer from './components/Footer';
import HomeSEO from './components/HomeSEO';

const HomePage = () => (
  <div className="min-h-screen text-viore-text">
    <HomeSEO />
    <Navbar />
    <HeroSection />
    <WhyNowSection />
    <AccelerationSection />
    <OurAnswerSection />
    <AlphadocSection />
    <HowWeBuildSection />
    <AdvisoryBoardSection />
    <VisionSection />
    <CareersSection />
    <ClosingSection />
    <Footer />
  </div>
);

export default HomePage;