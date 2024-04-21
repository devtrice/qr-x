import Link from 'next/link';

import { GithubIcon } from '@/components/icons/GithubIcon';

export default function GithubStars(props) {
  return (
    <Link href="https://github.com/devtrice" className='flex p-2 -mt-2 text-sm leading-5 transition rounded fill-zinc-400 0 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-600 dark:hover:fill-zinc-600 hover:bg-black/10'>
      <GithubIcon className="w-5 h-5" />
    
    </Link>
  )
}