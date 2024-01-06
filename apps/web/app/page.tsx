import QRX from '@qr-x/react'
import Image from 'next/image'

export default function Home() {
  return (
   <main className='bg-white text-black max-w-sm mx-auto p-4'>

    <QRX data='helloworld' />
   </main>
  )
}
