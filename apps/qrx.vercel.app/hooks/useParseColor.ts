import { useColorPicker } from 'react-best-gradient-color-picker'

export default function useParseColor(color = '#000') {
  const { getGradientObject } = useColorPicker(color, () => {})
  const { isGradient, gradientType, colors, degrees } = getGradientObject() || {}

  return isGradient
    ? {
        gradient: {
          type: (gradientType || '').replace('-gradient', '') as 'linear',
          rotate: parseInt((degrees || '').replace('deg', '')),
          colors: colors.map(({ value, left }: any) => ({ value, stop: left })),
        },
      }
    : { color }
}
