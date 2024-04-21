
'use client'
import { Suspense, forwardRef } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { motion, useScroll, useTransform } from 'framer-motion'

import { Button } from '@/components/Button'
import { Logotype } from '@/components/Logotype'
import {
  MobileNavigation,
  useIsInsideMobileNavigation,
} from '@/components/MobileNavigation'
import { useMobileNavigationStore } from '@/components/MobileNavigation'
import { MobileSearch, Search } from '@/components/Search'
import { ThemeToggle } from '@/components/ThemeToggle'

import GithubStars from './GithubStars'
import Loading from './Loading'

export const navItems = [
  { content: 'Docs', href: '/docs' },
  { content: 'Facebook', href: 'https://www.facebook.com/sattt.org' },
]

export function TopLevelNavItem({ href, children }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm leading-5 transition text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      >
        {children}
      </Link>
    </li>
  )
}

export const Header = forwardRef(function Header({ className }, ref) {

  const { isOpen: mobileNavIsOpen } = useMobileNavigationStore()
  const isInsideMobileNavigation = useIsInsideMobileNavigation()

  const { scrollY } = useScroll()
  const bgOpacityLight = useTransform(scrollY, [0, 72], [0.5, 0.9])
  const bgOpacityDark = useTransform(scrollY, [0, 72], [0.2, 0.8])
 



  return (
<Suspense fallback={() => <Loading />}>
<motion.div
      ref={ref}
      className={clsx(
        className,
        'fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 px-0 transition sm:px-6  lg:z-30 lg:px-8 ',
        !isInsideMobileNavigation &&
          'backdrop-blur-sm dark:backdrop-blur',
        isInsideMobileNavigation
          ? 'bg-white dark:bg-zinc-900'
          : 'bg-white/[var(--bg-opacity-light)] dark:bg-zinc-900/[var(--bg-opacity-dark)]'
      )}
      style={{
        '--bg-opacity-light': bgOpacityLight,
        '--bg-opacity-dark': bgOpacityDark,
      }}
    >

      {}
           <Link href="/" className='flex-row items-center hidden md:flex' aria-label="Home">
              
                <div>
              
                 <span className='text-[0.7rem]'> Devtrice </span>
                 <p className='text-[0.7rem] text-primary'>  QR X </p>
                </div>
              </Link>
      <div
        className={clsx(
          'absolute inset-x-0 top-full h-px transition',
          (isInsideMobileNavigation || !mobileNavIsOpen) &&
            'bg-zinc-900/7.5 dark:bg-white/7.5'
        )}
      />

      <Search />
      <div className="flex items-center gap-5 lg:hidden">
        <MobileNavigation />
        <Link href="/" aria-label="Home">
    
         {/* <span className='text-black'> SATTT</span> */}
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <nav className="hidden md:block">
          <ul role="list" className="flex items-center gap-8">
          

            <li className='hover:text-primary dark:hover:text-gray-300 hover:font-bold'>
           
              <Link href={'/blog'}>
               Blog
              </Link>
            </li>
            <li className='hover:text-primary dark:hover:text-gray-300 hover:font-bold'>
              {/* <GithubStars /> */}
              <Link href={'/docs'}>
               Documentation
              </Link>
            </li>

            <li className="mt-2.5">
              <GithubStars />
            
            </li>
          </ul>
        </nav>
        <div className="hidden md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15" />
        <div className="flex gap-4">
          <MobileSearch />
          <ThemeToggle />
        </div>
      
      </div>
    </motion.div>
</Suspense>
  )
})
