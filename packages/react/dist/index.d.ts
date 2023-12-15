import { Options } from '@qr-x/core';
import React from 'react';
import { SvgProps } from './tags/';
type Props = Options & SvgProps;
export default function QRX({ data, level, shapes, image, gradient: $gradient, fillImage, ...rest }: Props): React.JSX.Element;
export {};
