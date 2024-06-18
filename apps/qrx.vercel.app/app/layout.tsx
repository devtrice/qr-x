import type { Metadata } from 'next'
import { JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import './index.css'
import { Logo } from 'icons/Logo'

const sans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-sans' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['500'] })

export const metadata: Metadata = {
  title: '',
  description: '',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`font-sans ${mono.variable} ${sans.variable}`}>
        <header className='fixed md:px-20 px-0  top-0 border-b z-5 border-slate-800/75 w-full backdrop-blur-sm py-6'>
          <div className='max-w-screen-xl mx-auto flex justify-between items-center px-6 '>
            <span className='md:text-3xl text-lg text-transparent bg-clip-text bg-primary font-bold'>QR-X</span>
            <Logo />
            <a
              className='md:text-3xl text-lg text-transparent bg-clip-text bg-primary font-bold'
              href='https://github.com/devtrice/qr-x'
              target='_blank'
              rel='noreferrer'
            >
              Github
            </a>
          </div>
        </header>
        {children}
        <footer className='bg-black flex justify-center items-center p-10'>
          <span className='text-transparent bg-clip-text bg-primary text-base font-bold'>
            QR-X &copy; {new Date().getFullYear()} - All Rights Reserved
          </span>
        </footer>
      </body>
    </html>
  )
}
