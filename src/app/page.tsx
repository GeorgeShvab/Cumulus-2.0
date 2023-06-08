import { cookies, headers } from 'next/dist/client/components/headers'
import Sidebar from '@/components/Sidebar/Sidebar'
import Main from '@/components/Main/Main'
import getCoordinates from '../../utils/getCoordinates'
import { Metadata } from 'next'
import { geocode, getWeather } from './api'
import { capitalizeLetter } from '../../utils/capitalizeLetter'

const getCity = async () => {
  let coordinates

  const location = cookies().get('default_location')?.value

  const defaultLocation = location ? decodeURI(location) : undefined

  if (defaultLocation && defaultLocation !== 'null') {
    const data = await geocode(defaultLocation)

    if (data) {
      coordinates = {
        location: { lat: data.lat, lon: data.lon },
        city: defaultLocation,
      }
    } else {
      const ip = headers().get('x-forwarded-for') as string

      const data = await getCoordinates(process.env.MODE === 'PRODUCTION' ? ip : '178.251.107.104')

      const { local_names } = await geocode(data.city)

      coordinates = {
        location: { lat: data.lat, lon: data.lon },
        city: local_names.uk,
      }
    }
  } else {
    const ip = headers().get('x-forwarded-for') as string

    const data = await getCoordinates(process.env.MODE === 'PRODUCTION' ? ip : '178.251.107.104')

    const { local_names } = await geocode(data.city)

    coordinates = {
      location: { lat: data.lat, lon: data.lon },
      city: local_names.uk,
    }
  }

  return coordinates
}

export default async function Home() {
  try {
    const coordinates = await getCity()

    const location = coordinates.city

    const weather = await getWeather(coordinates.location)

    return (
      <main className="bg-neutral-50">
        <div className="lg:h-screen block lg:flex">
          <div className="flex-[0_0_330px] xl:flex-[0_0_370px]">
            <Sidebar location={capitalizeLetter(location)} {...weather.current} />
          </div>
          <div className="h-full flex-1">
            <Main days={weather.daily} hours={weather.hourly} />
          </div>
        </div>
      </main>
    )
  } catch (e) {
    console.log(e)
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const location = await getCity()

  return {
    title: `Погода в ${location.city}`,
    description: `Точний прогноз погоди на 7 днів вперед у ${location}.`,
    openGraph: {
      images: ['/favicon.svg'],
      title: `Cumulus - ваш метеопомічник`,
      description: `Точний прогноз погоди на 7 днів вперед.`,
      type: 'website',
      url: '/',
    },
  }
}
