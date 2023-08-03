export interface CoordinatesResponse {
  status: string
  country: string
  countryCode: string
  region: string
  regionName: string
  city: string
  zip: string
  lat: number
  lon: number
  timezone: string
  isp: string
  org: string
  as: string
  query: string
}

export interface Settings {
  temperatureUnit: 'celsius' | 'fahrenheit'
  speedUnit: 'kmh' | 'mph' | 'ms'
  defaultLocation: string | null
  pressureUnit: 'hPa' | 'mmHg'
}

export interface GeocodingData {
  name: string
  local_names: {
    en: string
    be: string
    et: string
    ka: string
    uk: string
    lt: string
    de: string
    fr: string
    zh: string
    pl: string
    hy: string
    ru: string
  }
  lat: number
  lon: number
  country: string
  state: string
}

export interface HourWeather {
  dt: number
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  uvi: number
  clouds: number
  visibility: number
  wind_speed: number
  wind_deg: number
  wind_gust: number
  weather: [
    {
      id: number
      main: string
      description: string
      icon: string
    }
  ]
  pop: number
  is_day: boolean
  rain?: {
    '1h': number
  }
}

interface DayWeather {
  dt: number
  sunrise: number
  sunset: number
  moonrise: number
  moonset: number
  moon_phase: number
  day: string
  summary: string
  temp: {
    day: number
    min: number
    max: number
    night: number
    eve: number
    morn: number
  }
  feels_like: {
    day: number
    night: number
    eve: number
    morn: number
  }
  pressure: number
  humidity: number
  dew_point: number
  wind_speed: number
  wind_deg: number
  wind_gust: number
  weather: [
    {
      id: number
      main: string
      description: string
      icon: string
    }
  ]
  clouds: number
  pop: number
  uvi: number
  rain?: number
  hourly: HourWeather[]
}

export interface CurrentWeather {
  dt: number
  sunrise: number
  sunset: number
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  uvi: number
  clouds: number
  visibility: number
  wind_speed: number
  wind_deg: number
  wind_gust: number
  rain?: {
    '1h': number
  }
  weather: [
    {
      id: number
      main: string
      description: string
      icon: string
    }
  ]
  is_day: boolean
}

export interface WeatherData {
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
  current: CurrentWeather
  hourly: HourWeather[]
  daily: DayWeather[]
}

type Section = 'daily' | 'hourly'

export interface AutocompletePlace {
  description: string
  matched_substrings: [
    {
      length: number
      offset: number
    }
  ]
  place_id: string
  reference: string
  structured_formatting: {
    main_text: string
    main_text_matched_substrings: [
      {
        length: number
        offset: number
      }
    ]
    secondary_text: string
  }
  terms: [
    {
      offset: number
      value: string
    },
    {
      offset: number
      value: string
    },
    {
      offset: number
      value: string
    }
  ]
  types: string[]
}

export interface PlacesAutocompleteApi {
  predictions: AutocompletePlace[]
  status: 'OK'
}
