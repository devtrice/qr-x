import { getSVGData, Options } from '@qr-x/core'
import React, { ComponentProps, ReactElement, ReactNode, SVGAttributes, useEffect } from 'react'

type Props = SVGAttributes<SVGSVGElement> & Options & { brand?: ComponentProps<'img'> | ReactElement }

function useViewBox() {
  const ref = React.useRef<SVGSVGElement>(null)
  const [size, setSize] = React.useState<{ width: number; height: number } | null>(null)

  useEffect(() => {
    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect()
      setSize({ width, height })
    }
  }, [])

  return { ref, size, viewBox: size ? `0 0 ${size.width} ${size.height}` : '' }
}

export default function QRX({ data, level, shapes, gradient, brand, fillImage, ...rest }: Props) {
  const { ref, size, viewBox } = useViewBox()
  const { id, path, cords, length, $gradient } = getSVGData({ data, level, shapes, gradient })

  return (
    <svg ref={ref} width='100%' {...rest} viewBox={`0 0 ${length} ${length}`}>
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
      </g>
      {brand && viewBox && (
        <foreignObject {...cords}>
          <svg viewBox={viewBox}>
            <foreignObject {...cords} style={{ overflow: 'visible' }}>
              <div style={{ ...size, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {typeof brand === 'object' && 'src' in brand ? <img {...brand} /> : (brand as ReactNode)}
              </div>
            </foreignObject>
          </svg>
        </foreignObject>
      )}
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
