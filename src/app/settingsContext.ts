'use client'

import { cookies } from 'next/dist/client/components/headers'
import { Settings } from '../../types'
import { createContext, useEffect, useState } from 'react'

const getInitialState = () => {
  let temperatureUnit
  let speedUnit
  let defaultLocation
  let pressureUnit

  if (typeof document !== 'undefined') {
    const getCookie = (name: string): string | null =>
      document?.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || null

    temperatureUnit = getCookie('temperature_unit') || 'celsius'
    speedUnit = getCookie('speed_unit') || 'ms'
    pressureUnit = getCookie('pressure_unit') || 'hPa'
    defaultLocation = getCookie('default_location')
  } else {
    const cookie = cookies()

    temperatureUnit = cookie.get('temperature_unit')?.value

    if (temperatureUnit !== 'celsius' && temperatureUnit !== 'fahrenheit') {
      temperatureUnit = 'celsius'
    }

    speedUnit = cookie.get('speed_unit')?.value

    if (speedUnit !== 'kmh' && speedUnit !== 'mph' && speedUnit !== 'ms') {
      speedUnit = 'ms'
    }

    pressureUnit = cookie.get('pressure_unit')?.value

    if (pressureUnit !== 'hPa' && pressureUnit !== 'mmHg') {
      pressureUnit = 'hPa'
    }

    defaultLocation = cookie.get('default_location')?.value

    if (!defaultLocation || defaultLocation === 'null') {
      defaultLocation = null
    }
  }

  return {
    temperatureUnit: temperatureUnit as 'fahrenheit' | 'celsius',
    speedUnit: speedUnit as 'kmh' | 'mph' | 'ms',
    pressureUnit: pressureUnit as 'hPa' | 'mmHg',
    defaultLocation: decodeURI(defaultLocation || ''),
  }
}

const initialState: Settings = {
  temperatureUnit: 'celsius',
  speedUnit: 'ms',
  pressureUnit: 'hPa',
  defaultLocation: null,
}

export const settingsContext = createContext<{
  settings: Settings
  setSettings: (arg: Settings | ((arg: Settings) => Settings)) => void
}>({ settings: initialState, setSettings: () => {} })

export const useSettingsContex = () => {
  const initialState: Settings = getInitialState()

  const [settings, setSettings] = useState<Settings>(initialState)

  useEffect(() => {
    document.cookie = 'temperature_unit=' + settings.temperatureUnit
    document.cookie = 'speed_unit=' + settings.speedUnit
    document.cookie = 'pressure_unit=' + settings.pressureUnit
    document.cookie = 'default_location=' + encodeURI(settings.defaultLocation || '')
  }, [settings])

  return { settings, setSettings }
}
