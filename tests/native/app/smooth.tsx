import QRX from '@qr-x/react-native'
import { View } from 'react-native'

export default function Index() {
  return (
    <View style={{ backgroundColor: 'red', width: 500, height: 500 }}>
      <QRX data='Helloworld' />
      <QRX data='Helloworld' shape='circle' />
    </View>
  )
}
