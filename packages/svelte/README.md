![⌛](https://github.com/devtrice/qr-x/assets/26962987/d97e00b9-ddf1-4af7-b1b4-35cd003492d8)

# Installation

```bash
npm install @qr-x/svelte
```

# Usage

You can also try QR-X in action [here](https://qr-x.devtrice.dev/#playground) or follow the examples below.

## Solid

```svelte
<script>
  import QRX from '@qr-x/svelte'
</script>

<QRX data="https://qr-x.devtrice.dev" color="#0ea5e9" />
```

## Gradient

### Linear Gradient

```svelte
<script>
  import QRX from '@qr-x/svelte'
</script>

<QRX
  data="https://qr-x.devtrice.dev"
  gradient={{
    type: 'linear',
    colors: ['#f97316', '#f59e0b', '#facc15'],
  }}
/>
```

### Radial Gradient

```svelte
<script>
  import QRX from '@qr-x/svelte'
</script>

<QRX
  data="https://qr-x.devtrice.dev"
  gradient={{
    type: 'radial',
    colors: ['#f97316', '#f59e0b', '#facc15'],
  }}
/>
```

## Fill Image

```svelte
<script>
  import QRX from '@qr-x/svelte'
</script>

<QRX data="https://qr-x.devtrice.dev" fillImage="https://images.unsplash.com/photo-1682687218608-5e2522b04673" />
```

## Brand

## Brand Image

```svelte
<script>
  import QRX from '@qr-x/svelte'
</script>

<QRX
  data="https://qr-x.devtrice.dev"
  brand={{ src: 'https://images.unsplash.com/photo-1682687218608-5e2522b04673', style: 'width: 4rem; height: 4rem' }}
/>
```

## Brand Component

```svelte
<script>
  import QRX from '@qr-x/svelte'
</script>

<QRX data="https://qr-x.devtrice.dev">
  <video
    slot="brand"
    src="https://videos.pexels.com/video-files/8333185/8333185-hd_1080_1080_30fps.mp4"
    style="width: 2.5rem; height: 2.5rem; border: 2px solid white; border-radius: 50%;"
    muted
    autoplay
  ></video>
</QRX>
```

# Props

| Name             | Type                                                             | Default    |
| :--------------- | :--------------------------------------------------------------- | :--------- |
| data             | `string`                                                         |            |
| level            | `"L" \| "M" \|"Q" \| "H"`                                        | `"L"`      |
| shapes.body      | `"square" \| "circle" \| "leaf" \| "rounded"`                    | `"square"` |
| shapes.eyeball   | `"square" \| "circle" \| "leaf" \| "rounded"`                    | `"square"` |
| shapes.eyeframe  | `"square" \| "circle" \| "leaf" \| "rounded"`                    | `"square"` |
| gradient.type    | `"linear" \| "radial"`                                           |            |
| gradients.colors | `string[] \| {value: string, stop: number}`                      |            |
| gradients.rotate | `number` (This property only exist if gradient.type is "radial") | `45`       |
| fillImage        | `string`                                                         |            |
| brand            | `HTMLImgAttributes`                                              |            |
