import { getSVGData, Options } from '@qr-x/core'
import { createElement, SVGAttributes } from 'react'

type Props = Options & SVGAttributes<SVGSVGElement>

function Image({ src, size, length }: NonNullable<Props['image']> & { length: number }) {
  const cord = (length - size) / 2

  return (
    <>
      <clipPath id='clip-path'>
        <rect x={cord} y={cord} width={size} height={size} rx={99999} ry={99999} fill='red' />
      </clipPath>
      <image
        x={cord}
        y={cord}
        width={size}
        height={size}
        xlinkHref={src}
        clipPath='url(#clip-path)'
        preserveAspectRatio='xMidYMid slice'
      />
    </>
  )
}

export default function QRX({ data, level, shape, image, eyeBall, eyeFrame, smooth, gradient: $gradient, ...rest }: Props) {
  const { id, paths, length, gradient } = getSVGData({
    data,
    level,
    shape,
    eyeBall,
    eyeFrame,
    gradient: $gradient,
  })

  const fill = gradient ? "url('#gradient')" : 'currentColor'
  const eyeBallId = `#eyeball-${id}`
  const eyeFrameId = `#eyeframe-${id}`
  const isLinearGradient = gradient?.type === 'linear'

  return (
    <svg {...rest} xmlns='http://www.w3.org/2000/svg' viewBox={`0 0 ${length} ${length}`} width='100%'>
      <g>
        <use href={eyeBallId} xlinkHref={eyeBallId} x={0} y={0} />
        <use href={eyeBallId} xlinkHref={eyeBallId} x={-length} y={0} transform='scale(-1 1)' />
        <use href={eyeBallId} xlinkHref={eyeBallId} x={0} y={-length} transform='scale(1 -1)' />
        <use href={eyeFrameId} xlinkHref={eyeFrameId} x={0} y={0} />
        <use href={eyeFrameId} xlinkHref={eyeFrameId} x={-length} y={0} transform='scale(-1 1)' />
        <use href={eyeFrameId} xlinkHref={eyeFrameId} x={0} y={-length} transform='scale(1 -1)' />
        <path d={paths.body} fill={fill} />
      </g>
      {image && <Image {...image} length={length} />}
      <defs>
        <symbol id={eyeBallId.substring(1)}>
          <path d={paths.eyeball} fill={fill} />
        </symbol>
        <symbol id={eyeFrameId.substring(1)}>
          <path d={paths.eyeframe} fill={fill} />
        </symbol>
        {gradient &&
          createElement(
            isLinearGradient ? 'linearGradient' : 'radialGradient',
            {
              id: 'gradient',
              gradientTransform: isLinearGradient ? `rotate(${gradient.rotate})` : undefined,
            },
            gradient.colors.map(({ color, offset }) => <stop key={offset} offset={offset} stopColor={color} />),
          )}
      </defs>
    </svg>
  )
}

// !Note: Must use both href and xlinkHref to link a source
