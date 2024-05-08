'use client'

import { useContext } from 'react'
import { useRouter } from 'next/navigation'

import { AppContext } from '@/app/providers'
import { Prose } from '@/components/Prose'
import { formatDate } from '@/lib/formatDate'
import References from '@/components/References'
import BlogHeader from '@/components/BlogHeader'
import { FooterMarketing } from './FooterMarketing'
import { ChevronLeftIcon } from '@heroicons/react/20/solid'

function ArrowLeftIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function BlogPostLayout({ article, references = [], children }) {
  let router = useRouter()
  let { previousPathname } = useContext(AppContext)

  return (
    <div>
      <BlogHeader />
      <div className="px-5 sm:px-0 mt-16 lg:mt-32">
        <div className="xl:relative">
          <div className="mx-auto mt-32 mb-64 max-w-2xl">
            <a
              href="/blog"
              aria-label="Go back to articles"
              className="flex text-sm font-medium text-blue-500 mb-5"
            >
              <ChevronLeftIcon className="mr-1 mt-1 h-4 w-4" />
              Blog Index
            </a>
            <article>
              <header className="flex flex-col">
                <h1 className="text-4xl font-space tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
                  {article.title}
                </h1>
                <time
                  dateTime={article.date}
                  className="mt-5 flex items-center text-base text-zinc-400 dark:text-zinc-500"
                >
                  {formatDate(article.date)}
                </time>
              </header>
              <Prose className="mt-8" data-mdx-content>
                {children}
                {references.length > 0 && (
                  <References references={references} />
                )}
              </Prose>
            </article>
          </div>
        </div>
      </div>
      <FooterMarketing />
    </div>
  )
}
