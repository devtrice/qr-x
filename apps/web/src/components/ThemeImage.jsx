import Image from 'next/image'

export const ThemeImage = ({ darkSrc, lightSrc, width, height, alt }) => {
  return (
    <>
      <Image
          className='hidden dark:block'
          src={darkSrc}
          alt={alt}
          width={width}
          height={height}
      />
      <Image
          className='block dark:hidden'
          src={lightSrc}
          alt={alt}
          width={width}
          height={height}
      />
    </>
  );
};