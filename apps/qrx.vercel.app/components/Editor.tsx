'use client'
import { toHtml } from 'hast-util-to-html'
import { refractor } from 'refractor'
import langJavascript from 'refractor/lang/javascript'

type Props = {
  code: string
  comment?: string
}

refractor.alias({ javascript: ['js'] })

refractor.register(langJavascript)

export default function Editor({ code, comment }: Props) {
  return (
    <div className='rounded-2xl bg-primary p-[1px]'>
      <div className='rounded-2xl overflow-hidden space-y-[1px]'>
        <div className='h-14 flex justify-between bg-black '></div>
        <pre
          className='font-medium font-mono p-5 not-prose overflow-auto text-white bg-black'
          dangerouslySetInnerHTML={{
            __html: toHtml(refractor.highlight(`${code}${comment ? `\n\n/* ${comment} */` : ''}`, 'js') as never),
          }}
        />
      </div>
    </div>
  )
}
