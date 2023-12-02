import React from 'react'
import { getSVGData, Options } from '@qr-x/core'
import { Path, Svg, SvgProps } from 'react-native-svg'

type Props = Options & SvgProps

export default function QRX({ data, level, shape, eyeBall, eyeFrame, smooth, ...rest }: Props) {
  const { path, length } = getSVGData({ data, level, shape, eyeBall, eyeFrame })
  return (
    <Svg {...rest} viewBox={`0 0 ${length} ${length}`}>
      <Path
        d={path}
        stroke='currentColor'
        strokeWidth={0.35}
        strokeLinecap={smooth ? 'round' : 'square'}
        strokeLinejoin={smooth ? 'round' : undefined}
      />
    </Svg>
  )
}
