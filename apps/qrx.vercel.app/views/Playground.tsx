'use client'

import QRX from '@qr-x/react'
import ColorPicker from 'components/ColorPicker'
import Editor from 'components/Editor'
import Form from 'components/Form'
import Motion from 'components/Motion'
import ShapePicker from 'components/ShapePicker'
import { shapes } from 'constant'
import { elementToSVG, inlineResources } from 'dom-to-svg'
import useParseColor from 'hooks/useParseColor'
import { toBlob } from 'html-to-image'
import { Fragment, RefObject, useRef, useState } from 'react'
import QRWrapper from 'views/QRWrapper'
import * as Yup from 'yup'

type ColorType = 'solid' | 'gradient'

type GradientType = 'linear' | 'radial'

type Values = {
  data: string
  color: string
  bodyShape: string
  eyeBallShape: string
  eyeFrameShape: string
  backgroundURL?: string
}

const schema = Yup.object({
  data: Yup.string().required(),
  backgroundURL: Yup.string(),
  bodyShape: Yup.string().required(),
  eyeBallShape: Yup.string().required(),
  eyeFrameShape: Yup.string().required(),
  colorType: Yup.mixed<ColorType>().oneOf(['solid', 'gradient']).required(),
  color: Yup.string().required(),
  gradientType: Yup.mixed<GradientType>().oneOf(['linear', 'radial']).required(),
  gradientColors: Yup.array().of(Yup.string().required()).required(),
})

function QRDisplay({ data, color, bodyShape, eyeBallShape, eyeFrameShape, backgroundURL }: Values) {
  const qrRef = useRef<HTMLDivElement>(null)
  const $color = useParseColor(color)
  console.log('$color', $color)
  return (
    <div className='max-w-md w-full md:pl-0 lg:mr-[1rem] md:mb-0 mb-3'>
      <Motion>
        <div ref={qrRef}>
          <QRWrapper color={$color?.gradient?.colors[0]?.value || $color?.color || '#000000'}>
            <QRX
              {...$color}
              data={data}
              shapes={{ body: bodyShape as never, eyeball: eyeBallShape as never, eyeframe: eyeFrameShape as never }}
              fillImage={backgroundURL}
            />
          </QRWrapper>
        </div>
      </Motion>
      <DownloadButton qrRef={qrRef} />
    </div>
  )
}

export default function Playground() {
  return (
    <Form<Values>
      schema={schema}
      defaults={{
        data: 'https://qrx.vercel.app/',
        color: '#000000',
        backgroundURL: '',
        bodyShape: 'square',
        eyeBallShape: 'square',
        eyeFrameShape: 'square',
      }}
      onSubmit={() => {}}
    >
      {({ values, register, setValue }) => (
        <Fragment>
          <div className='flex-col w-full gap-x-5 justify-between flex lg:flex-row'>
            <div className='flex-1  max-w-xl space-y-8 my-8'>
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
                  Background Image URL
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
                <ColorPicker value={values.color} setValue={value => setValue('color', value)} />
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
            </div>
            <QRDisplay {...values} />
          </div>
          <Editor values={values} />
        </Fragment>
      )}
    </Form>
  )
}

const downloadActions = [
  {
    type: 'svg',
    label: 'Download SVG',
  },
  {
    type: 'png',
    label: 'Download PNG',
  },
  {
    type: 'copy-png',
    label: 'Copy PNG',
  },
  {
    type: 'copy-svg',
    label: 'Copy SVG',
  },
] as const

async function downloadQR(qrRef: RefObject<HTMLDivElement>, type: (typeof downloadActions)[number]['type']) {
  const svgDocument = elementToSVG(qrRef.current)
  await inlineResources(svgDocument.documentElement)
  const svgString = new XMLSerializer().serializeToString(qrRef.current!.firstChild!)

  if (type === 'copy-svg') {
    return navigator.clipboard.writeText(svgString)
  }

  if (type === 'svg') {
    const url = URL.createObjectURL(new Blob([svgString], { type: 'image/svg+xml' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'QR Code.svg'
    a.click()
    return
  }

  toBlob(qrRef.current!).then(blob => {
    if (type === 'copy-png') {
      return navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob!,
        }),
      ])
    }
    if (type === 'png') {
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob!)
      a.download = 'QR Code.png'
      a.click()
    }
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
      <div className='relative md:mb-0 mb-8'>
        {showDropdown && (
          <>
            <div className='[--animate-duration:150ms] animate-in absolute -bottom-40 text-white flex flex-col bg-gray-500 rounded-xl p-2 w-full right-0'>
              {downloadActions.map(({ label, type }) => (
                <button
                  key={type}
                  onClick={() => {
                    setShowDropdown(false)
                    downloadQR(qrRef, type)
                  }}
                  className='hover:bg-primary/40 rounded-lg py-2 text-sm'
                >
                  {label}
                </button>
              ))}
            </div>
          </>
        )}
        <button
          className='w-full bg-primary text-black rounded-xl py-3 font-semibold mt-4 mb-10 lg:mb-0'
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
