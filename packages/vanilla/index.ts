import { getSVGData, Options } from '@qr-x/core'

export type Props = Options & { [key: string]: unknown; parent?: string }

const objectToAtr = (obj: Object) =>
  Object.entries(obj)
    .map(([k, v]) => k + "='" + v + "'")
    .join(' ')

export default function createQRX({ data, level, shapes, gradient: $gradient, fillImage, ...rest }: Props) {
  const { ids, path, length, gradient } = getSVGData({
    data,
    level,
    shapes,
    gradient: $gradient,
    fillImage,
  })

  const stops = gradient?.colors
    ? gradient.colors.map(({ color, offset }) => `<stop offset='${offset}' stop-color='${color}' />`)
    : []

  const defs = gradient
    ? gradient.isLinearGradient
      ? `<linearGradient ${objectToAtr(gradient.attributes)}>${stops}</linearGradient>`
      : `<radialGradient ${objectToAtr(gradient.attributes)}>${stops}</radialGradient>`
    : fillImage
      ? `<pattern id='${ids.image}' patternUnits='userSpaceOnUse' width='100%' height='100%'>
            <image
              x='0'
              y='0'
              width='100%'
              height='100%'
              href='${fillImage}'
              xlink:href='${fillImage}'
              preserveAspectRatio='xMidYMid slice'
            />
        </pattern>`
      : ''

  return `
  <svg width="100%" ${objectToAtr(rest)} viewBox='0 0 ${length} ${length}'>
    <path
      d='${path}'
      fill='${gradient || fillImage ? `url(#${gradient ? `${gradient?.attributes.id}` : ids.image})` : 'currentColor'}' />
    <defs> ${defs} </defs>
   </svg>`
}
