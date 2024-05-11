import Link from 'next/link'

import { GithubIcon } from '@/components/icons/GithubIcon'

export default function GithubStars(props) {
  return (
    <Link
      target="_blank"
      href="https://github.com/devtrice/qr-x"
      className="0 -mt-2 flex rounded fill-zinc-400 p-2 text-sm leading-5 transition hover:bg-black/10 hover:text-zinc-900 dark:text-zinc-400 dark:hover:fill-zinc-600 dark:hover:text-zinc-600"
    >
      <GithubIcon className="h-5 w-5" />
    </Link>
  )
}
