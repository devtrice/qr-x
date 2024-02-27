import { App } from 'vue'
import QRX from './index.vue'

export default {
  install: (app: App) => {
    app.component('QRX', QRX)
  },
}
