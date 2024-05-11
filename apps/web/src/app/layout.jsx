import glob from 'fast-glob'
import NextTopLoader from 'nextjs-toploader'
import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { Plus_Jakarta_Sans } from '@next/font/google'
import '@/styles/tailwind.css'

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
})

export const metadata = {
  title: {
    template: '%s -Devtrice',
    default: 'QR X - Devtrice -Devtrice',
  },
}

export default async function RootLayout({ children }) {
  let pages = await glob('**/*.mdx', { cwd: 'src/app' })
  let allSectionEntries = await Promise.all(
    pages.map(async (filename) => [
      '/' + filename.replace(/(^|\/)page\.mdx$/, ''),
      (await import(`./${filename}`)).sections,
    ])
  )
  let allSections = Object.fromEntries(allSectionEntries)

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`${fontSans.className} flex min-h-full bg-white antialiased dark:bg-zinc-900`}
      >
        <NextTopLoader
          color="#09248c"
          initialPosition={0.08}
          crawlSpeed={300}
          height={4}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #09248c,0 0 5px #2299DD"
          zIndex={1600}
          showAtBottom={false}
        />
        <Providers>
          <div className="w-full">
            <Layout allSections={allSections}>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
