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
        <header className='fixed top-0 border-b z-5 border-slate-800/75 w-full backdrop-blur-sm flex justify-between items-center py-10 px-20'>
          <span className='text-transparent bg-clip-text bg-primary text-3xl font-bold'>QR-X</span>
          <Logo />
          <a
            className='text-transparent bg-clip-text bg-primary text-3xl font-bold'
            href='https://github.com/devtrice/qr-x'
            target='_blank'
            rel='noreferrer'
          >
            Github
          </a>
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
