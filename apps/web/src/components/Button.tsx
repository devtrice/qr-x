import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import clsx from 'clsx'
import Link from 'next/link'
import { ComponentProps } from 'react'

function ArrowIcon(props: any) {
  return (
    <svg
      {...props}
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 920.000000 512.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill="currentColor"
        stroke="none"
      >
        <path
          d="M4265 5109 c-55 -5 -166 -23 -248 -39 -497 -100 -938 -342 -1289
    -709 -370 -386 -587 -838 -669 -1391 -20 -132 -17 -510 5 -655 142 -950 795
    -1718 1702 -2004 699 -220 1484 -110 2086 292 162 108 259 187 388 317 395
    394 640 901 705 1457 88 755 -178 1503 -726 2040 -127 125 -208 191 -363 294
    -294 196 -650 332 -1006 384 -132 19 -453 27 -585 14z m480 -364 c470 -55 909
    -269 1242 -607 126 -127 170 -181 268 -328 174 -259 286 -559 331 -885 22
    -163 15 -473 -15 -630 -82 -438 -275 -807 -581 -1114 -290 -291 -642 -486
    -1040 -575 -312 -69 -695 -60 -1000 24 -718 198 -1288 772 -1479 1490 -193
    723 15 1488 548 2020 357 356 813 570 1306 613 106 9 303 5 420 -8z"
        />
        <path
          d="M4650 3345 l395 -395 -913 0 -912 0 0 -295 0 -295 912 0 913 0 -393
    -392 -392 -393 282 2 283 3 540 540 540 540 -540 540 -540 540 -285 0 -285 0
    395 -395z"
        />
      </g>
    </svg>
  )
}

const classes = cva(
  'inline-flex gap-0.5 justify-center !rounded-full overflow-hidden text-sm font-bold transition',
  {
    variants: {
      variant: {
        primary:
          'rounded-full bg-gradient-to-r from-[#4198EE] via-[#6359D3] to-[#5B21B8] text-white text-xl px-6 py-3 border border-white/20 hover:ring hover:ring-white hover:ring-2 active:ring-0',
        secondary:
          'rounded-sm bg-zinc-100  py-1 px-3 text-zinc-900 hover:bg-primary dark:bg-blue-800/40 dark:text-zinc-400 dark:ring-1 hover:text-white dark:ring-inset dark:ring-zinc-800 dark:hover:bg-blue-800 dark:hover:text-zinc-300',
        filled:
          'rounded-sm bg-blue-500 py-1 px-3 text-white hover:bg-blue-700 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-400',
        outline:
          'rounded-sm py-1 px-3 text-zinc-700 ring-1 ring-inset ring-zinc-900/10 hover:bg-primary hover:text-white dark:text-zinc-400 dark:ring-white/10 dark:hover:bg-white/5 dark:hover:text-white',
        text: 'bg-gradient-to-r from-[#DDB4F6] to-[#8DD0FC] text-white text-xl px-6 py-3 bg-clip-text text-transparent',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
)

type Props = ComponentProps<'button'> & {
  variant?: VariantProps<typeof classes>['variant']
  arrow?: 'left' | 'right'
  href?: string
}
export function Button({
  variant,
  className,
  children,
  arrow,
  ...props
}: Props) {
  const Component = props.href ? Link : 'button'

  const arrowIcon = (
    <ArrowIcon
      className={clsx(
        'mt-0.5 h-5 w-5',
        variant === 'text' && 'relative top-px',
        arrow === 'left' && '-ml-1 rotate-180',
        arrow === 'right' && '!font-shan -mr-1'
      )}
    />
  )

  return (
    // @ts-expect-error
    <Component
      className={cn(
        classes({
          variant,
        }),
        className
      )}
      {...props}
    >
      {arrow === 'left' && arrowIcon}
      {children}
      {arrow === 'right' && arrowIcon}
    </Component>
  )
}
