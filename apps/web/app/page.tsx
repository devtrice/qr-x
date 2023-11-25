import QRX from '@qr-x/react'

export default function Page() {
  return (
    <main className='flex items-center justify-center w-screen h-screen'>
      <div className='max-w-screen-2xl w-full grid gap-10 grid-cols-4'>
        <QRX data='https://github.com/devtrice' shape='square' />
        <QRX data='https://github.com/devtrice' shape='circle' />
        <QRX data='https://github.com/devtrice' shape='rhombus' />
        <QRX data='https://github.com/devtrice' shape='diamond' />
        <QRX data='https://github.com/devtrice' shape='triangle' />
        <QRX data='https://github.com/devtrice' shape='heart' />
      </div>
    </main>
  )
}
