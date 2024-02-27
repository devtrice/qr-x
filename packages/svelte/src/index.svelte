<script lang="ts">
  import { getSVGData, type Options } from '@qr-x/core'
  import type { SVGAttributes } from 'svelte/elements'

  type Props = SVGAttributes<never> & Options

  interface $$Props extends Props {}

  export let data: Options['data']
  export let level: Options['level'] = undefined
  export let shapes: Options['shapes'] = undefined
  export let gradient: Options['gradient'] = undefined
  export let fillImage: Options['fillImage'] = undefined

  const {
    ids,
    paths,
    length,
    gradient: _gradient,
  } = getSVGData({
    data,
    level,
    shapes,
    gradient,
    fillImage,
  })
</script>

<svg {...$$restProps} viewBox={`0 0 ${length} ${length}`}>
  <g fill={_gradient || fillImage ? `url(#${_gradient ? `${_gradient?.attributes.id}` : ids.image})` : 'currentColor'}>
    <path d={paths.body} />
  </g>

  <defs>
    {#if _gradient}
      <svelte:element this={_gradient.isLinearGradient ? 'linearGradient' : 'radialGradient'} {..._gradient.attributes}>
        {#each _gradient.colors as { color, offset }}
          <stop {offset} stop-color={color} />
        {/each}
      </svelte:element>
    {:else if fillImage}
      <pattern id={ids.image} patternUnits="userSpaceOnUse" width="100%" height="100%">
        <image x="0" y="0" width="100%" height="100%" href={fillImage}  preserveAspectRatio="xMidYMid slice" />
      </pattern>
    {/if}
  </defs>
</svg>
