'use client'

import QRX from '@qr-x/react'
import ColorInput from 'components/ColorInput'
import Editor from 'components/Editor'
import Form from 'components/Form'
import Motion from 'components/Motion'
import ShapePicker from 'components/ShapePicker'
import { shapes } from 'constant'
import { elementToSVG, inlineResources } from 'dom-to-svg'
import { Fragment, useRef } from 'react'
import * as Yup from 'yup'

const schema = Yup.object({
  data: Yup.string().required(),
  backgroundURL: Yup.string(),
  bodyShape: Yup.string().required(),
  eyeBallShape: Yup.string().required(),
  eyeFrameShape: Yup.string().required(),
  color: Yup.string().required(),
})

export default function Playground() {
  const qrRef = useRef<HTMLDivElement>(null)

  return (
    <Form
      schema={schema}
      defaults={{
        data: 'https://qrx.vercel.app/',
        backgroundURL: '',
        bodyShape: 'square',
        eyeBallShape: 'square',
        eyeFrameShape: 'square',
        color: '#000000',
      }}
      onSubmit={() => {}}
    >
      {({ values, register, setValue }) => (
        <Fragment>
          <div className='flex-col space-x-5 justify-between flex md:flex-row'>
            <Motion className='flex-1 max-w-xl space-y-8 my-8'>
              <fieldset>
                <label className='text-base font-medium mb-4 block text-white' htmlFor='data'>
                  QR Data
                </label>
                <textarea
                  id='data'
                  className='text-white border border-primary/50 focus-visible:border-primary focus-visible:bg-primary/20 bg-primary/10  rounded-xl w-full min-h-20 resize-none py-3 px-4'
                  {...register('data')}
                ></textarea>
              </fieldset>
              <fieldset>
                <label className='text-base font-medium mb-4 block text-white' htmlFor='backgroundURL'>
                  Background Image/Video URL
                </label>
                <input
                  id='backgroundURL'
                  name='backgroundURL'
                  type='url'
                  className='text-white border border-primary/50 focus-visible:border-primary focus-visible:bg-primary/20 bg-primary/10  rounded-xl w-full py-3 px-4'
                  onChange={e => setValue('backgroundURL', e.target.value)}
                ></input>
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
                    fillImage={values.backgroundURL}
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
