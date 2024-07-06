<script lang="ts">
  import type { Options } from '@qr-x/core'
  import { getSVGData } from '@qr-x/core'
  import { onMount } from 'svelte'
  import type { HTMLImgAttributes, SVGAttributes } from 'svelte/elements'
  import { writable } from 'svelte/store'

  type Props = SVGAttributes<never> & Options & { brand?: HTMLImgAttributes }

  interface $$Props extends Props {}

  export let data: Props['data']
  export let level: Props['level'] = undefined
  export let brand: Props['brand'] = undefined
  export let shapes: Props['shapes'] = undefined
  export let gradient: Props['gradient'] = undefined
  export let fillImage: Props['fillImage'] = undefined

  let ele: SVGSVGElement
  const size = writable({ width: 0, height: 0 })
  $: ({ id, path, cords, length, $gradient: _gradient } = getSVGData({ data, level, shapes, gradient }))

  onMount(() => {
    const { width, height } = ele.getBoundingClientRect()
    size.set({ width, height })
  })
</script>

<svg bind:this={ele} width="100%" {...$$restProps} viewBox={`0 0 ${length} ${length}`}>
  <g clip-path={`url(#${id})`}>
    <rect {...cords} fill={_gradient ? `url(#${_gradient.attributes.id})` : 'currentColor'} />
    {#if fillImage}
      <image {...cords} href={fillImage} xlink:href={fillImage} preserveAspectRatio="xMidYMid slice" />
    {/if}
  </g>

  {#if (brand || $$slots.brand) && $size.width > 0}
    <foreignObject {...cords}>
      <svg viewBox={`0 0 ${$size.width} ${$size.height}`}>
        <foreignObject {...cords} style="overflow: visible">
          <div
            style="width: {$size.width}px; height: {$size.height}px; display: flex; align-items: center; justify-content: center;"
          >
            {#if brand}
              <img alt="" {...brand} />
            {:else}
              <slot name="brand" />
            {/if}
          </div>
        </foreignObject>
      </svg>
    </foreignObject>
  {/if}

  <defs>
    <clipPath {id}>
      <path d={path} />
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
