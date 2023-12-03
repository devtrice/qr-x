import QRX from '@qr-x/react'
import { Dimensions, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTailwind } from 'tailwind-rn'

const { width, height } = Dimensions.get('window')

const $width = (width - 60) / 2

export default function Index() {
  const tailwind = useTailwind()

  return (
    <SafeAreaView style={{ height }}>
      <View
        style={{
          gap: 20,
          ...tailwind('flex-row flex-wrap px-5 py-2.5 pb-16'),
        }}
      >
        <QRX
          data='https://qr-x.dev'
          style={{ width: $width, height: $width }}
          color='red'
          shapes={{ body: 'square', eyeball: 'square', eyeframe: 'square' }}
        />
        <QRX
          data='https://qr-x.dev'
          style={{ width: $width, height: $width }}
          color='red'
          shapes={{ body: 'circle', eyeball: 'circle', eyeframe: 'circle' }}
        />
        <QRX
          data='https://qr-x.dev'
          style={{ width: $width, height: $width }}
          color='red'
          shapes={{ body: 'diamond', eyeball: 'rounded', eyeframe: 'rounded' }}
        />
        <QRX
          data='https://qr-x.dev'
          style={{ width: $width, height: $width }}
          color='red'
          shapes={{ body: 'leaf', eyeball: 'leaf', eyeframe: 'leaf' }}
        />
        <QRX data='https://qr-x.dev' style={{ width: $width, height: $width }} color='red' shapes={{ body: 'diamond' }} />
        <QRX data='https://qr-x.dev' style={{ width: $width, height: $width }} color='red' shapes={{ body: 'triangle' }} />
      </View>
    </SafeAreaView>
  )
}
