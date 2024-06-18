'use client'
import { useInView } from 'framer-motion'
import { createElement, ElementRef, HTMLAttributes, ReactHTML, useRef } from 'react'

type Props = HTMLAttributes<HTMLElement> & { as?: keyof ReactHTML }

export default function Motion({ as = 'div', className, children, ...rest }: Props) {
  const ref = useRef<ElementRef<typeof as>>(null)
  const isInView = useInView(ref, { once: true })

  return createElement(
    as,
    {
      ref,
      className: `${isInView ? 'animate-in' : 'animate-out'} ${className}`,
      ...rest,
    },
    children,
  )
}
