import { getSVGData, Options } from '@qr-x/core'
import React, { ComponentProps, SVGAttributes } from 'react'

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

export default function QRX({ data, level, shapes, gradient, fillImage, logo, ...rest }: Props) {
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
      </g>
      {logo && typeof logo === 'string' ? (
        <Logo length={length} src={logo} />
      ) : logo && typeof logo === 'object' && 'src' in logo ? (
        <Logo length={length} {...logo} />
      ) : (
        logo
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

const App = () => (
  <QRX
    data='https://qr-x.dev'
    logo={{
      src: 'https://static.xx.fbcdn.net/rsrc.php/yT/r/aGT3gskzWBf.ico',
      width: 8,
      height: 8,
      style: {
        padding: '1px',
        backgroundColor: 'green',
        borderRadius: '2px',
      },
    }}
  />
)

const LOGO_SIZE = 8

function Logo({ length, src, height, width, style, ...props }: LogoOptions & { length: number }) {
  const _width = width || LOGO_SIZE // length / 3
  const _height = height || LOGO_SIZE // length / 3
  return (
    <foreignObject
      style={{
        boxSizing: 'border-box',
        overflow: 'visible',
      }}
      x={length / 2 - _width / 2}
      y={length / 2 - _height / 2}
      width={_width}
      height={_height}
    >
      <img
        src={src}
        style={{
          padding: '1px',
          backgroundColor: 'green',
          boxSizing: 'border-box',
          borderRadius: '2px',
          display: 'block',
          width: '100%',
          height: '100%',
          ...style,
        }}
        {...props}
      />
    </foreignObject>
  )
}
