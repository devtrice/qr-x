import { useRef, useState } from 'react'
import BestColorPicker from 'react-best-gradient-color-picker'
import { useClickAway } from 'react-use'

type Props = { value: string; setValue: (x: string) => void }

export default function ColorPicker({ value, setValue }: Props) {
  const ref = useRef(null)
  const [isShow, setShow] = useState(false)
  useClickAway(ref, () => setShow(false))

  return (
    <div className='relative'>
      <div className='text-white border border-primary/50 focus-visible:border-primary focus-visible:bg-primary/20 bg-primary/10 rounded-xl w-full py-2.5 px-4 flex justify-between items-center space-x-1'>
        <input value={value} className='bg-transparent w-full' />
        <button
          onClick={() => setShow(true)}
          className='min-w-7 min-h-7 rounded-full rotate-90'
          style={{ background: value }}
        ></button>
      </div>
      {isShow && (
        <div
          ref={ref}
          className='bg-primary/10 backdrop-blur-md border border-primary/50 shadow-md rounded-lg absolute right-0 z-10 p-2 mt-2'
        >
          <BestColorPicker value={value} onChange={setValue} />
        </div>
      )}
    </div>
  )
}
