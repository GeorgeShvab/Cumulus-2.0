interface converTemperatureParams {
  temp: number
  to: 'celsius' | 'fahrenheit'
}

export const converTemperature = ({
  temp,
  to,
}: converTemperatureParams): number => {
  if (to === 'fahrenheit') {
    return temp * 1.8 + 32
  } else {
    return temp
  }
}

interface ConvertSpeedParams {
  to: 'kmh' | 'mph' | 'ms'
  speed: number
}

export const convertSpeed = ({ to, speed }: ConvertSpeedParams) => {
  if (to === 'mph') {
    return speed * 2.2369
  } else if (to === 'kmh') {
    return speed * 3.6
  } else {
    return speed
  }
}

interface ConvertPressureParams {
  to: 'hPa' | 'mmHg' | 'atm'
  pressure: number
}

export const convertPressure = ({ pressure, to }: ConvertPressureParams) => {
  if (to === 'mmHg') {
    return pressure * 0.75
  } else {
    return pressure
  }
}
