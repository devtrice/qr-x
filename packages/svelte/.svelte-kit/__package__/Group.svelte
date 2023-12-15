<script>export let ids;
export let paths;
export let fills;
export let markers;
export let eyeItems;
</script>

<g fill={fills.path}>
  <path d={paths.body} />
  {#each markers as marker}
    {#each eyeItems as item}
      <use href="#{ids[item]}" x={marker.x} y={marker.y} transform={marker.transform} />{/each}
  {/each}
</g>
