import axios from 'axios'
import { GeocodingData, WeatherData } from '../../types'
import { getDayOfWeek } from '../../utils/date'

const API_KEY = process.env.OPEN_WEATHER_API_KEY

if (!API_KEY) throw new Error('No OpenWeather api key')

export const getWeather = async ({ lat, lon }: { lat: number; lon: number }) => {
  const { data } = await axios.get<WeatherData>(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${API_KEY}&units=metric&lang=uk`
  )

  let dayBoundaries: {
    [key: string]: {
      start: number
      end: number
    }
  } = {}

  data.daily.forEach((item) => {
    dayBoundaries = {
      ...dayBoundaries,
      [new Date(item.dt * 1000).toLocaleDateString('en-US', {
        timeZone: data.timezone,
      })]: {
        start: item.sunrise * 1000,
        end: item.sunset * 1000,
      },
    }
  })

  data.hourly = data.hourly.map((item) => {
    return {
      ...item,
      is_day:
        item.dt * 1000 >
          dayBoundaries[
            new Date(item.dt * 1000).toLocaleDateString('en-US', {
              timeZone: data.timezone,
            })
          ].start &&
        item.dt * 1000 <
          dayBoundaries[
            new Date(item.dt * 1000).toLocaleDateString('en-US', {
              timeZone: data.timezone,
            })
          ].end,
    }
  })

  data.daily = data.daily
    .map((item) => ({
      ...item,
      day: getDayOfWeek(new Date(item.dt * 1000).getDay()),
    }))
    .slice(0, 7)

  return data
}

export const geocode = async (location: string) => {
  const { data } = await axios.get<GeocodingData[]>(
    `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=0736c60532d42e3d2444c0d51bb57783`
  )

  return data[0] || null
}

export const reverseGeocode = () => {}

export default reverseGeocode
