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

type ColorType = 'solid' | 'gradient'

type GradientType = 'linear' | 'radial'

type Values = {
  data: string
  backgroundURL?: string
  bodyShape: string
  eyeBallShape: string
  eyeFrameShape: string
  colorType: ColorType
  color: string
  gradientType: GradientType
  gradientColors: string[]
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

export default function Playground() {
  const qrRef = useRef<HTMLDivElement>(null)

  return (
    <Form<Values>
      schema={schema}
      defaults={{
        data: 'https://qrx.vercel.app/',
        backgroundURL: '',
        bodyShape: 'square',
        eyeBallShape: 'square',
        eyeFrameShape: 'square',
        colorType: 'solid',
        color: '#000000',
        gradientType: 'linear',
        gradientColors: ['', ''],
      }}
      onSubmit={() => {}}
    >
      {({ values, register, setValue }) => (
        <Fragment>
          <div className='flex-col w-full gap-x-5 justify-between flex lg:flex-row'>
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
                <label className='text-base font-medium mb-4 block text-white' htmlFor='gradientType'>
                  Color Type
                </label>
                <select
                  id='colorType'
                  name='colorType'
                  value={values.colorType}
                  className='text-white border border-primary/50 focus-visible:border-primary focus-visible:bg-primary/20 bg-primary/10 rounded-xl w-full py-3 px-4'
                  onChange={e => setValue('colorType', e.target.value as ColorType)}
                >
                  <option value='solid'>Solid</option>
                  <option value='gradient'>Gradient</option>
                </select>
              </fieldset>
              {values.colorType === 'solid' && (
                <fieldset>
                  <label className='text-base font-medium mb-4 block text-white' htmlFor='color'>
                    Color
                  </label>
                  <ColorInput value={values.color} onChange={e => setValue('color', e.target.value)} />
                </fieldset>
              )}
              {values.colorType === 'gradient' && (
                <Fragment>
                  <fieldset>
                    <label className='text-base font-medium mb-4 block text-white' htmlFor='gradientType'>
                      Type
                    </label>
                    <select
                      id='gradientType'
                      name='gradientType'
                      className='text-white border border-primary/50 focus-visible:border-primary focus-visible:bg-primary/20 bg-primary/10 rounded-xl w-full py-3 px-4'
                      value={values.gradientType}
                      onChange={e => setValue('gradientType', e.target.value as GradientType)}
                    >
                      <option value='linear'>Linear</option>
                      <option value='radial'>Radial</option>
                    </select>
                  </fieldset>
                  <fieldset>
                    <label className='text-base font-medium mb-4 block text-white' htmlFor='gradientColors'>
                      Color
                    </label>
                    <div className='grid gap-8'>
                      {values.gradientColors.map((gradientColor, index) => (
                        <ColorInput
                          value={gradientColor}
                          onChange={e => {
                            const colors = [...values.gradientColors]
                            colors[index] = e.target.value
                            setValue('gradientColors', colors)
                          }}
                        />
                      ))}
                    </div>
                  </fieldset>
                </Fragment>
              )}
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
              <Motion className='md:pl-0 lg:mr-[1rem] md:mb-0 mb-3'>
                <div
                  ref={qrRef}
                  className='max-w-[30rem] flex flex-col justify-between items-center bg-white rounded-3xl overflow-hidden'
                >
                  <div className='p-8 w-full'>
                    <QRX
                      data={values.data}
                      color={values.color}
                      fillImage={values.backgroundURL}
                      gradient={
                        values.colorType === 'gradient'
                          ? {
                              type: values.gradientType,
                              colors: values.gradientColors,
                            }
                          : undefined
                      }
                      shapes={{
                        body: values.bodyShape as never,
                        eyeball: values.eyeBallShape as never,
                        eyeframe: values.eyeFrameShape as never,
                      }}
                      className='md:w-96 w-full'
                    />
                  </div>
                  <div
                    style={{
                      background:
                        values.colorType === 'gradient'
                          ? `linear-gradient(-90deg, ${values.gradientColors[0]}, ${values.gradientColors[1]})`
                          : values.color,
                    }}
                    className='relative rounded-3xl flex flex-center w-full py-2'
                  >
                    {/* This is a workaround to be able to get correct styling for border raduis in svg conversion */}
                    <div
                      style={{
                        background:
                          values.colorType === 'gradient'
                            ? `${values.gradientType}-gradient(270deg, ${values.gradientColors[0]}, ${values.gradientColors[1]})`
                            : values.color,
                      }}
                      className='absolute top-0 left-0 right-0 h-3'
                    ></div>
                    <p className='relative text-xs text-white'>Powered by QR-X</p>
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
  const svgString = new XMLSerializer().serializeToString(svgDocument)

  if (type === 'copy-svg') {
    navigator.clipboard.writeText(svgString)
    return
  }

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
    height: 1285.7, // (+85.7) For the powered by banner at the bottom
    quality: 1,
    outputFormat: 'blob',
  })
    .then(function (blob: any) {
      if (type === 'copy-png') {
        navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob,
          }),
        ])
        return
      }
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
