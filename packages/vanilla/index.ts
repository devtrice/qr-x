import { getSVGData, Options } from '@qr-x/core'

export type Props = Options & { [key: string]: unknown; parent?: string }

const objectToAtr = (obj: Object) =>
  Object.entries(obj)
    .map(([k, v]) => k + "='" + v + "'")
    .join(' ')

export default function createQRX({ data, level, shapes, gradient: $gradient, fillImage, ...rest }: Props) {
  const { ids, fills, paths, length, markers, gradient, eyeItems, isMasked } = getSVGData({
    data,
    level,
    shapes,
    gradient: $gradient,
    fillImage,
  })

  const uses = eyeItems.map(item =>
    markers.map(marker => `<use href='#${ids[item]}' xlink:href='#${ids[item]}' ${objectToAtr(marker)}/>`),
  )

  const group = `
    <g fill=${fills.path}>
      <path d='${paths.body}' />
      ${uses}
    </g>`

  const stops = gradient?.colors
    ? gradient.colors.map(({ color, offset }) => `<stop offset='${offset}' stop-color='${color}' />`)
    : []

  const view = gradient
    ? gradient.isLinearGradient
      ? `<linearGradient ${objectToAtr(gradient.attributes)}>${stops}</linearGradient>`
      : `<radialGradient ${objectToAtr(gradient.attributes)}>${stops}</radialGradient>`
    : fillImage
      ? `<pattern id=${ids.image} patternUnits='userSpaceOnUse' width='100%' height='100%'>
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

  const groupView = isMasked
    ? `<g>
          <mask id='mask'>${group}</mask>
          <rect x='0' y='0' width='100%' height='100%' fill=${fills.rect} mask="url('#mask')" />
       </g>`
    : group

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='100%' viewBox='0 0 ${length} ${length}' ${objectToAtr(rest)}>
                ${groupView}
                <defs>
                  ${eyeItems.map(item => `<path id='${ids[item]}' d='${paths[item]}' />`)}
                </defs>
                ${view}
              </svg>`

  return svg
}
