import { useRef, useState } from 'react'
import BestColorPicker from 'react-best-gradient-color-picker'
import { useClickAway } from 'react-use'

type Props = { value: string; setValue: (x: string) => void }

export default function ColorPicker({ value, setValue }: Props) {
  const ref = useRef(null)
  const [isShow, setShow] = useState(false)

  useClickAway(ref, () => {
    setShow(false)
  })

  return (
    <div className='relative'>
      <div
        className='text-white border border-primary/50 focus-visible:border-primary focus-visible:bg-primary/20 bg-primary/10 rounded-xl w-full py-3 px-4'
        onClick={() => setShow(true)}
      >
        {value}
      </div>
      {isShow && (
        <div ref={ref} className='bg-black border border-white/25 shadow-md rounded-lg absolute z-10 p-2 mt-2'>
          <BestColorPicker value={value} onChange={setValue} />
        </div>
      )}
    </div>
  )
}
