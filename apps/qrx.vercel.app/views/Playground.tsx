'use client'

import QRX from '@qr-x/react'
import ColorInput from 'components/ColorInput'
import Editor from 'components/Editor'
import Form from 'components/Form'
import Motion from 'components/Motion'
import ShapePicker from 'components/ShapePicker'
import { shapes } from 'constant'
import { elementToSVG, inlineResources } from 'dom-to-svg'
import { SVGToImage } from 'lib/utils'
import { Fragment, RefObject, useRef, useState } from 'react'
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
            <div>
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
                  <div
                    style={{
                      backgroundColor: values.color,
                    }}
                    className='relative rounded-3xl flex flex-center w-full py-2'
                  >
                    {/* This is a workaround to be able to get correct styling for border raduis in svg conversion */}
                    <div
                      style={{
                        backgroundColor: values.color,
                      }}
                      className='absolute top-0 left-0 right-0 h-3'
                    ></div>
                    <p className='relative text-xs text-white'>Powered by QRX</p>
                  </div>
                </div>
              </Motion>
              <DownloadButton qrRef={qrRef} />
            </div>
          </div>
          <Editor values={values} />
        </Fragment>
      )}
    </Form>
  )
}

async function downloadQR(qrRef: RefObject<HTMLDivElement>, type: 'svg' | 'png') {
  const svgDocument = elementToSVG(qrRef.current)
  await inlineResources(svgDocument.documentElement)
  const svgString = new XMLSerializer().serializeToString(svgDocument)

  if (type === 'svg') {
    const url = URL.createObjectURL(new Blob([svgString], { type: 'image/svg+xml' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'QR Code.svg'
    a.click()
    return
  }

  SVGToImage({
    svg: svgString,
    mimetype: 'image/png',
    width: 1200,
    height: 1232, // For the little banner at the bottom
    quality: 1,
    outputFormat: 'blob',
  })
    .then(function (blob: any) {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'QR Code.png'
      a.click()
    })
    .catch(function (err) {
      console.error(err)
    })
}

// Simple dropdown implementation [Not fully accessible]. I just don't want to install dropdown component just for this
function DownloadButton({ qrRef }: { qrRef: RefObject<HTMLDivElement> }) {
  const [showDropdown, setShowDropdown] = useState(false)
  return (
    <>
      {showDropdown && (
        <div
          aria-label='dismiss'
          onClick={() => {
            setShowDropdown(false)
          }}
          className='fixed w-screen inset-0 bg-black/20'
        ></div>
      )}
      <div className='relative'>
        {showDropdown && (
          <>
            <div className='[--animate-duration:150ms] animate-in absolute -bottom-24 text-white flex flex-col bg-zinc-700 rounded-xl p-2 w-1/3 right-0'>
              {(['svg', 'png'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => {
                    setShowDropdown(false)
                    downloadQR(qrRef, type)
                  }}
                  className='hover:bg-primary/40 rounded-lg py-2'
                >
                  .{type}
                </button>
              ))}
            </div>
          </>
        )}
        <button
          className='w-full bg-primary text-black rounded-xl py-3 font-semibold mt-4'
          onClick={() => {
            setShowDropdown(!showDropdown)
          }}
        >
          Download QR
        </button>
      </div>
    </>
  )
}
