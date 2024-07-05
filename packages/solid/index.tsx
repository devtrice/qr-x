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

// type Props = Options & JSX.SvgSVGAttributes<SVGSVGElement>
type Props = JSX.SvgSVGAttributes<SVGSVGElement> &
  Options & {
    /**
     * Renders an image or a component in the center of the QR code.
     * - `string` as an image src to render an image with default width and height
     * - `ComponentProps<'img'>` to render an image with custom properties.
     * - `ReactNode` to render a component.
     * @default width: 28, height: 28
     */
    central?: ImgProps | JSX.Element
  }

type ImgProps = ComponentProps<'img'> & {
  /**
   * Width of the central image.
   * @default 28
   */
  width?: ComponentProps<'img'>['width']
  /**
   * Height of the central image.
   * @default 28
   */
  height?: ComponentProps<'img'>['height']
}

function CentralImage({ src, width = 28, height = 28, ...props }: ImgProps) {
  return <img src={src} width={width} height={height} {...props} />
}

export default function QRX($props: Props) {
  const [props, rest] = splitProps($props, ['data', 'level', 'shapes', 'gradient', 'fillImage', 'central'])
  const svg = createMemo(() => getSVGData(props))

  let ref!: SVGSVGElement
  const [size, setSize] = createSignal<{ width: number; height: number } | null>(null)

  createComputed(() => {
    console.log('size', size())
  })

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
      <Show when={props.central && size()}>
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
                {typeof props.central === 'string' ? (
                  <CentralImage src={props.central} />
                ) : !isElement(props.central) && typeof props.central === 'object' && 'src' in props.central! ? (
                  <CentralImage {...props.central} />
                ) : (
                  (props.central as JSX.Element)
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
