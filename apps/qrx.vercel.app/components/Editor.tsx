'use client'
import { toHtml } from 'hast-util-to-html'
import { CheckMarkIcon, CopyIcon } from 'icons/Utils'
import { useState } from 'react'
import { refractor } from 'refractor'
import langJavascript from 'refractor/lang/javascript'

type Props = {
  values: any
  comment?: string
}

refractor.alias({ javascript: ['js'] })

refractor.register(langJavascript)

const frameworks = ['react', 'vue', 'solid', 'svelte', 'vanilla']

type Framework = (typeof frameworks)[number]

const codes: Record<Framework, (vals: any) => string> = {
  react: ({ data, color, bodyShape, eyeBallShape, eyeFrameShape }: any) => `import QRX from '@qr-x/react';

<QRX 
  data='${data}' 
  color='${color}'
  shapes={{ body:'${bodyShape}', eyeball:'${eyeBallShape}', eyeframe:'${eyeFrameShape}' }} 
/>`,
  vue: ({ data, color, bodyShape, eyeBallShape, eyeFrameShape }: any) => `<script>
import QRX from '@qr-x/vue';
</script>
<template>
  <QRX 
    data='${data}' 
    color='${color}'
    :shapes='{ body:"${bodyShape}", eyeball:"${eyeBallShape}", eyeframe:"${eyeFrameShape}" }' 
  />
</template>`,
  solid: ({ data, color, bodyShape, eyeBallShape, eyeFrameShape }: any) => `import QRX from '@qr-x/solid';

<QRX 
  data='${data}' 
  color='${color}'
  shapes={{ body:'${bodyShape}', eyeball:'${eyeBallShape}', eyeframe:'${eyeFrameShape}' }}
/>`,
  svelte: ({ data, color, bodyShape, eyeBallShape, eyeFrameShape }: any) => `<script>
import QRX from '@qr-x/svelte';
</script>
<QRX 
  data='${data}' 
  color='${color}'
  shapes={{ body:'${bodyShape}', eyeball:'${eyeBallShape}', eyeframe:'${eyeFrameShape}' }}
/>`,
  vanilla: ({ data, color, bodyShape, eyeBallShape, eyeFrameShape }: any) => `
  <body>
    <div id="qr-container"></div>
  </body>
  <script src="https://cdn.skypack.dev/@qr-x/vanilla"></script>
  <script>
    const qrx = createQRX({
      data: '${data}',
      color: '${color}',
      shapes: { body: '${bodyShape}', eyeball: '${eyeBallShape}', eyeframe: '${eyeFrameShape}' },
    })
    const qrContainer = document.getElementById('qr-container')
    qrContainer.innerHTML = qrx
  </script>
  `,
}

export default function Editor({ values }: Props) {
  const [framework, setFramework] = useState<Framework>('react')
  const code = codes[framework]?.(values) ?? 'Not added yet!'
  const comment = ''

  return (
    <div className='rounded-xl bg-primary p-[1px]'>
      <div className='rounded-xl overflow-hidden space-y-[1px]'>
        <div className='h-14 flex justify-between bg-black text-white p-2'>
          <fieldset
            onChange={e => {
              const selected = (e.target as HTMLInputElement).id
              setFramework(selected as Framework)
            }}
            className='flex p-0.5'
          >
            {frameworks.map(framework => (
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
          <CopyButton code={code} />
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
