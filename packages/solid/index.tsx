import { getSVGData, Options } from '@qr-x/core'
import { createMemo, For, JSX, Show, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'

type Props = Options & JSX.SvgSVGAttributes<SVGSVGElement>

export default function QRX($props: Props) {
  const [props, rest] = splitProps($props, ['data', 'level', 'shapes', 'gradient', 'fillImage'])

  const svg = createMemo(() => getSVGData(props))

  return (
    <svg width='100%' {...rest} viewBox={`0 0 ${svg().length} ${svg().length}`}>
      <path
        d={svg().path}
        fill={
          svg().gradient || props.fillImage
            ? `url(#${svg().gradient ? `${svg().gradient?.attributes.id}` : svg().ids.image})`
            : 'currentColor'
        }
      />

      <defs>
        <Show
          when={svg().gradient}
          fallback={
            <Show when={props.fillImage}>
              <pattern id={svg().ids.image} patternUnits='userSpaceOnUse' width='100%' height='100%'>
                <image x='0' y='0' width='100%' height='100%' href={props.fillImage} preserveAspectRatio='xMidYMid slice' />
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
