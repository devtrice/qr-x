'use client'
import Link from "next/link"
import { HoverEffect } from "./ui/card-hover-effect";

function UpcomingWebinars() {

  const featuredWebinars = [
    {
      title: 'ငဝ်ႈငႃႇ မၢႆမီႈဢုပ်ႉပိူင်ႇၽွင်းငမ်း',
      description:
        'သိုပ်ႇလူလွင်ႈ မၢႆမီႈလႄႈ လွင်ႈဢုပ်ႉပိူင်ႇငဝ်ႈငုၼ်း',
      slug: '',
      isFeatured: true,
    },
    {
      title: 'လုမ်းသင်ႇၶ',
      description:
        'လူတူၺ်းလွင်ႈ လုမ်းQR X - Devtrice ',
      slug: '/docs/ecss',
      isFeatured: true,
    },
    {
      title: 'ၸုမ်းၽိင်ႈငႄႈ',
      description:
        'ၸုမ်းၽိင်ႈငႄႈ ပုတ်ႉထၽႃႇသႃႇ',
      slug: '/docs/lang-culture',
      isFeatured: true,
    },
    {
      title: 'ၸုမ်းၽၢႆႇပၢႆးပၺ်ႇၺႃႇ',
      description:
        'သိုပ်ႇလူႇႁဵၼ်းႁူႉလွင်ႈ ပၢႆးပၺ်ႇၺႃႇ ငဝ်ႈငုၼ်းလူင်မုၵ်ႉၸုမ်းသင်ႇၶၸိုင်ႈတႆး',
      slug: '/docs/education',
      isFeatured: true,
    },
    // Added two more webinars
    {
      title: 'ႁူင်းႁဵၼ်းထမ်ႇမၸိုင်ႈတႆး',
      description:
        'ႁူင်းႁဵၼ်းထမ်ႇမ ႁဵတ်းႁိုဝ်ပဵၼ်မႃး',
      slug: '/docs/dhamma-school',
      isFeatured: true,
    },
    {
      title: 'ၶႅပ်းႁၢင်ႈမၢႆတွင်း',
      description:
        'တူၺ်း ၶႅပ်းႁၢင်ႈမၢႆတွင်း ငဝ်ႈငုၼ်းလူင်မုၵ်ႉၸုမ်းသင်ႇၶၸိုင်ႈတႆး',
      slug: '/gallery',
      isFeatured: true,
    },
  ];

  return (
    <div className="p-12 bg-slate-100 dark:bg-black">
      <div className="px-4 mx-auto max-w-7xl sm:px-6">
        <div className="text-center">
          <h2 className="text-base font-semibold tracking-wide uppercase text-slate-600">လမ်းၼႂ်း</h2>
          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-primary sm:text-4xl">Explore further insights into SATTT.</p>
        </div>

        <div className="mt-10">
          <HoverEffect
          items={featuredWebinars.map(webinar => (
            {
              title: webinar.title,
              description: webinar.description,
              link: webinar.slug
            }
          ))}
          />
        </div>

        {/* <div className="mt-10 text-center">
          <Link href={"/"}
          className="px-4 py-2 transition duration-200 bg-white border rounded-3xl border-neutral-600 text-neutral-700 hover:bg-gray-100"
          >
            View All webinars
          </Link>
        </div> */}
      </div>
    </div>
  )
}

export default UpcomingWebinars