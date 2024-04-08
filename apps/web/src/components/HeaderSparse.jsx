'use client';

import React, {useState} from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import {navItems} from '@/components/Header';
import GithubStars from './GithubStars';

function TopLevelNavItem({ href, children}) {
  return (
    <li>
      <Link
        href={href}
        className="text-irohGray-400 px-3 py-2 rounded-md text-sm font-medium transition ease-in-out delay-50 transition-colors hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}

export function HeaderSparse() {
  let [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function toggleMobileMenu() {
    setMobileMenuOpen(!mobileMenuOpen);
  }

  return (
    <nav id="navbar" className={clsx("fixed w-full transition-colors ease-in duration-1000 animate-all", mobileMenuOpen && 'backdrop-blur-md')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="relative flex items-center justify-between h-20">
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            {/* Mobile menu button  */}
            <button id="toggle-mobile-menu" type="button" onClick={toggleMobileMenu} className="inline-flex items-center justify-center p-2 rounded-md text-irohGray-400 hover:text-white hover:bg-irohGray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex sm:items-stretch sm:justify-start">
            <Link href="/" className="block flex-shrink-0 flex items-center mr-auto">
              <img className="block h-7 w-auto" src="/img/logo/iroh-wordmark-purple.svg" alt="Iroh" width={200} />
            </Link>

            <div className="hidden inset-y-0 sm:block sm:pr-0 sm:inset-auto">
              <ul className="flex space-x-5">
                {navItems.map((item, i ) => {
                  return <TopLevelNavItem key={i} href={item.href}>{item.content}</TopLevelNavItem>;
                })}
                <li className='mt-0.5'>
                  <GithubStars />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div id="mobile-menu" className={clsx("backdrop-blur-md drop-shadow-md sm:hidden transition-colors ease-in duration-1000", mobileMenuOpen ? "block" : "hidden")} aria-hidden="true" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item, i ) => {
            return <Link key={i} href={item.href} className="text-gray-500 block px-3 py-2 rounded-md text-base font-medium">{item.content}</Link>;
          })}
        </div>
      </div>
    </nav>
  );
}
