import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from './../../../tailwind.config'
import { remToPx } from '../utils/misc.js'

export const fullConfig = resolveConfig(tailwindConfig)

/* HEX TO RGB */
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  let rgb = ''

  if (result) {
    rgb = 'rgb(' + parseInt(result[1], 16) + ',' + parseInt(result[2], 16) + ',' + parseInt(result[3], 16) + ')'
  }

  return rgb
}

/* HEX TO HSL */
const hexToHsl = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  let hsl = ''
  let r = null
  let g = null
  let b = null

  if (result) {
    r = parseInt(result[1], 16)
    g = parseInt(result[2], 16)
    b = parseInt(result[3], 16)

    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = null
    let s = null
    const l = (max + min) / 2

    if (max === min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }
    hsl = 'hsl(' + Math.floor(h * 360) + ', ' + Math.floor(s * 100) + '%, ' + Math.floor(l * 100) + '%)'

    return hsl
  }
}

/* Spacing Demo - Foundation section */
export const createSpacingObjectDemo = () => {
  const spacing = fullConfig.theme.spacing

  const spacingDemo = Object.keys(spacing)
    .reduce((acc, key) => {
      if (key !== '0' && key !== 'px') {
        const demo = {
          name: key,
          size: spacing[key],
          pixels: remToPx(spacing[key].replace('rem', ''), true)
        }

        return [...acc, demo]
      }

      return acc
    }, [])
    .sort((a, b) => a.name - b.name)

  return spacingDemo
}

/* Typography Demo - Foundation section */
export const createTypographyObjectDemo = () => {
  const {
    fontFamily,
    fontWeight,
    fontSize
  } = fullConfig.theme

  /* Font Family */
  const fontFamilyDemo = Object.keys(fontFamily)
    .map((key) => ({
      name: key,
      value: fontFamily[key].join(',')
    }))
    .sort((a, b) => a.name - b.name)

  /* Font Weight */
  const fontWeightDemo = Object.keys(fontWeight)
    .map((key) => ({
      name: key,
      value: fontWeight[key]
    }))
    .sort((a, b) => a.value - b.value)

  /* Font Size */
  const fontSizeDemo = Object.keys(fontSize)
    .map((key) => ({
      name: key,
      value: fontSize[key],
      valueWithoutText: fontSize[key].replace('rem', '').replace('px', '')
    }))
    .sort((a, b) => a.valueWithoutText - b.valueWithoutText)

  return {
    fontFamily: fontFamilyDemo,
    fontWeight: fontWeightDemo,
    fontSize: fontSizeDemo
  }
}

/* Colors Demo - Foundation section */
export const createColorsObjectDemo = () => {
  const colorsStatus = fullConfig.theme.colors.status
  const colorsGrays = fullConfig.theme.colors.gray
  const colors = fullConfig.theme.colors
  const colorsSocial = fullConfig.theme.colors.social

  const colorsStatusDemo = Object.keys(colorsStatus).map((key) => ({
    className: key,
    name: key,
    hex: colorsStatus[key],
    rgb: hexToRgb(colorsStatus[key]),
    hsl: hexToHsl(colorsStatus[key])
  }))

  const colorsGraysDemo = Object.keys(colorsGrays).map((key) => ({
    className: key,
    name: key,
    hex: colorsGrays[key],
    rgb: hexToRgb(colorsGrays[key]),
    hsl: hexToHsl(colorsGrays[key])
  }))

  const colorsSocialDemo = Object.keys(colorsSocial).map((key) => ({
    className: key,
    name: key,
    hex: colorsSocial[key],
    rgb: hexToRgb(colorsSocial[key]),
    hsl: hexToHsl(colorsSocial[key])
  }))

  const colorsDemo = Object.keys(colors).map((colorName) => {
    if (colorName === 'theme') {
      const color = colors[colorName]

      return Object.keys(color).map((key) => ({
        className: colorName,
        name: key,
        hex: color[key],
        rgb: hexToRgb(color[key]),
        hsl: hexToHsl(color[key])
      }))
    }

    return null
  }).filter((val) => { return val !== null }).flat()

  return {
    statuses: colorsStatusDemo,
    grays: colorsGraysDemo,
    colors: colorsDemo,
    social: colorsSocialDemo
  }
}

/* Box Shadow Demo - Foundation section */
export const createBoxShadowObjectDemo = () => {
  const boxShadow = fullConfig.theme.boxShadow

  return Object.keys(boxShadow).map((key) => ({
    name: key,
    value: boxShadow[key]
  }))
}

/* Border Radius Demo - Foundation section */
export const createBorderRadiusObjectDemo = () => {
  const borderRadius = fullConfig.theme.borderRadius

  return Object.keys(borderRadius).map((key) => ({
    name: key,
    value: borderRadius[key]
  }))
}

/* Opacity Demo - Foundation section */
export const createOpacityObjectDemo = () => {
  const opacity = fullConfig.theme.opacity

  return Object.keys(opacity).map((key) => ({
    name: key,
    value: opacity[key]
  }))
}
