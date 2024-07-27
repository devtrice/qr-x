import { getSVGData, Options } from '@qr-x/core'
import { $, Attr } from './src/utils'

type Props = Options & Attr<SVGSVGElement> & { brand?: Attr<HTMLImageElement> | Element }

export default function createQRX({ data, level, brand, shapes, gradient, fillImage, ...rest }: Props) {
  const { id, path, cords, length, $gradient } = getSVGData({ data, level, shapes, gradient })

  const $id = (rest.id || `qrx-${id}`) as string
  const svg = $('svg', { ...rest, id: $id, width: '100%', viewBox: `0 0 ${length} ${length}` })
  const svgG = $('g', { 'clip-path': `url(#${id})` })
  const svgDefs = $('defs')
  const svgRect = $('rect', { ...cords, fill: $gradient ? `url(#${$gradient.attributes.id})` : 'currentColor' })
  const svgClip = $('clipPath', { id })
  const svgPath = $('path', { d: path })

  svg.appendChild(svgG)
  svg.appendChild(svgDefs)
  svgG.appendChild(svgRect)
  svgDefs.appendChild(svgClip)
  svgClip.appendChild(svgPath)

  if (brand) {
    setTimeout(() => {
      const svg = document.getElementById($id)

      if (svg) {
        const { width, height } = svg.getBoundingClientRect()
        const svgForeignObject = $('foreignObject', cords)
        const nestedSvg = $('svg', { viewBox: `0 0 ${width} ${height}` })
        const nestedForeignObject = $('foreignObject', { ...cords, style: { overflow: 'hidden' } })

        const divElement = $(
          'div',
          {
            style: {
              width: `${width}px`,
              height: `${height}px`,
              display: 'flex',
              'align-items': 'center',
              'justify-content': 'center',
            },
          },
          true,
        )

        divElement.append(brand instanceof HTMLElement ? brand : $('img', brand as never, true))

        nestedForeignObject.appendChild(divElement)
        nestedSvg.appendChild(nestedForeignObject)
        svgForeignObject.appendChild(nestedSvg)
        svg.appendChild(svgForeignObject)
      }
    }, 0)
  }

  if (fillImage) {
    const svgImage = $('image', { ...cords, href: fillImage, preserveAspectRatio: 'xMidYMid slice' })
    svgG.appendChild(svgImage)
  }

  if ($gradient) {
    const svgGrad = $($gradient.isLinearGradient ? 'linearGradient' : 'radialGradient', $gradient.attributes)
    $gradient.colors.forEach(({ color, offset }) => svgGrad.appendChild($('stop', { offset, 'stop-color': color })))
    svgDefs.appendChild(svgGrad)
  }

  return svg
}
