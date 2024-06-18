'use client'

import { UseFormRegister } from 'react-hook-form'

type Props = {
  values: any
  setValue: any
}

export default function ColorInput({ setValue, values }: Props) {
  const value = values.color
  const handleChange = (e: any) => setValue('color', e.target.value)
  return (
    <div className='relative'>
      <input
        type='text'
        className='text-white border border-primary/50 focus-visible:border-primary focus-visible:bg-primary/20 bg-primary/10 rounded-xl w-full h-10 py-6 px-4'
        value={value}
        onChange={handleChange}
      />
      <button
        style={{
          backgroundColor: value,
        }}
        className='rounded-xl absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 border border-white/60'
      >
        <span className='sr-only'>Pick color</span>
      </button>
      <input
        id='color'
        type='color'
        className='rounded-xl absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 opacity-0 cursor-pointer'
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}
