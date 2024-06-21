![⌛](https://raw.githubusercontent.com/devtrice/qr-x/main/.github/assets/banner.png)

# Installation

```bash
npm install @qr-x/vue
```

# Usage

You can also try QR-X in action [here](#playground) or follow the examples below.

## Solid Background

```tsx
import QRX from '@qr-x/vue'

;<QRX data='Helloworld' color='#0284c7' />
```

## Gradient Background

### Linear Gradient

```tsx
import QRX from '@qr-x/vue'

<QRX
 data="Helloworld"
 :gradient="{
    colors: ['#0ea5e9', '#a3e635', '#34d399']
  }"
/>
```

### Radial Gradient

```tsx
import QRX from '@qr-x/vue'

<QRX
 data="Helloworld"
 :gradient="{
    type: 'radial',
    colors: ['#0ea5e9', '#a3e635', '#34d399']
  }"
/>

```

## Image Background

```tsx
import QRX from '@qr-x/vue'

<QRX
  data="Helloworld"
  fillImage="https://images.unsplash.com photo-1682687218608-5e2522b04673"
/>
}
```

# Props

| Name             | Type                                                             | Default    |
| :--------------- | :--------------------------------------------------------------- | :--------- |
| data             | `string`                                                         |            |
| level            | `'L' \| 'M' \|'Q' \| 'H'`                                        | `'L'`      |
| shapes.body      | `'square' \| 'circle' \| 'leaf' \| 'rounded'`                    | `'square'` |
| shapes.eyeball   | `'square' \| 'circle' \| 'leaf' \| 'rounded'`                    | `'square'` |
| shapes.eyeframe  | `'square' \| 'circle' \| 'leaf' \| 'rounded'`                    | `'square'` |
| gradient.type    | `'linear' \| 'radial'`                                           |            |
| gradients.colors | `string[] \| {value: string, stop: number}`                      |            |
| gradients.rotate | `number` (This property only exist if gradient.type is 'radial') | `45`       |
| fillImage        | `string`                                                         |            |
