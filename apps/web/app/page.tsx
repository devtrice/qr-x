import QRX from '@qr-x/react'

export default function Page() {
  return (
    <main className='flex items-center justify-center w-screen h-screen'>
      <div className='max-w-sm w-full flex gap-x-10'>
        <QRX data='helloworld' path='rect' />
        <QRX data='helloworld' path='circle' />
      </div>
    </main>
  )
}
