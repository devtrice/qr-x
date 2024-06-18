'use client'

import { codes, editorFrameworks } from 'constant'
import { toHtml } from 'hast-util-to-html'
import { useState } from 'react'
import { refractor } from 'refractor'
import langJavascript from 'refractor/lang/javascript'

type Props = {
  values: any
  comment?: string
}

refractor.alias({ javascript: ['js'] })

refractor.register(langJavascript)

export default function Editor({ values }: Props) {
  const [framework, setFramework] = useState<Framework>('react')
  const code = codes[framework]?.(values) ?? 'Not added yet!'
  const comment = ''

  return (
    <div className='rounded-2xl bg-primary p-[1px]'>
      <div className='rounded-2xl overflow-hidden space-y-[1px]'>
        <div className='h-14 flex justify-between bg-black text-white p-3'>
          <fieldset
            onChange={e => {
              const selected = (e.target as HTMLInputElement).id
              setFramework(selected as Framework)
            }}
            className='flex'
          >
            {editorFrameworks.map(framework => (
              <label key={framework} className='capitalize rounded-lg px-3 flex items-center has-[input:checked]:bg-primary'>
                {framework}
                <input
                  type='radio'
                  name='framework'
                  id={framework}
                  className='opacity-0 appearance-none'
                  defaultChecked={framework === 'react'}
                />
              </label>
            ))}
          </fieldset>
        </div>
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
