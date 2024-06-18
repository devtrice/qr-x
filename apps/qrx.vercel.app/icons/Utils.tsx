import type { SVGProps } from 'react'

export function CopyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 512 512' {...props}>
      <rect
        width={336}
        height={336}
        x={128}
        y={128}
        fill='none'
        stroke='currentColor'
        strokeLinejoin='round'
        strokeWidth={32}
        rx={57}
        ry={57}
      ></rect>
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={32}
        d='m383.5 128l.5-24a56.16 56.16 0 0 0-56-56H112a64.19 64.19 0 0 0-64 64v216a56.16 56.16 0 0 0 56 56h24'
      ></path>
    </svg>
  )
}

export function CheckMarkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 512 512' {...props}>
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={32}
        d='M416 128L192 384l-96-96'
      ></path>
    </svg>
  )
}
