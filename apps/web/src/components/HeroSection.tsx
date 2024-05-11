import Link from 'next/link'
import { Spotlight } from './ui/Spotlight'
import { Button } from '@/components/Button'
import HeroBlocks from '@/illustrations/HeroBlocks'

function HeroSection() {
  return (
    <div className="relative mx-auto grid min-h-screen place-items-center overflow-hidden rounded-md py-10 md:py-0">
      {/* <Spotlight className="left-0 -top-40 md:left-60 md:-top-20" fill="cyan" /> */}
      <div className="relative mx-auto flex w-full max-w-screen-lg flex-col gap-12 p-4">
        <h1 className="mx-auto w-full text-4xl font-extrabold lg:text-6xl">
          <span className="mb-6 block">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              The fully-fledged
            </span>
          </span>

          <span className="flex justify-end ">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              QR Code Generator
            </span>
          </span>
        </h1>
        <HeroBlocks className="my-6 block" />
        <div className="mt-4 flex flex-row justify-center gap-4">
          <Button href="/playground">Playground</Button>
          <Button href="/docs" variant="text">
            Documentation
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
