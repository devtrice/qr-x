import QRX from '@qr-x/react'

export default function Page() {
  return (
    <main className='flex items-center justify-center w-screen h-screen'>
      <div className='max-w-2xl w-full flex gap-x-10'>
        <QRX data='https://github.com/devtrice' shape='rect' />
        <QRX data='https://github.com/devtrice' shape='circle' />
      </div>
    </main>
  )
}
