<script>import { getSVGData } from "@qr-x/core";
import Group from "./Group.svelte";
export let data;
export let level = void 0;
export let image = void 0;
export let shapes = void 0;
export let gradient = void 0;
export let fillImage = void 0;
const {
  ids,
  fills,
  paths,
  length,
  markers,
  gradient: _gradient,
  eyeItems,
  isMasked
} = getSVGData({
  data,
  level,
  image,
  shapes,
  gradient,
  fillImage
});
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
