import { getSVGData, Options } from '@qr-x/core'
import React, { ComponentProps, ImgHTMLAttributes, ReactNode, SVGAttributes, useLayoutEffect } from 'react'

type Props = SVGAttributes<SVGSVGElement> &
  Options & {
    /**
     * Renders an image or a component in the center of the QR code.
     * - `string` as an image src to render an image with default width and height
     * - `ComponentProps<'img'>` to render an image with custom properties.
     * - `ReactNode` to render a component.
     * @default width: 28, height: 28
     */
    central?: ImgProps | ReactNode
  }

type ImgProps = ComponentProps<'img'> & {
  /**
   * Width of the central image.
   * @default 28
   */
  width?: ComponentProps<'img'>['width']
  /**
   * Height of the central image.
   * @default 28
   */
  height?: ComponentProps<'img'>['height']
}

function useViewBox() {
  const ref = React.useRef<SVGSVGElement>(null)
  const [viewBox, setViewBox] = React.useState('')

  useLayoutEffect(() => {
    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect()
      setViewBox(`0 0 ${width} ${height}`)
    }
  }, [])

  return { ref, viewBox }
}

function CentralImage({ src, width = 28, height = 28, ...props }: ImgProps) {
  return <img src={src} width={width} height={height} {...props} />
}

export default function QRX({ data, level, shapes, gradient, central, fillImage, ...rest }: Props) {
  const { ref, viewBox } = useViewBox()
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
      {central && viewBox && (
        <foreignObject {...cords}>
          <svg viewBox={viewBox}>
            <foreignObject {...cords} style={{ overflow: 'visible' }}>
              <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {typeof central === 'string' ? (
                  <CentralImage src={central} />
                ) : typeof central === 'object' && 'src' in central ? (
                  <CentralImage {...central} />
                ) : (
                  (central as ReactNode)
                )}
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
