import { getSVGData, Options } from '@qr-x/core'
import React, { SVGAttributes } from 'react'

type Props = Options & SVGAttributes<SVGSVGElement>

export default function QRX({ data, level, shapes, gradient: $gradient, fillImage, ...rest }: Props) {
  const { ids, paths, length, gradient } = getSVGData({
    data,
    level,
    shapes,
    gradient: $gradient,
    fillImage,
  })

  return (
    <svg {...rest} viewBox={`0 0 ${length} ${length}`}>
      <g fill={gradient || fillImage ? `url(#${gradient ? `${gradient?.attributes.id}` : ids.image})` : 'currentColor'}>
        <path d={paths.body} />
      </g>

      <defs>
        {gradient
          ? // Warning: Keep as React.createElement bec React must be imported in the output bundle. Just using import React from 'react' is risky coz the editor will remove unused deps.
            React.createElement(
              gradient.isLinearGradient ? 'linearGradient' : 'radialGradient',
              gradient.attributes,
              gradient.colors.map(({ color, offset }) => <stop key={offset} offset={offset} stopColor={color} />),
            )
          : fillImage && (
              <pattern id={ids.image} patternUnits='userSpaceOnUse' width='100%' height='100%'>
                <image
                  x='0'
                  y='0'
                  width='100%'
                  height='100%'
                  href={fillImage}
                  xlinkHref={fillImage}
                  preserveAspectRatio='xMidYMid slice'
                />
              </pattern>
            )}
      </defs>
    </svg>
  )
}

// !Note: Must use both href and xlinkHref to link a source
