import { getSVGData, Options } from '@qr-x/core'
import React, { ComponentProps, SVGAttributes, useLayoutEffect } from 'react'

type LogoOptions = {
  src: string
  /**
   * @default 8
   * @description The number of QR pixels the logo will take up for the width
   */
  width?: number
  /**
   * @default 8
   * @description The number of QR pixels the logo will take up for the width
   */
  height?: number
} & ComponentProps<'img'>

type Props = SVGAttributes<SVGSVGElement> &
  Options & {
    logo?: string | LogoOptions | React.ReactNode
  }

function useViewBox() {
  const svgRef = React.useRef<SVGSVGElement>(null)
  const [viewBox, setViewBox] = React.useState('')

  useLayoutEffect(() => {
    const rect = svgRef.current?.getBoundingClientRect()
    setViewBox(`0 0 ${rect?.width} ${rect?.height}`)
  }, [])

  return { svgRef, viewBox }
}

const App = () => {
  return (
    <div>
      <QRX
        data='https://qr-x.dev'
        logo={{
          src: 'https://static.xx.fbcdn.net/rsrc.php/yT/r/aGT3gskzWBf.ico',
          width: 30,
          height: 30,
        }}
      />
    </div>
  )
}

export default function QRX({ data, level, shapes, gradient, fillImage, logo, ...rest }: Props) {
  const { id, path, cords, length, $gradient } = getSVGData({ data, level, shapes, gradient })
  const { svgRef, viewBox } = useViewBox()

  return (
    <svg ref={svgRef} width='100%' {...rest} viewBox={`0 0 ${length} ${length}`}>
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
      {viewBox && (
        <foreignObject x={0} y={0} width={'100%'} height={'100%'}>
          <svg viewBox={viewBox}>
            {logo && typeof logo === 'string' ? (
              <Logo length={length} src={logo} />
            ) : logo && typeof logo === 'object' && 'src' in logo ? (
              <Logo length={length} {...logo} />
            ) : (
              logo
            )}
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

function Logo({ length, src, height = 30, width = 30, ...props }: LogoOptions & { length: number }) {
  return (
    <foreignObject
      style={{
        overflow: 'visible',
      }}
      x={0}
      y={0}
      width={'100%'}
      height={'100%'}
    >
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img width={width} height={height} {...props} />
      </div>
    </foreignObject>
  )
}
