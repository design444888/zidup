"use client"

import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { 
  ProblemSection, 
  SolutionSection, 
  HowItWorksSection, 
  UseCasesSection, 
  PricingSection, 
  FAQSection, 
  Footer 
} from "@/components/LandingSections"
import { motion, useScroll, useSpring } from "framer-motion"

export default function Home() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <main className="relative min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <div className="gradient-glow" />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <div className="space-y-12 md:space-y-24">
        <Hero />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <ProblemSection />
        </motion.div>

        <SolutionSection />
        
        <HowItWorksSection />
        
        <UseCasesSection />
        
        <PricingSection />
        
        <FAQSection />
        
        <Footer />
      </div>
    </main>
  )
}
