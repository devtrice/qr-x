import { getSVGData, Options } from '@qr-x/core'
import React, { SVGAttributes } from 'react'

type Props = Options & SVGAttributes<SVGSVGElement>

export default function QRX({ data, level, shapes, gradient: $gradient, fillImage, ...rest }: Props) {
  const { ids, fills, paths, length, markers, gradient, eyeItems, isMasked } = getSVGData({
    data,
    level,
    shapes,
    gradient: $gradient,
    fillImage,
  })

  return (
    <svg {...rest} viewBox={`0 0 ${length} ${length}`}>
      <g fill={gradient || fillImage ? `url(#${gradient ? `pattern-${gradient?.attributes.id}` : ids.image})` : 'currentColor'}>
        {eyeItems.map(item =>
          markers.map((marker, index) => (
            <use key={`${item}-${index}`} href={`#${ids[item]}`} xlinkHref={`#${ids[item]}`} {...marker} />
          )),
        )}
        <path d={paths.body} />
      </g>

      <defs>
        {eyeItems.map(item => (
          <path key={item} id={ids[item]} d={paths[item]} />
        ))}

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

        <pattern id={`pattern-${gradient?.attributes.id}`} patternUnits='userSpaceOnUse' width='100%' height='100%'>
          <rect x='0' y='0' width='100%' height='100%' fill={`url(#${gradient?.attributes.id})`} />
        </pattern>
      </defs>
    </svg>
  )
}

// !Note: Must use both href and xlinkHref to link a source
