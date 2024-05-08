import React from 'react'
import { Footer } from '@/components/Footer'
import HeroSection from '@/components/HeroSection'

export default function HomePage() {
  return (
    <div>
      <div className="w-full bg-grid-small-black/[0.1] dark:bg-grid-small-white/[0.2]">
        <div
          className="absolute inset-0 ml-36 mt-44 hidden h-[357px] max-w-xs blur-[118px] dark:block sm:max-w-md md:max-w-lg"
          style={{
            background:
              'linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 120.91%)',
          }}
        />
        <HeroSection />
      </div>
      <Footer />
    </div>
  )
}
