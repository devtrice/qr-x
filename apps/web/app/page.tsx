'use client'

import { QRCode } from 'qr-x'

export default function Page(): JSX.Element {
  return (
    <main>
      <QRCode 
        url="https://zeyar.dev" 
        options={{
          renderer: 'svg'
        }}
      />
    </main>
  )
}
