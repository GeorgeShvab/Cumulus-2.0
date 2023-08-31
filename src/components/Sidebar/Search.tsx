'use client'

import { useRouter } from 'next/navigation'
import { ChangeEvent, FC, FormEvent, useMemo, useRef, useState } from 'react'
import Settings from '../Settings/Settings'
import usePlacesAutocomplete from 'use-places-autocomplete'
import Link from 'next/link'
import useOutsideClick from '@/hooks/useOutsideClick'
import useCurrentLocation from './useCurrentLocation'

const Search: FC = () => {
  const router = useRouter()

  const formRef = useRef<HTMLFormElement>(null)

  const input = useCurrentLocation()

  const [isSettingsOpened, setIsSettingsOpened] = useState<boolean>(false)

  const { value, suggestions, setValue, clearSuggestions } = usePlacesAutocomplete({
    requestOptions: { types: ['(cities)'], language: 'uk' },
    debounce: 350,
    defaultValue: input,
  })

  const data = useMemo(
    () =>
      suggestions.data.filter((item) =>
        item.types.every(
          (value) => value !== 'route' && value !== 'country' && !value.includes('administrative_area_level')
        )
      ),
    [suggestions.data]
  )

  useOutsideClick(formRef, () => {
    clearSuggestions()
  })

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.trim().toLowerCase())
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement> & { target: { query: HTMLInputElement } }) => {
    e.preventDefault()

    const query = e.target.query.value.trim()

    if (!query) return

    if (query.split(' ').length === 2 && !isNaN(Number(query.split(' ')[0])) && !isNaN(Number(query.split(' ')[1]))) {
      router.push(`/coordinates?latitude=${query.split(' ')[0]}&longitude=${query.split(' ')[1]}`)
    } else {
      router.push('/' + query)
    }
  }

  const handleFocus = () => {
    if (value.trim().length) {
      setValue(value)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative" ref={formRef}>
      <Settings show={isSettingsOpened} onClose={() => setIsSettingsOpened(false)} />
      <div
        className={`flex gap-3 items-center bg-neutral-100 p-2 ${
          data.length ? 'rounded-t-lg outline outline-1 outline-b-0 outline-neutral-200 shadow' : 'rounded-lg'
        }`}
      >
        <button
          className="bg-transparent border-none hover:bg-neutral-100 rounded-full p-1 transition-colors"
          type="submit"
          aria-label="Пошук"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
        <input
          className="border-none outline-none bg-transparent text-black text-sm placeholder:text-black block flex-1"
          type="text"
          name="query"
          defaultValue={value}
          placeholder="Пошук міста..."
          autoComplete="off"
          onInput={handleInput}
          onFocus={handleFocus}
        />
        <button
          className={`bg-transparent border-none rounded-full bg-neutral-100 p-1 hover:rotate-180 transition-transform transition-colors duration-1000 ${
            isSettingsOpened ? 'rotate-180' : ''
          }`}
          type="button"
          onClick={() => setIsSettingsOpened(true)}
          aria-label="Відкрити Налаштування"
        >
          {isSettingsOpened ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path
                fillRule="evenodd"
                d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
        </button>
      </div>
      {data.length ? (
        <div className="absolute top-full bg-neutral-100 py-2 rounded-b-lg w-full outline outline-1 outline-t-0 outline-neutral-200 shadow">
          {data.map((item) => (
            <Link href={'/' + item.structured_formatting.main_text} key={item.place_id}>
              <div className="px-4 py-2 lg:py-1.5 hover:bg-neutral-200 transition-colors flex gap-3 items-center justify-between">
                <p>{item.structured_formatting.main_text}</p>
                <p className="text-xs text-sm text-neutral-400 text-right">
                  {item.structured_formatting.secondary_text}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : null}
    </form>
  )
}

export default Search
