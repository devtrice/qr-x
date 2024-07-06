import { getSVGData, Options } from '@qr-x/core'
import React, { ComponentProps, ImgHTMLAttributes, ReactNode, SVGAttributes, useEffect, useLayoutEffect } from 'react'

type Props = SVGAttributes<SVGSVGElement> &
  Options & {
    /**
     * Renders an image or a component in the center of the QR code.
     * - `string` as an image src to render an image with default width and height
     * - `ComponentProps<'img'>` to render an image with custom properties.
     * - `ReactNode` to render a component.
     * @default width: 28, height: 28
     */
    brand?: ImgProps | ReactNode
  }

type ImgProps = ComponentProps<'img'> & {
  /**
   * Width of the brand image.
   * @default 28
   */
  width?: ComponentProps<'img'>['width']
  /**
   * Height of the brand image.
   * @default 28
   */
  height?: ComponentProps<'img'>['height']
}

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

function BrandImage({ src, width = 28, height = 28, ...props }: ImgProps) {
  return <img src={src} width={width} height={height} {...props} />
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
                {typeof brand === 'string' ? (
                  <BrandImage src={brand} />
                ) : typeof brand === 'object' && 'src' in brand ? (
                  <BrandImage {...brand} />
                ) : (
                  (brand as ReactNode)
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
