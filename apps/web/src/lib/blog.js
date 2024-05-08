import glob from 'fast-glob'

async function importPost(postFilename) {
  let { post } = await import(`../app/blog/${postFilename}`)

  return {
    slug: postFilename.replace(/(\/page)?\.mdx$/, ''),
    ...post,
  }
}

export async function getAllPosts() {
  let postFilenames = await glob('*/page.mdx', {
    cwd: './src/app/blog',
  })

  let posts = await Promise.all(postFilenames.map(importPost))

  return posts.filter(p => !p.draft).sort((a, z) => +new Date(z.date) - +new Date(a.date))
}
