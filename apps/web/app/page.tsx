'use client'

import { QRCode } from 'qr-x'

export default function Page(): JSX.Element {
  return (
    <main>
      <QRCode
        url="https://zeyar.dehsdflkjahsdkjfhaksjdhfjkahsd34234234234234123423423423541345345345
        kjfhaskdhfalkjdsfjdsfasdjfhakljsdhfkjahsdfkahsdkfhaksjdhfkajv345345345345345345345345"
        options={{
          renderer: 'svg'
        }}
      />
    </main>
  )
}
