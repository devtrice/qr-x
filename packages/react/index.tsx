import { getSVGData, Options } from '@qr-x/core'
import { createElement, FunctionComponent } from 'react'
import { Defs, G, Image, LinearGradient, Mask, Path, Pattern, RadialGradient, Rect, Stop, Svg, SvgProps, Use } from './tags/'

type Props = Options & SvgProps

// function MarkImage({ src, size, length }: NonNullable<Props['image']> & { length: number }) {
//   const cord = (length - size) / 2

//   return (
//     <>
//       <clipPath id='clip-path'>
//         <rect x={cord} y={cord} width={size} height={size} rx={99999} ry={99999} fill='red' />
//       </clipPath>
//       <Image
//         x={cord}
//         y={cord}
//         width={size}
//         height={size}
//         xlinkHref={src}
//         clipPath='url(#clip-path)'
//         preserveAspectRatio='xMidYMid slice'
//       />
//     </>
//   )
// }

export default function QRX({ data, level, shapes, image, gradient: $gradient, fillImage, ...rest }: Props) {
  const { ids, fills, paths, length, markers, gradient, eyeItems, isMasked } = getSVGData({
    data,
    level,
    image,
    shapes,
    gradient: $gradient,
    fillImage,
  })

  const group = (
    <G fill={fills.path}>
      <Path d={paths.body} />
      {eyeItems.map(item =>
        markers.map((marker, index) => (
          <Use key={`${item}-${index}`} href={`#${ids[item]}`} xlinkHref={`#${ids[item]}`} {...marker} />
        )),
      )}
    </G>
  )

  return (
    <Svg {...rest} viewBox={`0 0 ${length} ${length}`}>
      {isMasked ? (
        <G>
          <Mask id='mask'>{group}</Mask>
          <Rect x='0' y='0' width='100%' height='100%' fill={fills.rect} mask="url('#mask')" />
        </G>
      ) : (
        group
      )}

      <Defs>
        {eyeItems.map(item => (
          <Path key={item} id={ids[item]} d={paths[item]} />
        ))}

        {gradient
          ? createElement(
              (gradient.isLinearGradient ? LinearGradient : RadialGradient) as FunctionComponent<typeof gradient.attributes>,
              gradient.attributes,
              gradient.colors.map(({ color, offset }) => <Stop key={offset} offset={offset} stopColor={color} />),
            )
          : fillImage && (
              <Pattern id={ids.image} patternUnits='userSpaceOnUse' width='100%' height='100%'>
                <Image href={fillImage} x='0' y='0' width='100%' height='100%' preserveAspectRatio='xMidYMid slice' />
              </Pattern>
            )}
      </Defs>
    </Svg>
  )
}

// !Note: Must use both href and xlinkHref to link a source
