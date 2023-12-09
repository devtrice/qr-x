import { getSVGData, Options } from '@qr-x/core'
import { createMemo, For, JSX, Show, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'

type Props = Options & JSX.SvgSVGAttributes<SVGSVGElement>

export default function QRX($props: Props) {
  const [props, rest] = splitProps($props, ['data', 'level', 'shapes', 'image', 'gradient', 'fillImage', 'logo'])

  const svg = createMemo(() => getSVGData(props))

  const logoSqueezeFactor = 6 // smaller number = larger logo

  const group = (
    <g fill={svg().fills.path}>
      <path d={svg().paths.body} />
      <For each={svg().eyeItems}>
        {item => <For each={svg().markers}>{marker => <use href={`#${svg().ids[item]}`} {...marker} />}</For>}
      </For>
    </g>
  )

  return (
    <svg width='100%' {...rest} viewBox={`0 0 ${svg().length} ${svg().length}`}>
      {svg().isMasked ? (
        <g>
          <mask id='mask'>{group}</mask>
          <rect x='0' y='0' width='100%' height='100%' fill={svg().fills.rect} mask="url('#mask')" />
        </g>
      ) : (
        group
      )}

      <defs>
        <For each={svg().eyeItems}>{item => <path id={svg().ids[item]} d={svg().paths[item]} />}</For>
        <Show
          when={svg().gradient}
          fallback={
            <Show when={props.fillImage}>
              <pattern id={svg().ids.image} patternUnits='userSpaceOnUse' width='100%' height='100%'>
                <image href={props.fillImage} x='0' y='0' width='100%' height='100%' preserveAspectRatio='xMidYMid slice' />
              </pattern>
            </Show>
          }
        >
          <Dynamic
            component={svg().gradient?.isLinearGradient ? 'linearGradient' : 'radialGradient'}
            {...svg().gradient?.attributes}
          >
            <For each={svg().gradient?.colors}>{({ color, offset }) => <stop offset={offset} stop-color={color} />}</For>
          </Dynamic>
        </Show>
      </defs>
      <Show when={props.logo}>
        <image
          href={props.logo?.src}
          x={svg().length / 2 - svg().length / logoSqueezeFactor / 2}
          y={svg().length / 2 - svg().length / logoSqueezeFactor / 2}
          height={svg().length / logoSqueezeFactor}
          width={svg().length / logoSqueezeFactor}
        />
      </Show>
    </svg>
  )
}

// !Note: Must use both href and xlinkHref to link a source
