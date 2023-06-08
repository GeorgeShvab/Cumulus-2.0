export const translateSpeedUnit = (unit: 'mph' | 'kmh' | 'ms') => {
  switch (unit) {
    case 'kmh':
      return 'км/год'
    case 'mph':
      return 'миль/год'
    default:
      return 'м/с'
  }
}

export const translatePressureUnit = (unit: 'hPa' | 'mmHg' | 'atm') => {
  switch (unit) {
    case 'mmHg':
      return 'мм рт. ст.'
    default:
      return 'гПа'
  }
}
