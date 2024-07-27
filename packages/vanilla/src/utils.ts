type Value = number | string | object | undefined

type Element = HTMLElement | SVGElement | SVGImageElement | SVGSVGElement

type AdditonalAttrs = {
  d?: string
  src?: string
  fill?: string
  offset?: string
  autoplay?: boolean
  'clip-path'?: string
  'stop-color'?: string
}

export type Attr<TElement extends Element> = { [key in keyof TElement]?: TElement[key] extends Value ? Value : never }

const stringifyValue = (value: Exclude<Value, number | undefined>) => {
  return typeof value === 'object'
    ? Object.entries(value)
        .map(([key, value]) => (value ? `${key}: ${value}` : ''))
        .join('; ')
    : value
}

export const $ = (
  tag: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap,
  attrs?: Attr<Element> & AdditonalAttrs,
  isHTML?: boolean,
) => {
  const element = isHTML ? document.createElement(tag) : document.createElementNS('http://www.w3.org/2000/svg', tag)
  for (const key in attrs) {
    //@ts-ignore
    const value = stringifyValue(attrs[key])
    value && element.setAttribute(key.replace('className', 'class'), value)
  }
  return element
}
