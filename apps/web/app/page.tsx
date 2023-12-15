'use client'

import { useEffect, useRef } from 'react';
import QRCode from 'qr-x';

export default function Page(): JSX.Element {
  const ref = useRef(null);
  useEffect(() => {
    if(typeof window === 'undefined') {
      console.log('QRCode', 'sdfsd');
      QRCode(ref.current, {
        useSVG: true,
      })
    };
  }, [])
  return (
    <main>
      <div ref={ref} />
    </main>
  );
}
