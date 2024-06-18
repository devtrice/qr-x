import { ReactNode } from 'react'

function ShapePicker({
  shape,
  shapes,
  setShape,
}: {
  shape: string
  shapes: { name: string; icon: ReactNode }[]
  setShape: (shape: string) => void
}) {
  return (
    <ul className='flex space-x-4'>
      {shapes.map(({ name, icon }) => (
        <li
          key={name}
          role='button'
          className={`size-[4.75rem] cursor-pointer duration-150 transition-colors flex flex-center rounded-2xl ${shape === name ? 'bg-white text-black' : 'bg-black text-white'}`}
          onClick={() => setShape(name)}
        >
          {icon}
        </li>
      ))}
    </ul>
  )
}

export default ShapePicker
