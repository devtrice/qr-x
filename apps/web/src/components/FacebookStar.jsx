import Link from 'next/link';

import { FacebookIcon } from './icons/FaceBook';

export default function FacebookStar(prop) {
  return (
    <Link href="https://www.facebook.com/sattt.org" className='flex p-2 -mt-2 text-sm leading-5 transition rounded fill-zinc-400 0 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-600 dark:hover:fill-zinc-600 hover:bg-black/10'>
     
      <FacebookIcon className="w-2 h-2" />
    
    </Link>
  )
}