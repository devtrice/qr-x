import nextMDX from '@next/mdx'

import { recmaPlugins } from './src/mdx/recma.mjs'
import { rehypePlugins } from './src/mdx/rehype.mjs'
import { remarkPlugins } from './src/mdx/remark.mjs'
import withSearch from './src/mdx/search.mjs'

const withMDX = nextMDX({
  options: {
    remarkPlugins,
    rehypePlugins,
    recmaPlugins,
  },
})

const redirects = async () => {
  return [
    {
      source: '/docs/commands/author-list',
      destination: '/docs/api/author-list',
      permanent: true,
    },
  ]
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  redirects,
  images: {
    domains: ['images.unsplash.com','cdn.dummyjson.com', 'res.cloudinary.com', 'sattt.sgp1.cdn.digitaloceanspaces.com']
}
}

export default withSearch(withMDX(nextConfig))
