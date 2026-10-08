import { MotionConfig } from 'framer-motion';
import { About } from './components/about/About';
import { Certifications } from './components/certifications/Certifications';
import { Contact } from './components/contact/Contact';
import { Hero } from './components/hero/Hero';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { Projects } from './components/projects/Projects';
import { Skills } from './components/skills/Skills';

export default function App() {
  return (
    // reducedMotion="user" disables every framer-driven animation prop
    // app-wide when the OS-level prefers-reduced-motion is set.
    <MotionConfig reducedMotion="user">
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
