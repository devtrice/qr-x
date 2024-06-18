import '@total-typescript/ts-reset'
import { editorFrameworks } from 'constant'
import { SVGProps as $SVGProps } from 'react'

declare global {
  type SVGProps = $SVGProps<SVGSVGElement>

  type Options = ({ label: string; value: string } | string)[]

  type Framework = (typeof editorFrameworks)[number]
}
