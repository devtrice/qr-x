'use client'

import Form from 'components/Form'
import Motion from 'components/Motion'
import { Fragment } from 'react'
import * as Yup from 'yup'
import QRX from '@qr-x/react'
import Editor from 'components/Editor'
import ColorInput from 'components/ColorInput'
import { shapes } from 'constant'
import ShapePicker from 'components/ShapePicker'

const schema = Yup.object({
  data: Yup.string().required(),
  backgroundURL: Yup.string(),
  bodyShape: Yup.string().required(),
  eyeBallShape: Yup.string().required(),
  eyeFrameShape: Yup.string().required(),
  color: Yup.string().required(),
})

export default function Playground() {
  return (
    <Form
      schema={schema}
      defaults={{
        data: '',
        backgroundURL: '',
        bodyShape: 'square',
        eyeBallShape: 'square',
        eyeFrameShape: 'square',
        color: '#000000',
      }}
      onSubmit={() => {}}
    >
      {({ values, setValue }) => (
        <Fragment>
          <div className='flex-col space-x-5 justify-between flex md:flex-row'>
            <Motion className='flex-1 max-w-xl space-y-8 my-8'>
              <fieldset>
                <label className='text-base font-medium mb-4 block text-white' htmlFor='data'>
                  QR Data
                </label>
                <textarea
                  id='data'
                  name='data'
                  className='text-white border border-primary/50 focus-visible:border-primary focus-visible:bg-primary/20 bg-primary/10  rounded-xl w-full min-h-20 resize-none py-3 px-4'
                  onChange={e => setValue('data', e.target.value)}
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
                  shapes={[shapes.square, shapes.circle, shapes.leaf]}
                  setShape={shape => setValue('eyeFrameShape', shape)}
                />
              </fieldset>
              <fieldset>
                <label className='text-base font-medium mb-4 block text-white' htmlFor='color'>
                  Eyeball
                </label>
                <ShapePicker
                  shape={values.eyeBallShape}
                  shapes={[shapes.square, shapes.circle, shapes.leaf]}
                  setShape={shape => setValue('eyeBallShape', shape)}
                />
              </fieldset>
            </Motion>
            <Motion>
              <div className='size-[30rem] flex flex-center bg-white rounded-3xl'>
                <QRX
                  className='w-96'
                  data={values.data}
                  color={values.color}
                  fillImage={values.backgroundURL}
                  shapes={{
                    body: values.bodyShape as never,
                    eyeball: values.eyeBallShape as never,
                    eyeframe: values.eyeFrameShape as never,
                  }}
                />
              </div>
            </Motion>
          </div>
          <Editor values={values} />
        </Fragment>
      )}
    </Form>
  )
}
