import { bodyShapes, eyeballShapes, eyeframeShapes } from './src/shapes';
type Shapes = {
    body: keyof typeof bodyShapes;
    eyeball?: keyof typeof eyeballShapes;
    eyeframe?: keyof typeof eyeframeShapes;
};
type Gradient = ({
    type?: 'linear';
    rotate?: number;
} | {
    type: 'radial';
    rotate?: never;
}) & {
    colors: string[];
};
export type Options = {
    data: string;
    image?: {
        src: string;
        size: number;
    };
    level?: 'L' | 'M' | 'Q' | 'H';
    shapes?: Shapes;
    gradient?: Gradient;
    fillImage?: string;
    logo?: {
        src: string;
    };
};
export declare function getSVGData({ data, shapes, image, gradient, fillImage, ...options }: Options): {
    ids: {
        image: string;
        eyeball: string;
        eyeframe: string;
        gradient: string;
    };
    paths: {
        body: string;
        eyeball: string;
        eyeframe: string;
    };
    fills: {
        rect: string;
        path: string;
    };
    length: number;
    markers: ({
        x: number;
        y: number;
        transform?: undefined;
    } | {
        x: number;
        y: number;
        transform: string;
    })[];
    isMasked: string | Gradient | undefined;
    eyeItems: readonly ["eyeball", "eyeframe"];
    gradient: {
        colors: {
            color: string;
            offset: string;
        }[];
        attributes: {
            id: string;
            gradientTransform: string | undefined;
        };
        isLinearGradient: boolean;
    } | undefined;
};
export {};
