import React, { createElement } from 'react'
import getMatrix, { paths, Paths, Options } from '@qr-x/core'

type Props = Options & { path?: Paths }

export default function QRX({ path = 'rect', ...options }: Props) {
  const matrix = getMatrix(options)
  const { tag, props } = paths[path]
  return (
    <svg viewBox={`0 0 ${matrix.length} ${matrix.length}`}>
      <g shapeRendering='crispEdges'>
        {matrix.map((row, i) =>
          row.map(({ isON }, j) => createElement(tag, { ...props(i, j), fill: isON ? '#000' : '#fff', width: 1, height: 1 })),
        )}
      </g>
    </svg>
  )
}
