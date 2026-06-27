import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Services } from "@/components/sections/Services";
import { Showcase } from "@/components/sections/Showcase";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { Areas } from "@/components/sections/Areas";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <Showcase />
      <Process />
      <About />
      <Testimonials />
      <Areas />
      <Contact />
      <Footer />
    </main>
  );
}
