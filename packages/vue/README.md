![⌛](https://github.com/devtrice/qr-x/assets/26962987/d97e00b9-ddf1-4af7-b1b4-35cd003492d8)

# Installation

```bash
npm install @qr-x/vue
```

# Usage

You can also try QR-X in action [here](https://qr-x.devtrice.dev/#playground) or follow the examples below.

## Solid

```vue
<script>
import QRX from '@qr-x/vue'
</script>

<template>
  <QRX data="qr-x.devtrice.dev" color="#0284c7" />
</template>
```

## Gradient

### Linear Gradient

```vue
<script>
import QRX from '@qr-x/vue'
</script>

<template>
  <QRX
    data="qr-x.devtrice.dev"
    :gradient="{
      colors: ['#f97316', '#f59e0b', '#facc15'],
    }"
  />
</template>
```

### Radial Gradient

```vue
<script>
import QRX from '@qr-x/vue'
</script>

<template>
  <QRX
    data="qr-x.devtrice.dev"
    :gradient="{
      type: 'radial',
      colors: ['#f97316', '#f59e0b', '#facc15'],
    }"
  />
</template>
```

## Fill Image

```vue
<script>
import QRX from '@qr-x/vue'
</script>

<template>
  <QRX data="qr-x.devtrice.dev" fillImage="https://images.unsplash.com photo-1682687218608-5e2522b04673" />
</template>
```

## Brand

## Brand Image

```vue
<script>
  import QRX from '@qr-x/vue'
</script>

<QRX
  data="qr-x.devtrice.dev"
  brand={{ src: 'https://images.unsplash.com/photo-1682687218608-5e2522b04673', style: 'width: 4rem; height: 4rem' }}
/>
```

## Brand Component

```vue
<script>
import QRX from '@qr-x/vue'
</script>

<QRX data="qr-x.devtrice.dev">
  <template v-slot:brand>
    <video
      src="https://videos.pexels.com/video-files/8333185/8333185-hd_1080_1080_30fps.mp4"
      :style="{ width: '2.5rem', height: '2.5rem', border: '2px solid white', borderRadius: '50%' }"
      muted
      autoplay
    />
  </template>
</QRX>
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
| brand            | `ImgHTMLAttributes`                                              |            |
