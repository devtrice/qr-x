import glob from 'fast-glob'
import NextTopLoader from 'nextjs-toploader'
import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import '@/styles/tailwind.css'

export const metadata = {
  title: {
    template: '%s -Devtrice',
    default: 'QR X - Devtrice -Devtrice',
  },
  openGraph: {
  title: "QR X - Devtrice -Devtrice ",
  url: "https://www.sattt.org.mm",
  siteName: "QR X - Devtrice -Devtrice",
  description: "ပိူင်ပဵၼ်လု(လေႃးၵ)ၼႆႉ လွင်ႈသင်သေဢမ်ႇဝႃႈ တိုၼ်းမီးငဝ်ႈႁၢၵ်ႈမၼ်း ၵူႈဢၼ် ၵူႈမဵဝ်း။ တေႇၸဵမ် တူဝ်မီးၸႂ်၊ ဢမ်ႇမီးၸႂ်၊ ဢိၵ်ႇပႃးတင်းသၽေႃးတြႃးပၢႆးႁၼ် ၵူႈ ဢၼ်ဢၼ်ၸိူဝ်းၼၼ်ႉ ယွၼ်ႉမီးငဝ်ႈႁၢၵ်ႈလႄႈ ၸင်ႇမီးတူၼ်ႈလမ်း၊ ယွၼ်ႉမီးတူၼ်ႈ လမ်းလႄႈ ၸင်ႇမီးၵိင်ႇ မီးၶႃႈ မီးၽိူဝ်မႃး။ မိူၼ်ၼင်ႇ လႆႈႁၼ်တူၼ်ႈမႆႉ ၽုတ်းတမ်း ယူႇ ၼိူဝ်ပိုၼ်ႉလိၼ်မိူင်းလူင်ၼႆႉ ယွၼ်ႉပိူဝ်ႈ မီးငဝ်ႈႁၢၵ်ႈမၼ်း မၼ်ႈၵိုမ်းဝႆႉၼႂ်းလိၼ် ႁႃတၢင်းၵိၼ် ထၢတ်ႈၼမ်ႉ ထၢတ်ႈၽုၼ်ႇ ၶိုၼ်းလဵင်ႉပၼ်လႄႈ တူၼ်ႈလမ်းမၼ်း၊ ၵိင်ႇမၼ်း၊ ၽိူဝ်မၼ်း၊ မွၵ်ႇမၢၵ်ႇမၼ်း ၸင်ႇမူႈၼုမ်ႇလီသေ ႁၢင်ႈၶိူင်ႈပၼ် ပိူၼ်ႉတီႈ မၼ်းယဝ်ႉ။ တႃႇမႆႉၼိုင်ႈတူၼ်ႈၼၼ်ႉ ၸၢမ်းဝႃႈ ငဝ်ႈႁၢၵ်ႈမၼ်း ဢမ်ႇမၼ်ႈၵိုမ်းၸိုင် တူၼ်ႈ လမ်း ၵိင်ႇ ၽိူဝ် မွၵ်ႇ မၢၵ်ႇမၼ်းၵေႃႈ တိုၼ်းဝွတ်ႈသေ ပဵၼ်မႆႉတၢႆၸၼ်းလူင် ၵွႃႇၵမ်းလဵဝ်ယဝ်ႉ။ မိူၼ်ၼၼ်ၼင်ႇၵဝ်ႇ ဢၼ်ပဵၼ်သၽေႃးတြႃး၊ ဢမ်ႇၼၼ်ၵေႃႈ ပၢႆးႁၼ်လူင် မိူၼ် ၼင်ႇ ပၢႆးဝူၼ်ႉၼိုင်ႈဢၼ်ဢၼ်၊ သႃႇသၼႃႇ ၼိုင်ႈဢၼ်ဢၼ်ၼႆၵေႃႈ တေႃႈလူဝ်ႇႁႂ်ႈ ငဝ်ႈႁၢၵ်ႈမၼ်း မၼ်ႈၵိုမ်းၵွၼ်ႇ ဢၼ်ပဵၼ် တူၼ်ႈလမ်း ၵိင်ႇ ၽိူဝ် မွၵ်ႇ မၢၵ်ႈမၼ်း ၸင်ႇမူႈမႂ်ႇ ယႂ်ႇႁုၼ်ႈမုၼ်းလီယဝ်ႉ။",
  images: [
    {
      url: "https://sattt.sgp1.cdn.digitaloceanspaces.com/sattt-mm.jpeg",
      width: 800,
      height: 600,
      alt: "sattt image",
    },
    {
      url: "https://sattt.sgp1.cdn.digitaloceanspaces.com/sattt-mm.jpeg",
      width: 1800,
      height: 1600,
      alt: "SATTT image",
    },
  ],
  locale: "en_US",
  type: "website",
},
icons: {
  icon: "/img/sattt-logo.svg",
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
      <body className="flex min-h-full antialiased bg-white dark:bg-zinc-900">
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
