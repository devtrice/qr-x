import QRX from '@qr-x/react-native'
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
        <QRX style={{ width: $width, height: $width }} data='Helloworld' />
        <QRX style={{ width: $width, height: $width }} data='Helloworld' />
        <QRX style={{ width: $width, height: $width }} data='Helloworld' />
        <QRX style={{ width: $width, height: $width }} data='Helloworld' />
      </View>
    </SafeAreaView>
  )
}
