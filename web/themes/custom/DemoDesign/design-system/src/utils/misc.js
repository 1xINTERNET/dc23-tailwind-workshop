const pxToRem = (value, addUnits) => {
  if (value !== 0) {
    let remCalc = String(Number(value / 16))
    if (addUnits) {
      remCalc += 'rem'
    }
    return remCalc
  } else {
    return '0'
  }
}

const remToPx = (value, addUnits) => {
  if (value !== 0) {
    let remCalc = String(Number(value * 16))
    if (addUnits) {
      remCalc += 'px'
    }
    return remCalc
  } else {
    return '0'
  }
}

module.exports = {
  pxToRem,
  remToPx
}
