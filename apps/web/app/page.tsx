import QRX from '@qr-x/react'

export default function Page() {
  return (
    <main className='flex items-center justify-center w-screen h-screen'>
      <div className='max-w-screen-2xl w-full grid gap-10 grid-cols-4'>
        <QRX
          data={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus faucibus in augue a porttitor. Donec tincidunt, sapien nec ultricies finibus, nulla metus dictum sem, non scelerisque sapien lacus quis libero. Donec blandit sit amet ipsum a molestie. Morbi sit amet tortor libero. Vivamus in dolor elit. Praesent ultrices sem efficitur lorem aliquam, nec placerat mauris hendrerit.`}
          shape='square'
        />
        <QRX data='https://github.com/devtrice' shape='circle' eyeBall='circle' foregroundColor='#FF0000' />
        <QRX data='https://github.com/devtrice' shape='circle' eyeBall='circle' foregroundColor='rgb(0, 94, 255)' />
        <QRX data='https://github.com/devtrice' shape='circle' eyeBall='circle' foregroundColor='rgb(0, 94, 255)' />
        <div
          style={{
            background: 'red',
          }}
        >
          <QRX data='https://github.com/devtrice' shape='diamond' />
        </div>
        <QRX data='https://github.com/devtrice' shape='triangle' />
        <QRX data='https://github.com/devtrice' shape='heart' eyeBall='circle' />
        <QRX data='https://github.com/devtrice' shape='heart' eyeBall='circle' foregroundColor='rgb(200, 13, 50)' />
      </div>
    </main>
  )
}
