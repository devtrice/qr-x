import { getSVGData, Options } from '@qr-x/core'
import React, { SVGAttributes } from 'react'

type Props = Options & SVGAttributes<SVGSVGElement>

export default function QRX({ data, level, shapes, gradient, fillImage, fillVideo, ...rest }: Props) {
  const { id, path, cords, length, $gradient } = getSVGData({ data, level, shapes, gradient })

  return (
    <svg width='100%' {...rest} viewBox={`0 0 ${length} ${length}`}>
      <g clipPath={`url(#${id})`}>
        <rect {...cords} fill={$gradient ? `url(#${$gradient.attributes.id})` : 'currentColor'} />
        {fillImage && (
          <image
            {...cords}
            href={fillImage}
            xlinkHref={fillImage} // !Note: Must use both href and xlinkHref to link a source
            preserveAspectRatio='xMidYMid slice'
          />
        )}
        {fillVideo && (
          <foreignObject {...cords}>
            <div style={{ position: 'relative' }}>
              <video src={fillVideo} width='100%' height='100%' muted autoPlay style={{ objectFit: 'cover' }} />
            </div>
          </foreignObject>
        )}
      </g>
      <defs>
        <clipPath id={id}>
          <path d={path} />
        </clipPath>
        {$gradient &&
          React.createElement(
            $gradient.isLinearGradient ? 'linearGradient' : 'radialGradient',
            $gradient.attributes,
            $gradient.colors.map(({ color, offset }) => <stop key={offset} offset={offset} stopColor={color} />),
          )}
      </defs>
    </svg>
  )
}
