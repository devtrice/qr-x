import { Fragment } from 'react'
import HeroIllustration from 'views/HeroIllustration'
import Playground from 'views/Playground'
import { frameworks, title } from 'constant'

export default function Home() {
  return (
    <main className='py-10 lg:py-32 space-y-20 lg:space-y-40 bg-[#22222B]'>
      <HeroSection />
      <FrameworkSection />
      <PlaygroundSection />
    </main>
  )
}

function HeroSection() {
  return (
    <section className='paging space-y-10 lg:space-y-20'>
      <h1 className='text-7xl leading-snug font-extrabold'>
        <span className='text-transparent bg-clip-text bg-primary animate-in block'>The fully-fledged</span>
        <span className='text-transparent bg-clip-text bg-primary animate-in animate-delay-[0.35s] block ml-[27.5vw]'>
          QR Code generator
        </span>
      </h1>
      <HeroIllustration />
    </section>
  )
}

function FrameworkSection() {
  return (
    <section className='flex items-center justify-between lg:space-x-10 paging'>
      <div className='max-w-xl'>
        <h2 className='text-4xl font-bold text-white animate-duration-150 max-w-lg'>
          {title.map((word, i) => (
            <Fragment key={word}>
              <span className='overflow-hidden h-11 inline-flex'>
                <span
                  style={{ '--animate-delay': `${150 * i}ms` } as never}
                  className={`animate-in ${word === 'libraries' ? 'text-transparent bg-clip-text bg-primary' : word === 'frameworks' ? 'text-transparent bg-clip-text bg-secondary' : ''}`}
                >
                  {word}
                </span>
              </span>{' '}
            </Fragment>
          ))}
        </h2>
        <p className='animate-in text-grey my-2 lg:my-4 animate-delay-1000'>
          QR-X integrates deeply with popular frontend frameworks and libraries, making it easy to generate full-fledged QR codes
          for your development experience
        </p>
      </div>
      <ul className='flex space-x-4'>
        {frameworks.map(({ icon, label }, i) => (
          <li
            key={label}
            style={{ '--animate-delay': `${1000 + 150 * i}ms` } as never}
            className='animate-in size-24 bg-primary rounded-full p-[1px] animate-duration-150'
          >
            <a className='bg-grey-dark size-full flex flex-center rounded-full'>{icon}</a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function PlaygroundSection() {
  return (
    <section className='paging'>
      <h3 className='text-transparent bg-clip-text bg-primary text-4xl leading-normal font-bold'>Try QR-X in action</h3>
      <Playground />
    </section>
  )
}
