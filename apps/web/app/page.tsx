'use client'

import QRCode from 'qr-x'
import { useEffect, useRef } from 'react'

export default function Page(): JSX.Element {
  const ref = useRef(null)

  useEffect(() => {
    console.log(QRCode('https://staging.trifectasingapore.com/'))
  }, [])

  return (
    <main>
      <div id='bingo' ref={ref}></div>
    </main>
  )
}
