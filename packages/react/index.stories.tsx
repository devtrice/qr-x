import QRX from './'

export const Normal = () => (
  <div className='grid'>
    <QRX data='https://example.com/' />
    <QRX data='https://example.com/' shape='leaf' eyeFrame='leaf' eyeBall='leaf' />
    <QRX data='https://example.com/' shape='circle' eyeBall='circle' eyeFrame='circle' />
    <QRX data='https://example.com/' shape='heart' />
    <QRX data='https://example.com/' shape='diamond' />
    <QRX data='https://example.com/' shape='triangle' />
  </div>
)

export const Smooth = () => (
  <div className='grid'>
    <QRX data='https://example.com/' smooth />
    <QRX data='https://example.com/' shape='circle' smooth />
    <QRX data='https://example.com/' shape='diamond' smooth />
    <QRX data='https://example.com/' shape='heart' smooth />
    <QRX data='https://example.com/' shape='triangle' smooth />
  </div>
)

export default { title: 'React' }
