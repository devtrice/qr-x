import React, { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement>

export type SvgProps = Props

export const G = (props: Props) => <g {...props} />

export const Svg = (props: Props) => <svg xmlns='http://www.w3.org/2000/svg' width='100%' {...props} />

export const Use = (props: SVGProps<SVGUseElement>) => <use {...props} />

export const Path = (props: SVGProps<SVGPathElement>) => <path {...props} />

export const Rect = (props: SVGProps<SVGRectElement>) => <rect {...props} />

export const Defs = (props: SVGProps<SVGDefsElement>) => <defs {...props} />

export const Mask = (props: SVGProps<SVGMaskElement>) => <mask {...props} />

export const Stop = (props: SVGProps<SVGStopElement>) => <stop {...props} />

export const Image = (props: SVGProps<SVGImageElement>) => <image {...props} />

export const Symbol = (props: SVGProps<SVGSymbolElement>) => <symbol {...props} />

export const Pattern = (props: SVGProps<SVGPatternElement>) => <pattern {...props} />

export const LinearGradient = (props: SVGProps<SVGLinearGradientElement>) => <linearGradient {...props} />

export const RadialGradient = (props: SVGProps<SVGRadialGradientElement>) => <radialGradient {...props} />
