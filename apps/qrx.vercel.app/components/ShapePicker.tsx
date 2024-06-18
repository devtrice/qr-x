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
  const id = Math.random().toString(36).substring(7)
  return (
    <fieldset
      onChange={e => {
        setShape((e.target as HTMLInputElement).id)
      }}
    >
      <ul className='w-full grid flex-shrink-0  gap-6 mx-auto grid-cols-3  md:grid-cols-4'>
        {shapes.map(({ name, icon }) => (
          <li key={name}>
            <label
              className={`focus-within:ring-2 focus-within:ring-primary/80 md:size-[4.75rem] size-[3.6rem] cursor-pointer duration-150 transition-colors flex flex-center rounded-2xl ${shape === name ? 'bg-primary/20 border border-primary shadow shadow-primary-pink/30' : 'bg-black/60'}`}
            >
              <input type='radio' name={'shape' + id} id={name} className='sr-only' />
              {icon}
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  )
}

export default ShapePicker
