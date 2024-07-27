import { getSVGData, Options } from '@qr-x/core'
import React, { ReactElement, ReactNode } from 'react'
import { Image, ImageProps, View } from 'react-native'
import {
  ClipPath,
  Defs,
  ForeignObject,
  G,
  LinearGradient,
  Path,
  RadialGradient,
  Rect,
  Stop,
  Svg,
  Image as SVGImage,
  SvgProps,
} from 'react-native-svg'

type Props = SvgProps & Options & { brand?: ImageProps | ReactElement }

export default function QRX({ data, level, shapes, gradient, brand, fillImage, ...rest }: Props) {
  const [size, setSize] = React.useState<{
    width: number
    height: number
  } | null>(null)

  const { id, path, cords, length, $gradient } = getSVGData({
    data,
    level,
    shapes,
    gradient,
  })

  const viewBox = size ? `0 0 ${size.width} ${size.height}` : ''
  return (
    <Svg
      onLayout={event => {
        setSize({
          width: event.nativeEvent.layout.width,
          height: event.nativeEvent.layout.height,
        })
      }}
      width='100%'
      {...rest}
      viewBox={`0 0 ${length} ${length}`}
    >
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
              <View
                style={{
                  ...size,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
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

        {$gradient &&
          React.createElement(
            //@ts-ignore
            $gradient && $gradient.isLinearGradient ? LinearGradient : RadialGradient,
            $gradient.attributes,
            $gradient.colors.map(({ color, offset }) => <Stop key={offset} offset={offset} stopColor={color} />),
          )}
      </Defs>
    </Svg>
  )
}
