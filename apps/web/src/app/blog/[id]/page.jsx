import { Layout } from "@/components/Layout"
import Link from "next/link"
import {  formatDate, web_url } from "@/lib/utils"
import Image from "next/image"
import { ArrowLeftCircleIcon } from "@heroicons/react/20/solid"


import dynamic from 'next/dynamic';

const NextShareComponent = dynamic(() => import('@/components/ShareComponent'), { ssr: false });

import PostContent from "@/components/ui/post-content"
import { Footer } from "@/components/Footer"
  
async function getData(id) {
    const res = await fetch(`https://dummyjson.com/products/${id}`, { cache: 'force-cache' })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }
  

export async function generateMetadata({ params }) {
  const { data } = await getData(params.id)
  const _data = {
    id: data?.id,
    ...data}
  return {
    title: _data?.title,
    description: _data?.description,
    url: `${web_url}/blog/${_data?.id}`,
    openGraph: {
        title: _data?.title,
        description: _data?.description,
        type: "article",
        url: `${web_url}/blog/${_data?.id}`,
        images: [
          {
            url: _data?.thumbnail,
            width: 1200,
            height: 630,
            alt: _data.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: _data?.title,
        description: _data?.description,
        images: [_data?.thumbnail],
      },
    }
}

export default async function Post({ params }) {
  const postData = await getData(params.id) || {}

  const data= {
    id: postData?.id,
    ...postData
  }



  return (
  <Layout>

<article className="container relative max-w-3xl px-5 py-8 mx-auto md:px-0 ">
      <Link
        href="/blog"
        className={"absolute left-[-200px] gap-x-1 top-14 hidden xl:inline-flex"}
      >

       <ArrowLeftCircleIcon width={20} />
       
        See all posts
      </Link>
      <div>
        {data.date && (
          <time
            dateTime={data?.date}
            className="block text-sm text-muted-foreground"
          >
            Published on {formatDate(data?.date)}
          </time>
        )}
        <h1 style={{
          lineHeight: '4.2rem'
        }} className="inline-block py-5 mt-2 text-4xl lg:text-5xl">
          {data?.title}
        </h1>
        <NextShareComponent url={web_url+'/blog/'+ data?.id} title={data?.title} desc={data?.description?.substring(0,100)} />


        {data?.author?.length ? (
          <div className="flex mt-4 space-x-4">
            {data?.authors.map((author) =>
              author ? (
                <Link
                  key={author._id}
                  href={`https://twitter.com/${author.twitter}`}
                  className="flex items-center space-x-2 text-sm"
                >
                  <Image
                    src={author.avatar}
                    alt={author.title}
                    width={42}
                    height={42}
                    className="bg-white rounded-full"
                  />
                  <div className="flex-1 leading-tight text-left">
                    <p className="font-medium">{author.title}</p>
                    <p className="text-[12px] text-muted-foreground">
                      @{author.twitter}
                    </p>
                  </div>
                </Link>
              ) : null
            )}
          </div>
        ) : null}
      </div>
      {data.thumbnail && (
        <Image
          src={data?.thumbnail}
          alt={data?.title}
          width={780}
          height={405}
          className="my-8 transition-colors border rounded-md bg-muted"
          priority
        />
      )}

      <PostContent content={data?.description} />

      <hr className="mt-12" />
      <div className="flex justify-center py-6 lg:py-10">
        <Link href="/blog" className="flex flex-row gap-x-1" >

         <ArrowLeftCircleIcon width={20} />
          See all posts
        </Link>
      </div>
    </article>

<Footer />
  </Layout>
  )
}

