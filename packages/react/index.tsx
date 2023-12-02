import React, { SVGAttributes } from 'react'
import { getSVGData, Options } from '@qr-x/core'

type Props = Options & SVGAttributes<SVGSVGElement>

export default function QRX({ data, level, shape, eyeBall, eyeFrame, smooth, ...rest }: Props) {
  const { path, getEyeFramePath, getEyeBallPath, length, id } = getSVGData({ data, level, shape, eyeBall, eyeFrame })

  const eyeFrameId = `#eyeframe-${id}`
  const eyeBallId = `#eyeball-${id}`

  return (
    <svg {...rest} xmlns='http://www.w3.org/2000/svg' viewBox={`0 0 ${length} ${length}`} width='100%' height='100%'>
      <defs>
        <symbol id={eyeFrameId.substring(1)}>
          <path d={getEyeFramePath(0, 0)} fill='currentColor' />
        </symbol>
        <symbol id={eyeBallId.substring(1)}>
          <path d={getEyeBallPath(2, 2)} fill='currentColor' />
        </symbol>
      </defs>

      <use href={eyeFrameId} xlinkHref={eyeFrameId} x={0} y={0} />
      <use href={eyeFrameId} xlinkHref={eyeFrameId} x={-length} y={0} transform='scale(-1 1)' />
      <use href={eyeFrameId} xlinkHref={eyeFrameId} x={0} y={-length} transform='scale(1 -1)' />
      <use href={eyeBallId} xlinkHref={eyeBallId} x={0} y={0} />
      <use href={eyeBallId} xlinkHref={eyeBallId} x={-length} y={0} transform='scale(-1 1)' />
      <use href={eyeBallId} xlinkHref={eyeBallId} x={0} y={-length} transform='scale(1 -1)' />
      {/**
       * href is modern way and xlink:href is for backward compatibility
       * xlink:href is deprecated in SVG 2.0
       */}

      <path d={path} fill='currentColor' />
    </svg>
  )
}
