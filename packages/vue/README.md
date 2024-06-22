![⌛](https://github.com/devtrice/qr-x/assets/26962987/d97e00b9-ddf1-4af7-b1b4-35cd003492d8)

# Installation

```bash
npm install @qr-x/vue
```

# Usage

You can also try QR-X in action [here](https://qr-x.devtrice.dev/#playground) or follow the examples below.

## Solid Background

```ts
import QRX from '@qr-x/vue'

<QRX data='Helloworld' color='#0284c7' />
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
