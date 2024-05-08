import { BentoGridPage } from '@/components/BentoGrid'
import { Header } from '@/components/Header'

export default function AboutPage() {
  return (
    <div className="bg-grid-small-black/[0.1] ">
      <Header />
      <div className="mx-auto max-w-5xl py-20">
        <h1 className="font-shan text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
          Blog
        </h1>

        <BentoGridPage />
      </div>
    </div>
  )
}
