import { getSVGData, Options } from '@qr-x/core'
import { createMemo, For, JSX, Show, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'

type Props = Options & JSX.SvgSVGAttributes<SVGSVGElement>

export default function QRX($props: Props) {
  const [props, rest] = splitProps($props, ['data', 'level', 'shapes', 'gradient', 'fillImage'])

  const svg = createMemo(() => getSVGData(props))

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
    </svg>
  )
}

// !Note: Must use both href and xlinkHref to link a source
