import React, { createElement } from 'react'
import getMatrix, { shapes, Shapes, Options } from '@qr-x/core'

type Props = Options & { shape?: Shapes }

export default function QRX({ shape = 'square', ...options }: Props) {
  const matrix = getMatrix(options)
  const { tag, props } = shapes[shape]
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox={`0 0 ${matrix.length} ${matrix.length}`} width='100%' height='100%'>
      {/* Safari won't render SVGs without width and height */}
      {matrix.map((row, i) => row.map(({ isON }, j) => createElement(tag, { ...props(i, j), fill: isON ? '#000' : '#fff' })))}
    </svg>
  )
}
