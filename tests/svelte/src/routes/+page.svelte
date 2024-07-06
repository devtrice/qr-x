<script lang="ts">
  import QRX from '@qr-x/svelte'
  import {
    meta,
    data,
    video,
    BrandImage,
    BrandImageCustom,
    Default,
    FillImage,
    LinearGradient,
    RadialGradient,
    renderMultiple,
  } from '@common/stories/index'

  const scenarios = [FillImage, LinearGradient, RadialGradient, BrandImage, BrandImageCustom].map(
    scenario => scenario.args,
  ) as any[]
</script>

<div class="root">
  {#each scenarios as scenario}
    <QRX {...scenario} />
  {/each}

  <QRX {data}>
    <video
      src="https://videos.pexels.com/video-files/8333185/8333185-hd_1080_1080_30fps.mp4"
      slot="brand"
      style="width: 2.5rem; height: 2.5rem; border: 2px solid white; border-radius: 50%;"
      muted
      autoplay
    ></video>
  </QRX>
</div>

<style>
  .root {
    gap: 2.5rem;
    display: grid;
    padding: 2.5rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
</style>
