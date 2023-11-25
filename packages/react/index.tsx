import React, { createElement } from 'react'
import getMatrix, { shapes, Shapes, Options } from '@qr-x/core'

type Props = Options & { shape?: Shapes }

export default function QRX({ shape = 'rect', ...options }: Props) {
  const matrix = getMatrix(options)
  const { tag, props } = shapes[shape]
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox={`0 0 ${matrix.length} ${matrix.length}`} width={500} height={500}>
      {matrix.map((row, i) => row.map(({ isON }, j) => createElement(tag, { ...props(i, j), fill: isON ? '#000' : '#fff' })))}
    </svg>
  )
}
