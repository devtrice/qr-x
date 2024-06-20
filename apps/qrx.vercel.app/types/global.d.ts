import '@total-typescript/ts-reset'
import { SVGProps as $SVGProps } from 'react'

declare global {
  type SVGProps = $SVGProps<SVGSVGElement>

  type Options = ({ label: string; value: string } | string)[]
}

//documentToSVG, elementToSVG, inlineResources, formatXML
declare module 'dom-to-svg' {
  export function documentToSVG(document: any): Node
  export function elementToSVG(element: any): Node & { documentElement: any }
  export function inlineResources(svg: any): string
  export function formatXML(xml: any): string
}
