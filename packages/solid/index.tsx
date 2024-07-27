import { getSVGData, Options } from '@qr-x/core'
import {
  createMemo,
  For,
  JSX,
  Show,
  splitProps,
  ComponentProps,
  createRenderEffect,
  createSignal,
  createComputed,
  onMount,
} from 'solid-js'
import { Dynamic } from 'solid-js/web'

function isElement(element: any) {
  return element instanceof Element || element instanceof HTMLDocument
}

type Props = JSX.SvgSVGAttributes<SVGSVGElement> & Options & { brand?: ComponentProps<'img'> | JSX.Element }

export default function QRX($props: Props) {
  const [props, rest] = splitProps($props, ['data', 'level', 'shapes', 'gradient', 'fillImage', 'brand'])
  const svg = createMemo(() => getSVGData(props))

  let ref!: SVGSVGElement
  const [size, setSize] = createSignal<{ width: number; height: number } | null>(null)

  onMount(() => {
    if (ref) {
      const { width, height } = ref.getBoundingClientRect()
      setSize({ width, height })
    }
  })

  return (
    <svg ref={ref} width='100%' {...rest} viewBox={`0 0 ${svg().length} ${svg().length}`}>
      <g clip-path={`url(#${svg().id})`}>
        <rect {...svg().cords} fill={svg().$gradient ? `url(#${svg().$gradient?.attributes?.id})` : 'currentColor'} />
        <Show when={props.fillImage}>
          <image {...svg().cords} href={props.fillImage} preserveAspectRatio='xMidYMid slice' />
        </Show>
      </g>
      <Show when={props.brand && size()}>
        <foreignObject {...svg().cords}>
          <svg viewBox={`0 0 ${size()?.width} ${size()?.height}`}>
            <foreignObject {...svg().cords} style={{ overflow: 'visible' }}>
              <div
                style={{
                  width: size()?.width + 'px', // without `px`, solid do not include the style property
                  height: size()?.height + 'px', // without `px`, solid do not include the style property
                  display: 'flex',
                  'align-items': 'center',
                  'justify-content': 'center',
                }}
              >
                {!isElement(props.brand) && typeof props.brand === 'object' && 'src' in props.brand! ? (
                  <img {...props.brand} />
                ) : (
                  (props.brand as JSX.Element)
                )}
              </div>
            </foreignObject>
          </svg>
        </foreignObject>
      </Show>
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
