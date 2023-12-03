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
          fillImage='https://images.unsplash.com/photo-1682686581580-d99b0230064e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        />
        <QRX
          data='https://qr-x.dev'
          style={{ width: $width, height: $width }}
          color='red'
          shapes={{ body: 'circle', eyeball: 'circle', eyeframe: 'circle' }}
          fillImage='https://images.unsplash.com/photo-1682686581580-d99b0230064e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        />
        <QRX
          data='https://qr-x.dev'
          style={{ width: $width, height: $width }}
          color='red'
          shapes={{ body: 'diamond', eyeball: 'rounded', eyeframe: 'rounded' }}
          fillImage='https://images.unsplash.com/photo-1682686581580-d99b0230064e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        />
        <QRX
          data='https://qr-x.dev'
          style={{ width: $width, height: $width }}
          color='red'
          shapes={{ body: 'leaf', eyeball: 'leaf', eyeframe: 'leaf' }}
          fillImage='https://images.unsplash.com/photo-1682686581580-d99b0230064e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        />
        <QRX
          data='https://qr-x.dev'
          style={{ width: $width, height: $width }}
          color='red'
          shapes={{ body: 'diamond' }}
          fillImage='https://images.unsplash.com/photo-1682686581580-d99b0230064e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        />
        <QRX
          data='https://qr-x.dev'
          style={{ width: $width, height: $width }}
          color='red'
          shapes={{ body: 'triangle' }}
          fillImage='https://images.unsplash.com/photo-1682686581580-d99b0230064e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        />
      </View>
    </SafeAreaView>
  )
}
