import axios from 'axios'
import { DayWeather, GeocodingData, HourWeather, WeatherData } from '../../types'
import { getDayOfWeek } from '../../utils/date'

const API_KEY = process.env.OPEN_WEATHER_API_KEY

if (!API_KEY) throw new Error('No OpenWeather api key')

const prepareData = (data: WeatherData): Omit<WeatherData, 'hourly'> => {
  let dayBoundaries: {
    [key: string]: {
      start: number
      end: number
    }
  } = {}

  data.daily.forEach((item) => {
    dayBoundaries = {
      ...dayBoundaries,
      [new Date((item.dt + data.timezone_offset) * 1000).getUTCDate()]: {
        start: item.sunrise * 1000,
        end: item.sunset * 1000,
      },
    }
  })

  const hourlyByDate: { [key: number]: HourWeather[] } = {}

  data.hourly.forEach((item) => {
    const key = new Date((item.dt + data.timezone_offset) * 1000).getUTCDate()

    const hour = {
      ...item,
      is_day: item.dt * 1000 > dayBoundaries[key]?.start && item.dt * 1000 < dayBoundaries[key]?.end,
    }

    if (Number(new Date((item.dt + data.timezone_offset) * 1000).toUTCString().slice(17, 19)) % 3 === 0) {
      if (hourlyByDate[key]) {
        hourlyByDate[key].push(hour)
      } else {
        hourlyByDate[key] = [hour]
      }
    }
  })

  data.current.is_day =
    new Date().getTime() > data.current.sunrise * 1000 && new Date().getTime() < data.current.sunset * 1000

  data.daily = data.daily
    .map((item) => ({
      ...item,
      day: getDayOfWeek(new Date((item.dt + data.timezone_offset) * 1000).getDay()),
      hourly: hourlyByDate[new Date((item.dt + data.timezone_offset) * 1000).getUTCDate()],
    }))
    .slice(0, 7)

  const { hourly, ...preparedData } = data

  return preparedData
}

export const getWeather = async ({ lat, lon }: { lat: number; lon: number }) => {
  const { data } = await axios.get<WeatherData>(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${API_KEY}&units=metric&lang=uk`
  )

  return prepareData(data)
}

export const geocode = async (location: string) => {
  const { data } = await axios.get<GeocodingData[]>(
    `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=0736c60532d42e3d2444c0d51bb57783`
  )

  return data[0] || null
}
