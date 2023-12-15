import { Options } from '@qr-x/core';
export type Props = Options & {
    [key: string]: unknown;
    parent?: string;
};
export default function createQRX({ data, level, shapes, image, gradient: $gradient, fillImage, ...rest }: Props): SVGSVGElement;
