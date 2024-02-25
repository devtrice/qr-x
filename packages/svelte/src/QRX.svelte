<script lang="ts">
  import { getSVGData, type Options } from '@qr-x/core'
  import type { SVGAttributes } from 'svelte/elements'
  import Group from './Group.svelte'

  type Props = SVGAttributes<never> & Options

  interface $$Props extends Props {}

  export let data: Options['data']
  export let level: Options['level'] = undefined
  export let shapes: Options['shapes'] = undefined
  export let gradient: Options['gradient'] = undefined
  export let fillImage: Options['fillImage'] = undefined

  const {
    ids,
    fills,
    paths,
    length,
    markers,
    gradient: _gradient,
    eyeItems,
    isMasked,
  } = getSVGData({
    data,
    level,
    shapes,
    gradient,
    fillImage,
  })
</script>

<svg width="100%" {...$$restProps} viewBox={`0 0 ${length} ${length}`}>
  {#if isMasked}
    <g>
      <mask id="mask"> <Group {ids} {paths} {fills} {markers} {eyeItems} /></mask>
      <rect x="0" y="0" width="100%" height="100%" fill={fills.rect} mask="url('#mask')" />
    </g>
  {:else}
    <Group {ids} {paths} {fills} {markers} {eyeItems} />
  {/if}

  <defs>
    {#each eyeItems as item}
      <path id={ids[item]} d={paths[item]} />
    {/each}

    {#if _gradient}
      <svelte:element this={_gradient.isLinearGradient ? 'linearGradient' : 'radialGradient'} {..._gradient.attributes}>
        {#each _gradient.colors as { color, offset }}
          <stop {offset} stop-color={color} />
        {/each}
      </svelte:element>
    {:else if fillImage}
      <pattern id={ids.image} patternUnits="userSpaceOnUse" width="100%" height="100%">
        <image href={fillImage} x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
      </pattern>
    {/if}
  </defs>
</svg>
