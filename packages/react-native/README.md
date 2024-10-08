![⌛](https://github.com/devtrice/qr-x/assets/26962987/d97e00b9-ddf1-4af7-b1b4-35cd003492d8)

# Installation

```bash
npm install @qr-x/react-native
```

# Usage

You can also try QR-X in action [here](https://qr-x.devtrice.dev/#playground) or follow the examples below.

## Solid

```tsx
import QRX from '@qr-x/react-native'

function App() {
  return <QRX data='https://qr-x.devtrice.dev' width={400} height={400} color='#0284c7' />
}
```

## Gradient

### Linear Gradient

```tsx
import QRX from '@qr-x/react-native'

function App() {
  return (
    <QRX data='https://qr-x.devtrice.dev' width={400} height={400} gradient={{ colors: ['#f97316', '#f59e0b', '#facc15'] }} />
  )
}
```

### Radial Gradient

```tsx
import QRX from '@qr-x/react-native'

function App() {
  return (
    <QRX
      data='https://qr-x.devtrice.dev'
      width={400}
      height={400}
      gradient={{ type: 'radial', colors: ['#f97316', '#f59e0b', '#facc15'] }}
    />
  )
}
```

## Fill Image

```tsx
import QRX from '@qr-x/react-native'

function App() {
  return (
    <QRX
      data='https://qr-x.devtrice.dev'
      width={400}
      height={400}
      fillImage='https://images.unsplash.com/photo-1682687218608-5e2522b04673'
    />
  )
}
```

## Brand

## Brand Image

```tsx
import QRX from '@qr-x/react-native'

function App() {
  return (
    <QRX
      data='https://qr-x.devtrice.dev'
      width={400}
      height={400}
      brand={{
        src: 'https://images.unsplash.com/photo-1682687218608-5e2522b04673',
        style: { width: 32, height: 32 },
      }}
    />
  )
}
```

## Brand Component

```tsx
import QRX from '@qr-x/react-native'

function App() {
  return (
    <QRX
      data='https://qr-x.devtrice.dev'
      width={400}
      height={400}
      brand={<View style={{ width: 50, height: 50, background: 'red' }} />}
    />
  )
}
```

# Props

| Name             | Type                                                                                | Default    |
| :--------------- | :---------------------------------------------------------------------------------- | :--------- |
| data             | `string`                                                                            |            |
| level            | `'L' \| 'M' \|'Q' \| 'H'`                                                           | `'L'`      |
| shapes.body      | `'square' \| 'circle' \| 'leaf' \| 'rounded' \| 'diamond' \| 'triangle' \| 'heart'` | `'square'` |
| shapes.eyeball   | `'square' \| 'circle' \| 'leaf' \| 'rounded'`                                       | `'square'` |
| shapes.eyeframe  | `'square' \| 'circle' \| 'leaf' \| 'rounded'`                                       | `'square'` |
| gradient.type    | `'linear' \| 'radial'`                                                              |            |
| gradients.colors | `string[] \| {value: string, stop: number}`                                         |            |
| gradients.rotate | `number` (This property only exist if gradient.type is 'radial')                    | `45`       |
| fillImage        | `string`                                                                            |            |
| brand            | `ComponentProps<'img'>` \| `ReactNode`                                              |            |
