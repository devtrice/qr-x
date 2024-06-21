![⌛](https://raw.githubusercontent.com/devtrice/qr-x/main/.github/assets/banner.png)

# Installation

```bash
npm install @qr-x/vanilla
```

# Usage

You can also try QR-X in action [here](#playground) or follow the examples below.

## Solid Background

```ts
import createQRX from "@qr-x/vanilla"

const qrx = createQRX({
  data: 'https://qrx.vercel.app',
  color: '#0284c7',
  shapes: { 
    body: 'square', 
    eyeball: 'square', 
    eyeframe: 'square' 
  },
})

const qrContainer = document.getElementById('qr-container')
qrContainer.innerHTML = qrx
```

## Gradient Background

### Linear Gradient

```ts
import createQRX from "@qr-x/vanilla"

const qrx = createQRX({
  data: 'https://qrx.vercel.app',
  gradient: {
    colors: ['#0ea5e9', '#a3e635', '#34d399'] 
  },
})

const qrContainer = document.getElementById('qr-container')
qrContainer.innerHTML = qrx
```

### Radial Gradient

```ts
import createQRX from "@qr-x/vanilla"

const qrx = createQRX({
  data: 'https://qrx.vercel.app',
  gradient: {
    type: 'radial', 
    colors: ['#0ea5e9', '#a3e635', '#34d399'] 
  }
})

const qrContainer = document.getElementById('qr-container')
qrContainer.innerHTML = qrx
```

## Image Background

```ts
import createQRX from "@qr-x/vanilla"

const qrx = createQRX({
  data: 'https://qrx.vercel.app',
  fillImage: 'https://images.unsplash.com/photo-1682687218608-5e2522b04673'
})

const qrContainer = document.getElementById('qr-container')
qrContainer.innerHTML = qrx
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
