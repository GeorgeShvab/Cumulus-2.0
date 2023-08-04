import Sidebar from '@/components/Sidebar/Sidebar'
import Main from '@/components/Main/Index'
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
        <div className="lg:min-h-screen block lg:flex">
          <div className="flex-[0_0_330px] xl:flex-[0_0_370px]">
            <Sidebar
              location={capitalizeLetter(location)}
              timeOffset={weather.timezone_offset * 1000}
              {...weather.current}
            />
          </div>
          <div className="h-full flex-1 flex">
            <Main days={weather.daily} timeOffset={weather.timezone_offset * 1000} />
          </div>
        </div>
      </main>
    )
  } catch (e) {
    const referer = headers().get('referer')

    if (!referer) redirect('/')

    const prevUrl = new URL(referer)

    prevUrl.searchParams.delete('error')

    prevUrl.searchParams.append('error', 'city_not_found')

    redirect(prevUrl.href)
  }
}

export async function generateMetadata(query: Query): Promise<Metadata> {
  const location = capitalizeLetter(decodeURI(query.params?.city))

  return {
    title: `Погода в ${location}`,
    description: `Точний прогноз погоди на 7 днів вперед у ${location}.`,
    openGraph: {
      images: ['https://cumulus-2.vercel.app/logo.jpg'],
      title: `Погода в ${location}`,
      description: `Точний прогноз погоди на 7 днів вперед у ${location}.`,
      type: 'website',
      url: `https://cumulus-2.vercel.app/${location}`,
    },
  }
}
