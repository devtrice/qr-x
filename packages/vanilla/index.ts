import { getSVGData, Options } from '@qr-x/core'

export type Props = Options & { [key: string]: unknown; parent?: string }
// TODO: Typecast the { [key: string]: unknown } to intellisense the svg DOM attributes

export default function createQRX({ data, level, shapes, image, gradient: $gradient, fillImage, ...rest }: Props) {
  // Your codes here
  // Rendering logics can be found at packages/react/index.tsx
  // This function should return the svg element.
  // If `parent` element exist render inside that element.

  const { ids, fills, paths, length, markers, gradient, eyeItems, isMasked } = getSVGData({
    data,
    level,
    image,
    shapes,
    gradient: $gradient,
    fillImage,
  })

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

  return svg
}
