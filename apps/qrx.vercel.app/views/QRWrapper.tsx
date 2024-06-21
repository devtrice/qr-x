import React from 'react'

type Props = { children: React.ReactNode; color: string }

export default function QRWrapper({ children, color }: Props) {
  return (
    <svg id='qr-code' xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 448 480' fill='none'>
      <g>
        <g xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M424 0H24C10.745 0 0 10.745 0 24v432c0 13.255 10.745 24 24 24h400c13.255 0 24-10.745 24-24V24c0-13.255-10.745-24-24-24'
            fill='#F2F2F2'
          />
          <foreignObject xmlns='http://www.w3.org/2000/svg' x='26' y='26' width='88%' height='88%'>
            {children}
          </foreignObject>
          <path d='M0 446h448v14c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20z' fill={color} />
          <text
            x='50%'
            y='97%'
            textAnchor='middle'
            dominantBaseline='Auto'
            fontFamily='Arial, sans-serif'
            fill='white'
            fontSize='0.7rem'
          >
            Powered by QRX
          </text>
        </g>
      </g>
    </svg>
  )
}
