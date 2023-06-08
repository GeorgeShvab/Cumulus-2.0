import Sidebar from '@/components/Sidebar/Sidebar'
import Main from '@/components/Main/Main'
import { Metadata } from 'next/types'
import { redirect } from 'next/navigation'
import { headers } from 'next/dist/client/components/headers'
import { geocode, getWeather } from '../api'
import { capitalizeLetter } from '../../../utils/capitalizeLetter'

interface Query {
  params: {
    city: string
  }
}

export default async function Home(query: Query) {
  try {
    const coordinates = await geocode(decodeURI(query.params?.city))

    const location = capitalizeLetter(decodeURI(query.params?.city))

    const weather = await getWeather({
      lat: coordinates.lat,
      lon: coordinates.lon,
    })

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
    const referer = headers().get('referer')
    if (!referer) redirect('/')

    const prevPath = new URL(referer).pathname.replace(/\//, '')

    redirect('/' + prevPath + '?error=city_not_found')
  }
}

export async function generateMetadata(query: Query): Promise<Metadata> {
  const location = capitalizeLetter(decodeURI(query.params?.city))

  return {
    title: `Погода в ${location}`,
    description: `Точний прогноз погоди на 7 днів вперед у ${location}.`,
    openGraph: {
      images: ['/logo.jpg'],
      title: `Погода в ${location}`,
      description: `Точний прогноз погоди на 7 днів вперед у ${location}.`,
      type: 'website',
      url: `/${location}`,
    },
  }
}
