'use client'

type Props = {
  value?: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

export default function ColorInput({ onChange, value }: Props) {
  return (
    <div className='relative'>
      <input
        type='text'
        className='text-white border border-primary/50 focus-visible:border-primary focus-visible:bg-primary/20 bg-primary/10 rounded-xl w-full h-10 py-6 px-4'
        value={value}
        onChange={onChange}
      />
      <button
        style={{
          backgroundColor: value,
        }}
        className='rounded-xl absolute right-4 top-1/2 -translate-y-1/2 size-6 border border-white/60'
      >
        <span className='sr-only'>Pick color</span>
      </button>
      <input
        id='color'
        type='color'
        className='rounded-xl absolute right-4 top-1/2 -translate-y-1/2 size-6 opacity-0 cursor-pointer'
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
