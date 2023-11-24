'use client';

var QRCode$ = require('./lib/QRCode');
var ErrorCorrectLevel = require('./lib/ErrorCorrectLevel');
import { useEffect, useState } from 'react'
 
type Options = {
  typeNumber?: number
  errorCorrectLevel?: number
  renderer?: 'svg' | 'canvas' | 'table'
}

const generateQR = function(data: string, options?: Options) {
	const qr = new QRCode$(options?.typeNumber || -1, options?.errorCorrectLevel || ErrorCorrectLevel.H);
	qr.addData(data);
	qr.make();
	return qr;
};


export function QRCode({ url, options }: { url: string, options?: Options }) {
  const [blocks, setBlocks] = useState<Array<Array<boolean>>>([])

  useEffect(() => {
    const qr = generateQR(url, options)
    const blocks: Array<Array<boolean>> = qr.modules 
    setBlocks(blocks)
  }, [url, options])
 
  return options?.renderer === 'table' ? (
    <table cellSpacing={0}>
      {blocks.map((row, i) => (
        <tr key={i}>
          {row.map((block, j) => ( 
            <td key={`${i}-${j}`} style={{ background: block ? '#000' : '#fff', width: 3, height: 3 }} />
          ))}
        </tr>
      ))}
    </table>
  ) : options?.renderer === 'canvas' ? (
    <canvas
      width={blocks.length * 5}
      height={blocks.length * 5}
      ref={canvas => {
        if (canvas) {
          const ctx = canvas.getContext('2d')
          if (ctx) {
            blocks.forEach((row, i) => {
              row.forEach((block, j) => {
                ctx.fillStyle = block ? '#000' : '#fff'
                ctx.fillRect(j * 5, i * 5, 5, 5)
              })
            })
          }
        }
      }}
    />
  ) : (
    <svg viewBox={`0 0 ${blocks.length} ${blocks.length}`}>
      {blocks.map((row, i) =>
        row.map((block, j) => (
          <rect key={`${i}-${j}`} x={j} y={i} width={1} height={1} fill={block ? '#000' : '#fff'} />
        ))
      )}
    </svg>
  ) 
}

