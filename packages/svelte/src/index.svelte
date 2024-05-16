<script lang="ts">
  import qrXCore from '@qr-x/core'
  import type { Options } from '@qr-x/core'
  import type { SVGAttributes } from 'svelte/elements'

  const { getSVGData }= qrXCore;

  type Props = SVGAttributes<never> & Options

  interface $$Props extends Props {}

  export let data: Options['data']
  export let level: Options['level'] = undefined
  export let shapes: Options['shapes'] = undefined
  export let gradient: Options['gradient'] = undefined
  export let fillImage: Options['fillImage'] = undefined

  $: svgData = getSVGData({
    data,
    level,
    shapes,
    gradient,
    fillImage,
  })
  $: length = svgData.length
  $: _gradient = svgData.gradient
</script>

<svg width="100%" {...$$props} viewBox={`0 0 ${length} ${length}`}>
  <path
    d={svgData.path}
    fill={_gradient || fillImage ? `url(#${_gradient ? `${_gradient?.attributes.id}` : svgData.ids.image})` : 'currentColor'}
  />

  <defs>
    {#if _gradient}
      <svelte:element this={_gradient.isLinearGradient ? 'linearGradient' : 'radialGradient'} {..._gradient.attributes}>
        {#each _gradient.colors as { color, offset }}
          <stop {offset} stop-color={color} />
        {/each}
      </svelte:element>
    {:else if fillImage}
      <pattern id={svgData.ids.image} patternUnits="userSpaceOnUse" width="100%" height="100%">
        <image
          x="0"
          y="0"
          width="100%"
          height="100%"
          href={fillImage}
          xlink:href={fillImage}
          preserveAspectRatio="xMidYMid slice"
        />
      </pattern>
    {/if}
  </defs>
</svg>
