'use client'

import { codes, portals } from 'constant'
import { toHtml } from 'hast-util-to-html'
import useParseColor from 'hooks/useParseColor'
import { CheckMarkIcon, CopyIcon } from 'icons/Utils'
import { useState } from 'react'
import { refractor } from 'refractor'
import langJavascript from 'refractor/lang/javascript'
import langJsx from 'refractor/lang/jsx'
import Tab from './Tab'
import { FormValues } from 'views/Playground'

refractor.alias({ javascript: ['js'] })

refractor.register(langJsx)
refractor.register(langJavascript)

export default function Editor({ color, ...rest }: FormValues) {
  const [portal, setPortal] = useState('react')

  const code = codes[portal as keyof typeof codes]({ ...rest, color: useParseColor(color) })
    .replaceAll("':", ':')
    .replaceAll("  '", '')

  return (
    <div className='rounded-xl bg-primary p-[1px]'>
      <div className='rounded-xl overflow-hidden space-y-[1px] relative'>
        <div className='h-14 flex overflow-x-auto justify-between bg-black text-white p-2'>
          <Tab options={portals as unknown as string[]} onChange={setPortal} />
          <CopyButton code={code} />
        </div>
        <pre
          className='font-medium font-mono p-5 not-prose overflow-auto bg-black text-sky-600'
          dangerouslySetInnerHTML={{
            __html: toHtml(refractor.highlight(code, 'js') as never),
          }}
        />
      </div>
    </div>
  )
}

function CopyButton({ code }: { code: string }) {
  const [showCopied, setShowCopied] = useState(false)
  return (
    <button
      title='Copy code'
      onClick={() => {
        setShowCopied(true)
        navigator.clipboard.writeText(code)
        setTimeout(() => setShowCopied(false), 2000)
      }}
      className={`rounded-xl flex flex-center border border-transparent hover:bg-primary/30 hover:border-primary p-2 focus-visible:border-primary ${showCopied ? 'bg-primary/30' : ''}`}
    >
      <span className='sr-only'>Copy code</span>
      {showCopied ? <CheckMarkIcon className='size-6 animate-in' /> : <CopyIcon className='size-6' />}
    </button>
  )
}
