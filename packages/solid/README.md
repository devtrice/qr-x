![⌛](https://github.com/devtrice/qr-x/assets/26962987/d97e00b9-ddf1-4af7-b1b4-35cd003492d8)

# Installation

```bash
npm install @qr-x/solid
```

# Usage

You can also try QR-X in action [here](https://qr-x.devtrice.dev/#playground) or follow the examples below.

## Solid Background

```tsx
import QRX from '@qr-x/solid'

function App() {
  return <QRX data='Helloworld' color='#0284c7' />
}
```

## Gradient Background

### Linear Gradient

```tsx
import QRX from '@qr-x/solid'

function App() {
  return <QRX data='Helloworld' gradient={{ colors: ['#0ea5e9', '#a3e635', '#34d399'] }} />
}
```

### Radial Gradient

```tsx
import QRX from '@qr-x/solid'

function App() {
  return <QRX data='Helloworld' gradient={{ type: 'radial', colors: ['#0ea5e9', '#a3e635', '#34d399'] }} />
}
```

## Image Background

```tsx
import QRX from '@qr-x/solid'

function App() {
  return <QRX data='Helloworld' fillImage='https://images.unsplash.com/photo-1682687218608-5e2522b04673' />
}
```

## Brand

## Brand Image

```tsx
import QRX from '@qr-x/solid'

function App() {
  return <QRX data='qr-x.devtrice.dev' brand='https://images.unsplash.com/photo-1682687218608-5e2522b04673' />
}
```

## Brand Image with custom attributes

```tsx
import QRX from '@qr-x/solid'

function App() {
  return (
    <QRX
      data='qr-x.devtrice.dev'
      brand={{
        src: 'https://images.unsplash.com/photo-1682687218608-5e2522b04673',
        alt: '...',
        style: { width: '4rem', height: '4rem' },
      }}
    />
  )
}
```

## Brand Component

```tsx
import QRX from '@qr-x/solid'

function App() {
  return (
    <QRX
      data='qr-x.devtrice.dev'
      brand={
        <video
          src='https://videos.pexels.com/video-files/8333185/8333185-hd_1080_1080_30fps.mp4'
          style={{ width: '2.5rem', height: '2.5rem', border: '2px solid white', 'border-radius': '50%' }}
          muted
          autoplay
        />
      }
    />
  )
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
| brand            | `string` \| `ComponentProps<'img'>` \| `JSX.Element`             |            |
| brand.width      | `string` \| `number`                                             | `28`       |
| brand.height     | `string` \| `number`                                             | `28`       |
