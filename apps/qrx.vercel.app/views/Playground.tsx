'use client'

import Form from 'components/Form'
import Motion from 'components/Motion'
import { Circle, Diamond, Heart, Leaf, Rounded, Square, Triangle } from 'icons/Shapes'
import { Fragment, ReactNode, useRef } from 'react'
import * as Yup from 'yup'
import QRX from '@qr-x/react'
import Editor from 'components/Editor'
import ColorInput from 'components/ColorInput'
import { documentToSVG, elementToSVG, inlineResources, formatXML } from 'dom-to-svg'

const schema = Yup.object({
  data: Yup.string().required(),
  bodyShape: Yup.string().required(),
  eyeBallShape: Yup.string().required(),
  eyeFrameShape: Yup.string().required(),
  color: Yup.string().required(),
})

const shapes = {
  leaf: { name: 'leaf', icon: <Leaf /> },
  square: { name: 'square', icon: <Square /> },
  circle: { name: 'circle', icon: <Circle /> },
  heart: { name: 'heart', icon: <Heart /> },
  diamond: { name: 'diamond', icon: <Diamond /> },
  triangle: { name: 'triangle', icon: <Triangle /> },
  rounded: { name: 'rounded', icon: <Rounded /> },
}

function ShapePicker({
  shape,
  shapes,
  setShape,
}: {
  shape: string
  shapes: { name: string; icon: ReactNode }[]
  setShape: (shape: string) => void
}) {
  const id = Math.random().toString(36).substring(7)
  return (
    <fieldset
      onChange={e => {
        setShape((e.target as HTMLInputElement).id)
      }}
    >
      <ul className='flex space-x-4'>
        {shapes.map(({ name, icon }) => (
          <li key={name}>
            <label
              className={`focus-within:ring-2 focus-within:ring-primary/80 size-[4.75rem] cursor-pointer duration-150 transition-colors flex flex-center rounded-2xl ${shape === name ? 'bg-primary/20 border border-primary shadow shadow-primary-pink/30' : 'bg-black/60'}`}
            >
              <input type='radio' name={'shape' + id} id={name} className='sr-only' />
              {icon}
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  )
}

export default function Playground() {
  const qrRef = useRef<HTMLDivElement>(null)

  return (
    <Form
      schema={schema}
      defaults={{
        data: 'https://qrx.vercel.app/',
        bodyShape: 'square',
        eyeBallShape: 'square',
        eyeFrameShape: 'square',
        color: '#000000',
      }}
      onSubmit={() => {}}
    >
      {({ values, register, setValue }) => (
        <Fragment>
          <div className='flex space-x-5 justify-between'>
            <Motion className='flex-1 max-w-xl space-y-8 my-8'>
              <fieldset>
                <label className='text-base font-medium mb-4 block text-white' htmlFor='data'>
                  Text / URL
                </label>
                <textarea
                  id='data'
                  className='text-white border border-primary/50 focus-visible:border-primary focus-visible:bg-primary/20 bg-primary/10  rounded-xl w-full min-h-20 resize-none py-3 px-4'
                  {...register('data')}
                ></textarea>
              </fieldset>
              <fieldset>
                <label className='text-base font-medium mb-4 block text-white' htmlFor='color'>
                  Color
                </label>
                <ColorInput values={values} setValue={setValue} />
              </fieldset>
              <fieldset>
                <label className='text-base font-medium mb-4 block text-white' htmlFor='color'>
                  Body
                </label>
                <ShapePicker
                  shape={values.bodyShape}
                  shapes={[shapes.square, shapes.circle, shapes.leaf, shapes.heart, shapes.diamond, shapes.triangle]}
                  setShape={shape => setValue('bodyShape', shape)}
                />
              </fieldset>
              <fieldset>
                <label className='text-base font-medium mb-4 block text-white' htmlFor='color'>
                  Eyeframe
                </label>
                <ShapePicker
                  shape={values.eyeFrameShape}
                  shapes={[shapes.square, shapes.circle, shapes.leaf, shapes.rounded]}
                  setShape={shape => setValue('eyeFrameShape', shape)}
                />
              </fieldset>
              <fieldset>
                <label className='text-base font-medium mb-4 block text-white' htmlFor='color'>
                  Eyeball
                </label>
                <ShapePicker
                  shape={values.eyeBallShape}
                  shapes={[shapes.square, shapes.circle, shapes.leaf, shapes.rounded]}
                  setShape={shape => setValue('eyeBallShape', shape)}
                />
              </fieldset>
            </Motion>
            <Motion>
              <div ref={qrRef} className='max-w-[30rem] flex flex-col flex-center bg-white rounded-3xl overflow-hidden'>
                <div className='p-8'>
                  <QRX
                    data={values.data}
                    color={values.color}
                    shapes={{
                      body: values.bodyShape as never,
                      eyeball: values.eyeBallShape as never,
                      eyeframe: values.eyeFrameShape as never,
                    }}
                    className='w-96'
                  />
                </div>

                <p style={{ backgroundColor: values.color }} className='w-full text-xs text-white rounded-b-3xl text-center py-2'>
                  Powered by QRX ❤️ Devtrice
                </p>
              </div>
              <button
                onClick={async () => {
                  const svgDocument = elementToSVG(qrRef.current)
                  await inlineResources(svgDocument.documentElement)
                  const svgString = new XMLSerializer().serializeToString(svgDocument)
                  console.log({ svgString, svgDocument: svgDocument.documentElement })

                  // document.body.appendChild(svgDo/cument)

                  // save svg

                  // const blob = new Blob([svgString], { type: 'image/svg+xml' })
                  // const url = URL.createObjectURL(blob)
                  // const a = document.createElement('a')
                  // a.href = url
                  // a.download = 'qr.svg'
                  // a.click()

                  // domtoimage
                  //   .toPng(svgDocument.documentElement, {
                  //     quality: 1,
                  //   })
                  //   .then(dataUrl => {
                  //     const link = document.createElement('a')
                  //     link.download = 'qr.png'
                  //     link.href = dataUrl
                  //     link.click()
                  //   })
                }}
                className='w-full bg-primary text-black rounded-xl py-3 font-semibold mt-4'
              >
                Download QR
              </button>
            </Motion>
          </div>
          <Editor values={values} />
        </Fragment>
      )}
    </Form>
  )
}
