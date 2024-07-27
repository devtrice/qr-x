<script setup lang="ts">
import QRX from '@qr-x/vue'
import {
  meta,
  data,
  video,
  BrandImage,
  Default,
  FillImage,
  LinearGradient,
  RadialGradient,
  renderMultiple,
} from '@common/stories'

const scenarios = [Default, FillImage, LinearGradient, RadialGradient, BrandImage].map(scenario => scenario.args) as any[]
</script>

<template>
  <div class="root">
    <template v-for="scenario in scenarios">
      <QRX v-bind="scenario" />
    </template>

    <QRX :data="data">
      <template v-slot:brand>
        <video
          src="https://videos.pexels.com/video-files/8333185/8333185-hd_1080_1080_30fps.mp4"
          :style="{ width: '2.5rem', height: '2.5rem', border: '2px solid white', borderRadius: '50%' }"
          muted
          autoplay
        />
      </template>
    </QRX>
  </div>
</template>

<style scoped>
.root {
  gap: 2.5rem;
  display: grid;
  padding: 2.5rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
</style>
