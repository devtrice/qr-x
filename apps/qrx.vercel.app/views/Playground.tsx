'use client'

import QRX from '@qr-x/react'
import Editor from 'components/Editor'
import Form from 'components/Form'
import Motion from 'components/Motion'
import ColorPicker from 'components/Pickers/Color'
import ShapePicker from 'components/Pickers/Shape'
import Tab from 'components/Tab'
import { shapes } from 'constant'
import useParseColor from 'hooks/useParseColor'
import { toBlob } from 'html-to-image'
import { Fragment, RefObject, useRef, useState } from 'react'
import QRWrapper from 'views/QRWrapper'
import * as Yup from 'yup'

const schema = Yup.object({
  data: Yup.string().required(),
  color: Yup.string(),
  image: Yup.string(),
  bodyShape: Yup.string().required(),
  eyeBallShape: Yup.string().required(),
  eyeFrameShape: Yup.string().required(),
  isImagePicked: Yup.boolean().required(),
})

export type FormValues = Yup.InferType<typeof schema>

function QRDisplay({ data, color, image, bodyShape, eyeBallShape, eyeFrameShape }: Yup.InferType<typeof schema>) {
  const qrRef = useRef<HTMLDivElement>(null)
  const $color = useParseColor(color)

  return (
    <div className='max-w-md w-full md:pl-0 lg:mr-[1rem] md:mb-0 mb-3'>
      <Motion>
        <div ref={qrRef}>
          <QRWrapper color={$color?.gradient?.colors[0]?.value || $color?.color || '#000000'}>
            <QRX
              {...$color}
              data={data}
              shapes={{ body: bodyShape as never, eyeball: eyeBallShape as never, eyeframe: eyeFrameShape as never }}
              fillImage={image}
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
    <Form
      schema={schema}
      defaults={{
        data: 'https://qr-x.devtrice.dev/',
        color: 'linear-gradient(45deg, #64B2FF 0%, #8E84FF 35%, #D499ED 100%)',
        image:
          'https://images.pexels.com/photos/6633/car-superhero-symbol-batman.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        bodyShape: 'square',
        eyeBallShape: 'square',
        eyeFrameShape: 'square',
      }}
      onSubmit={() => {}}
    >
      {({ values, register, setValue }) => {
        const $values = values.isImagePicked ? { ...values, color: undefined } : { ...values, image: undefined }
        return (
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
                  <Tab options={['color', 'image']} onChange={option => setValue('isImagePicked', option === 'image')}>
                    {value => {
                      return (
                        <div className='mt-4'>
                          {value === 'color' ? (
                            <ColorPicker value={values.color as string} setValue={value => setValue('color', value)} />
                          ) : (
                            <input
                              id='image'
                              type='url'
                              name='image'
                              value={values.image}
                              placeholder='Image URL'
                              className='text-white border border-primary/50 focus-visible:border-primary focus-visible:bg-primary/20 bg-primary/10  rounded-xl w-full py-3 px-4'
                              onChange={e => setValue('image', e.target.value)}
                            />
                          )}
                        </div>
                      )
                    }}
                  </Tab>
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
              <QRDisplay {...$values} />
            </div>
            <Editor {...$values} />
          </Fragment>
        )
      }}
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
            <div className='[--animate-duration:150ms] animate-in absolute z-100 -bottom-32 md:-bottom-40 text-white flex flex-col bg-gray-500 rounded-xl p-2 w-full right-0'>
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
