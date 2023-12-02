import React, { SVGAttributes } from 'react'
import { getSVGData, Options } from '@qr-x/core'

type Props = Options & SVGAttributes<SVGSVGElement>

export default function QRX({ data, level, shape, eyeBall, eyeFrame, smooth, ...rest }: Props) {
  const { path, length } = getSVGData({ data, level, shape, eyeBall, eyeFrame })
  return (
    <svg {...rest} xmlns='http://www.w3.org/2000/svg' viewBox={`0 0 ${length} ${length}`} width='100%' height='100%'>
      <path d={path} fill='currentColor' />
    </svg>
  )
}
