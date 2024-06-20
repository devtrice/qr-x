import { getSVGData, Options } from '@qr-x/core'
import { createMemo, For, JSX, Show, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'

type Props = Options & JSX.SvgSVGAttributes<SVGSVGElement>

export default function QRX($props: Props) {
  const [props, rest] = splitProps($props, ['data', 'level', 'shapes', 'gradient', 'fillImage'])
  const svg = createMemo(() => getSVGData(props))

  return (
    <svg width='100%' {...rest} viewBox={`0 0 ${svg().length} ${svg().length}`}>
      <g clip-path={`url(#${svg().id})`}>
        <rect {...svg().cords} fill={svg().$gradient ? `url(#${svg().$gradient?.attributes?.id})` : 'currentColor'} />
        <Show when={props.fillImage}>
          <image
            {...svg().cords}
            href={props.fillImage}
            // @ts-ignore
            xlink:href={props.fillImage} // Note: Must use both href and xlinkHref to link a source
            preserveAspectRatio='xMidYMid slice'
          />
        </Show>
        {/* <Show when={props.fillVideo}>
          <foreignObject {...svg().cords}>
            <div style={{ position: 'relative' }}>
              <video src={props.fillVideo} width='100%' height='100%' muted autoplay style={{ 'object-fit': 'cover' }} />
            </div>
          </foreignObject>
        </Show> */}
      </g>
      <defs>
        <clipPath id={svg().id}>
          <path d={svg().path} />
        </clipPath>
        <Show when={svg().$gradient}>
          <Dynamic
            component={svg().$gradient?.isLinearGradient ? 'linearGradient' : 'radialGradient'}
            {...svg().$gradient?.attributes}
          >
            <For each={svg().$gradient?.colors}>{({ color, offset }) => <stop offset={offset} stop-color={color} />}</For>
          </Dynamic>
        </Show>
      </defs>
    </svg>
  )
}
