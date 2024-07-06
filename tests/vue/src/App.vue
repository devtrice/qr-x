<script setup lang="ts">
import QRX from '@qr-x/vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <QRX
        data="https://qr-x.devtrice.dev"
        :brand="{
          src: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=40',
          width: 40,
          height: 40,
          style: { border: '2px solid white', borderRadius: '50%' },
        }"
      />

      <QRX data="https://qr-x.devtrice.dev" color="#6366f1">
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
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.wrapper > * {
  width: 200px;
  aspect-ratio: 1/1;
}
</style>
