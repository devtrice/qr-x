<script lang="ts">
  import type { getSVGData } from '@qr-x/core'

  type Return = ReturnType<typeof getSVGData>

  export let ids: Return['ids']
  export let paths: Return['paths']
  export let fills: Return['fills']
  export let markers: Return['markers']
  export let eyeItems: Return['eyeItems']
</script>

<g fill={fills.path}>
  <path d={paths.body} />
  {#each markers as marker}
    {#each eyeItems as item}
      <use href="#{ids[item]}" x={marker.x} y={marker.y} transform={marker.transform} />{/each}
  {/each}
</g>
