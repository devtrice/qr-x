import { getSVGData, Options } from '@qr-x/core'
import { For, JSX } from 'solid-js'
import { Dynamic } from 'solid-js/web'

type Props = Options & JSX.SvgSVGAttributes<SVGSVGElement>

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
    <g fill={fills.path}>
      <path d={paths.body} />
      <For each={eyeItems}>{item => <For each={markers}>{marker => <use href={`#${ids[item]}`} {...marker} />}</For>}</For>
    </g>
  )

  return (
    <svg {...rest} width='100%' viewBox={`0 0 ${length} ${length}`}>
      {isMasked ? (
        <g>
          <mask id='mask'>{group}</mask>
          <rect x='0' y='0' width='100%' height='100%' fill={fills.rect} mask="url('#mask')" />
        </g>
      ) : (
        group
      )}

      <defs>
        <For each={eyeItems}>{item => <path id={ids[item]} d={paths[item]} />}</For>

        {gradient ? (
          <Dynamic component={gradient.isLinearGradient ? 'linearGradient' : 'radialGradient'} {...gradient.attributes}>
            <For each={gradient.colors}>{({ color, offset }) => <stop offset={offset} stop-color={color} />}</For>
          </Dynamic>
        ) : (
          fillImage && (
            <pattern id={ids.image} patternUnits='userSpaceOnUse' width='100%' height='100%'>
              <image href={fillImage} x='0' y='0' width='100%' height='100%' preserveAspectRatio='xMidYMid slice' />
            </pattern>
          )
        )}
      </defs>
    </svg>
  )
}

// !Note: Must use both href and xlinkHref to link a source
