import { ReactNode, Fragment, useState, HTMLAttributes } from 'react'

type Props = Omit<HTMLAttributes<HTMLElement>, 'children' | 'onChange'> & {
  options: string[]
  children?: (x: string) => ReactNode
  onChange?: (x: string) => void
}

export default function Tab({ options, children, className, onChange, ...rest }: Props) {
  const [value, setValue] = useState(options[0])

  return (
    <Fragment>
      <div {...rest} className={`flex space-x-2 ${className}`}>
        {options.map(option => (
          <button
            key={option}
            className={`capitalize cursor-pointer font-medium rounded-lg py-2 px-4 flex items-center transition-colors duration-300 ${option === value ? 'bg-primary text-white' : 'bg-transparent text-slate-200'}`}
            onClick={() => {
              setValue(option)
              onChange && onChange(option)
            }}
          >
            {option}
          </button>
        ))}
      </div>
      {children?.(value)}
    </Fragment>
  )
}
