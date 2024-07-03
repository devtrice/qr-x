<script lang="ts">
  import type { Options } from '@qr-x/core'
  import { getSVGData } from '@qr-x/core'
  import type { SVGAttributes } from 'svelte/elements'

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
  })
  $: length = svgData.length
  $: _gradient = svgData.$gradient
</script>

<svg width="100%" {...$$props} viewBox={`0 0 ${length} ${length}`}>
  <g clip-path={`url(#${svgData.id})`}>
    <rect {...svgData.cords} fill={_gradient ? `url(#${_gradient.attributes.id})` : 'currentColor'} />
    {#if fillImage}
      <image {...svgData.cords} href={fillImage} xlink:href={fillImage} preserveAspectRatio="xMidYMid slice" />
    {/if}
  </g>

  <defs>
    <clipPath id={svgData.id}>
      <path d={svgData.path} />
    </clipPath>
    {#if _gradient}
      <svelte:element this={_gradient.isLinearGradient ? 'linearGradient' : 'radialGradient'} {..._gradient.attributes}>
        {#each _gradient.colors as { color, offset }}
          <stop {offset} stop-color={color} />
        {/each}
      </svelte:element>
    {/if}
  </defs>
</svg>
