import { getSVGData, Options } from '@qr-x/core'
import { View, Image, ImageProps } from 'react-native'
import {
  Svg,
  SvgProps,
  G,
  Rect,
  Image as SVGImage,
  ForeignObject,
  Defs,
  Path,
  LinearGradient,
  Stop,
  ClipPath,
  RadialGradient,
} from 'react-native-svg'
import React, { ComponentProps, ReactElement, ReactNode, SVGAttributes, useEffect } from 'react'

type Props = SvgProps & Options & { brand?: ImageProps | ReactElement }

function useViewBox() {
  const ref = React.useRef<Svg>(null)
  const [size, setSize] = React.useState<{ width: number; height: number } | null>(null)

  useEffect(() => {
    if (ref.current) {
      // const { width, height } = ref.current.getBoundingClientRect()
      // setSize({ width, height })
    }
  }, [])

  return { ref, size, viewBox: size ? `0 0 ${size.width} ${size.height}` : '' }
}

export default function QRX({ data, level, shapes, gradient, brand, fillImage, ...rest }: Props) {
  const { ref, size, viewBox } = useViewBox()
  const { id, path, cords, length, $gradient } = getSVGData({ data, level, shapes, gradient })

  const Gradient = $gradient && $gradient.isLinearGradient ? LinearGradient : RadialGradient

  return (
    <Svg ref={ref} width='100%' {...rest} viewBox={`0 0 ${length} ${length}`}>
      <G clipPath={`url(#${id})`}>
        <Rect {...cords} fill={$gradient ? `url(#${$gradient.attributes.id})` : 'currentColor'} />
        {fillImage && (
          <SVGImage
            {...cords}
            href={fillImage}
            xlinkHref={fillImage} // !Note: Must use both href and xlinkHref to link a source
            preserveAspectRatio='xMidYMid slice'
          />
        )}
      </G>
      {brand && viewBox && (
        <ForeignObject {...cords}>
          <Svg viewBox={viewBox}>
            <ForeignObject {...cords}>
              <View style={{ ...size, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {typeof brand === 'object' && 'src' in brand ? <Image {...brand} /> : (brand as ReactNode)}
              </View>
            </ForeignObject>
          </Svg>
        </ForeignObject>
      )}
      <Defs>
        <ClipPath id={id}>
          <Path d={path} />
        </ClipPath>
        {/* <Gradient {...$gradient?.attributes}></Gradient>
        {$gradient &&
          React.createElement(
            ,
            $gradient.attributes,
            $gradient.colors.map(({ color, offset }) => <Stop key={offset} offset={offset} stopColor={color} />),
          )} */}
      </Defs>
    </Svg>
  )
}
