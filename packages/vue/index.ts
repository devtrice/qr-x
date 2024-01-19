import { App } from 'vue'
import QRX from './src/QRX.vue'

export default {
  install: (app: App) => {
    app.component('QRX', QRX)
  },
}
