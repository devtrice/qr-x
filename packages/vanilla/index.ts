import { getSVGData, Options } from '@qr-x/core'

export type Props = Options & { [key: string]: unknown; parent?: string }

const objectToAtr = (obj: Object) =>
  Object.entries(obj)
    .filter(([key, value]) => value)
    .map(([k, v]) => k + "='" + v + "'")
    .join(' ')

function camelToHyphenCase(str: string) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

export default function createQRX({ data, level, shapes, gradient, fillImage, ...rest }: Props) {
  const { id, path, cords, length, $gradient } = getSVGData({ data, level, shapes, gradient })

  const stops = $gradient?.colors
    ? $gradient.colors.map(({ color, offset }) => `<stop offset='${offset}' stop-color='${color}' />`)
    : []

  return `
  <svg width='100%' ${objectToAtr(rest)} viewBox='0 0 ${length} ${length}'>
      <g clip-path='url(#${id})'>
        <rect ${objectToAtr(cords)} fill='${$gradient ? `url(#${$gradient.attributes.id})` : 'currentColor'}' />
        ${
          fillImage
            ? `
            <image
              ${objectToAtr(cords)}
              href='${fillImage}'
              xlink:href='${fillImage}'
              preserveAspectRatio='xMidYMid slice'
          />`
            : ''
        }
      </g>
      <defs>
        <clipPath id='${id}'>
          <path d='${path}' />
        </clipPath>
        ${
          $gradient
            ? $gradient.isLinearGradient
              ? `<linearGradient ${objectToAtr($gradient.attributes)}>${stops}</linearGradient>`
              : `<radialGradient ${objectToAtr($gradient.attributes)}>${stops}</radialGradient>`
            : ''
        }
      </defs>
   </svg>`
}
