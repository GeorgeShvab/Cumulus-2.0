import { FC } from 'react'

interface Props {
  title?: string
  code: number
  isDay: boolean
}

const WeatherIcon: FC<Props> = ({ code, isDay, title = 'Погода' }) => {
  if (code >= 200 && code <= 232) {
    return (
      <svg width="100%" height="100%" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title>{title}</title>
        <path
          d="M28.52 11.34C28.52 8.58 26.3 6.42 23.6 6.42C23 6.42 22.46 6.54 21.92 6.72C21.74 4.68 20.06 3 17.96 3C15.74 3 13.94 4.8 13.94 7.02C13.94 7.5 14.06 7.98 14.18 8.4C14 8.34 13.76 8.34 13.58 8.34C11.36 8.34 9.56 10.14 9.56 12.36C9.56 14.52 11.3 16.32 13.46 16.38H23.78C26.42 16.08 28.52 13.98 28.52 11.34Z"
          fill="#91C0F8"
          stroke="white"
          strokeWidth="0.72"
          strokeLinejoin="round"
        />
        <path
          d="M37.6 20.5C37.6 15.9 33.9 12.3 29.4 12.3C28.4 12.3 27.5 12.5 26.6 12.8C26.3 9.4 23.5 6.6 20 6.6C16.3 6.6 13.3 9.6 13.3 13.3C13.3 14.1 13.5 14.9 13.7 15.6C13.4 15.5 13 15.5 12.7 15.5C9 15.5 6 18.5 6 22.2C6 25.8 8.9 28.8 12.5 28.9H29.7C34.1 28.4 37.6 24.9 37.6 20.5Z"
          fill="#57A0EE"
          stroke="white"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M18.06 20.62H25.5L20.58 29.26H25.26L14.7 41.62L18.78 32.38H14.22L18.06 20.62Z"
          fill="#FFA500"
          stroke="white"
          strokeWidth="1.2"
        />
      </svg>
    )
  } else if (code >= 300 && code <= 321) {
    return (
      <svg width="100%" height="100%" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title>{title}</title>
        <path
          d="M37.6 18.9C37.6 14.3 33.9 10.7 29.4 10.7C28.4 10.7 27.5 10.9 26.6 11.2C26.3 7.8 23.5 5 20 5C16.3 5 13.3 8 13.3 11.7C13.3 12.5 13.5 13.3 13.7 14C13.4 13.9 13 13.9 12.7 13.9C9 13.9 6 16.9 6 20.6C6 24.2 8.9 27.2 12.5 27.3H29.7C34.1 26.8 37.6 23.3 37.6 18.9Z"
          fill="#57A0EE"
          stroke="white"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M17.8175 30.4429L16.4283 38.3214"
          stroke="#91C0F8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="4 7"
        />
        <path
          d="M24.0737 29.5152L22.6845 37.3936"
          stroke="#91C0F8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="4 7"
        />
      </svg>
    )
  } else if (code === 500) {
    if (isDay) {
      return (
        <svg width="100%" height="100%" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
          <title>{title}</title>
          <path d="M15 30V33" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" />
          <path d="M8.63603 27.364L6.51471 29.4853" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" />
          <path d="M6 21H3" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" />
          <path d="M8.63603 14.636L6.51471 12.5147" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" />
          <path d="M15 12V9" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" />
          <path d="M21.364 14.636L23.4853 12.5147" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" />
          <path d="M24 21H27" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" />
          <path d="M21.364 27.364L23.4853 29.4853" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" />
          <path
            d="M15 26C17.7614 26 20 23.7614 20 21C20 18.2386 17.7614 16 15 16C12.2386 16 10 18.2386 10 21C10 23.7614 12.2386 26 15 26Z"
            fill="#FFA500"
            stroke="#FFA500"
            strokeWidth="2"
          />
          <path
            d="M42.7 29.4C42.7 24.8 39 21.2 34.5 21.2C33.5 21.2 32.6 21.4 31.7 21.7C31.4 18.3 28.6 15.5 25.1 15.5C21.4 15.5 18.4 18.5 18.4 22.2C18.4 23 18.6 23.8 18.8 24.5C18.5 24.4 18.1 24.4 17.8 24.4C14.1 24.4 11.1 27.4 11.1 31.1C11.1 34.7 14 37.7 17.6 37.8H34.8C39.2 37.3 42.7 33.8 42.7 29.4Z"
            fill="#57A0EE"
            stroke="white"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      )
    } else {
      return (
        <svg width="100%" height="100%" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
          <title>{title}</title>
          <path
            d="M25.54 9L26.1 9.96L27.06 10.44L26.1 11L25.54 11.96L25.06 11L24.1 10.44L25.06 9.96L25.54 9Z"
            fill="#FFA500"
          />
          <path
            d="M41.54 17L42.1 17.96L43.06 18.44L42.1 19L41.54 19.96L41.06 19L40.1 18.44L41.06 17.96L41.54 17Z"
            fill="#FFA500"
          />
          <path
            d="M34.5 18.36C34.5 15.4 36.1 12.84 38.5 11.4C37.3 10.68 35.94 10.36 34.5 10.36C30.1 10.36 26.5 13.96 26.5 18.36C26.5 22.76 30.1 26.36 34.5 26.36C35.94 26.36 37.3 25.96 38.5 25.32C36.1 23.96 34.5 21.32 34.5 18.36Z"
            fill="#FFA500"
            stroke="#FFA500"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M34.6 28.2C34.6 23.6 30.9 20 26.4 20C25.4 20 24.5 20.2 23.6 20.5C23.3 17.1 20.5 14.3 17 14.3C13.3 14.3 10.3 17.3 10.3 21C10.3 21.8 10.5 22.6 10.7 23.3C10.4 23.2 10 23.2 9.7 23.2C6 23.2 3 26.2 3 29.9C3 33.5 5.9 36.5 9.5 36.6H26.7C31.1 36.1 34.6 32.6 34.6 28.2Z"
            fill="#57A0EE"
            stroke="white"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      )
    }
  } else if (code >= 501 && code <= 504) {
    return (
      <svg width="100%" height="100%" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title>{title}</title>
        <path
          d="M38.6 17.9C38.6 13.3 34.9 9.7 30.4 9.7C29.4 9.7 28.5 9.9 27.6 10.2C27.3 6.8 24.5 4 21 4C17.3 4 14.3 7 14.3 10.7C14.3 11.5 14.5 12.3 14.7 13C14.4 12.9 14 12.9 13.7 12.9C10 12.9 7 15.9 7 19.6C7 23.2 9.9 26.2 13.5 26.3H30.7C35.1 25.8 38.6 22.3 38.6 17.9Z"
          fill="#57A0EE"
          stroke="white"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M16.8023 29.6166L15.4131 37.495"
          stroke="#91C0F8"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="0.1 7"
        />
        <path
          d="M22.0737 28.5152L20.6845 36.3937"
          stroke="#91C0F8"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="0.1 7"
        />
        <path
          d="M26.824 30.3682L25.4349 38.2467"
          stroke="#91C0F8"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="0.1 7"
        />
      </svg>
    )
  } else if (code === 511) {
    return (
      <svg width="100%" height="100%" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title>{title}</title>
        <path
          d="M38.6 21.9C38.6 17.3 34.9 13.7 30.4 13.7C29.4 13.7 28.5 13.9 27.6 14.2C27.3 10.8 24.5 8 21 8C17.3 8 14.3 11 14.3 14.7C14.3 15.5 14.5 16.3 14.7 17C14.4 16.9 14 16.9 13.7 16.9C10 16.9 7 19.9 7 23.6C7 27.2 9.9 30.2 13.5 30.3H30.7C35.1 29.8 38.6 26.3 38.6 21.9Z"
          fill="#57A0EE"
          stroke="white"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path d="M21.9 32V37" stroke="#57A0EE" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M23.6678 32.7322L20.1322 36.2678" stroke="#57A0EE" strokeLinecap="round" />
        <path d="M24.4 34.5H19.4" stroke="#57A0EE" strokeLinecap="round" />
        <path d="M23.6678 36.2678L20.1322 32.7322" stroke="#57A0EE" strokeLinecap="round" />
      </svg>
    )
  } else if (code >= 520 && code <= 531) {
    return (
      <svg width="100%" height="100%" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title>{title}</title>
        <path
          d="M38.6 17.9C38.6 13.3 34.9 9.7 30.4 9.7C29.4 9.7 28.5 9.9 27.6 10.2C27.3 6.8 24.5 4 21 4C17.3 4 14.3 7 14.3 10.7C14.3 11.5 14.5 12.3 14.7 13C14.4 12.9 14 12.9 13.7 12.9C10 12.9 7 15.9 7 19.6C7 23.2 9.9 26.2 13.5 26.3H30.7C35.1 25.8 38.6 22.3 38.6 17.9Z"
          fill="#57A0EE"
          stroke="white"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M16.8023 29.6166L15.4131 37.495"
          stroke="#91C0F8"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="0.1 7"
        />
        <path
          d="M22.0737 28.5152L20.6845 36.3937"
          stroke="#91C0F8"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="0.1 7"
        />
        <path
          d="M26.824 30.3682L25.4349 38.2467"
          stroke="#91C0F8"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="0.1 7"
        />
      </svg>
    )
  } else if (code >= 600 && code <= 622) {
    return (
      <svg width="100%" height="100%" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title>{title}</title>
        <path
          d="M38.6 21.9C38.6 17.3 34.9 13.7 30.4 13.7C29.4 13.7 28.5 13.9 27.6 14.2C27.3 10.8 24.5 8 21 8C17.3 8 14.3 11 14.3 14.7C14.3 15.5 14.5 16.3 14.7 17C14.4 16.9 14 16.9 13.7 16.9C10 16.9 7 19.9 7 23.6C7 27.2 9.9 30.2 13.5 30.3H30.7C35.1 29.8 38.6 26.3 38.6 21.9Z"
          fill="#57A0EE"
          stroke="white"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path d="M13.9 32V37" stroke="#57A0EE" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M15.6678 32.7322L12.1322 36.2678" stroke="#57A0EE" strokeLinecap="round" />
        <path d="M16.4 34.5H11.4" stroke="#57A0EE" strokeLinecap="round" />
        <path d="M15.6678 36.2678L12.1322 32.7322" stroke="#57A0EE" strokeLinecap="round" />
        <path d="M21.9 32V37" stroke="#57A0EE" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M23.6678 32.7322L20.1322 36.2678" stroke="#57A0EE" strokeLinecap="round" />
        <path d="M24.4 34.5H19.4" stroke="#57A0EE" strokeLinecap="round" />
        <path d="M23.6678 36.2678L20.1322 32.7322" stroke="#57A0EE" strokeLinecap="round" />
        <path d="M30.9 32V37" stroke="#57A0EE" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M32.6678 32.7322L29.1322 36.2678" stroke="#57A0EE" strokeLinecap="round" />
        <path d="M33.4 34.5H28.4" stroke="#57A0EE" strokeLinecap="round" />
        <path d="M32.6678 36.2678L29.1322 32.7322" stroke="#57A0EE" strokeLinecap="round" />
      </svg>
    )
  } else if (code >= 701 && code <= 781) {
    return (
      <svg width="100%" height="100%" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title>{title}</title>
        <path
          d="M28.52 17.34C28.52 14.58 26.3 12.42 23.6 12.42C23 12.42 22.46 12.54 21.92 12.72C21.74 10.68 20.06 9 17.96 9C15.74 9 13.94 10.8 13.94 13.02C13.94 13.5 14.06 13.98 14.18 14.4C14 14.34 13.76 14.34 13.58 14.34C11.36 14.34 9.56 16.14 9.56 18.36C9.56 20.52 11.3 22.32 13.46 22.38H23.78C26.42 22.08 28.52 19.98 28.52 17.34Z"
          fill="#91C0F8"
          stroke="white"
          strokeWidth="0.72"
          strokeLinejoin="round"
        />
        <path
          d="M37.6 28.5C37.6 23.9 33.9 20.3 29.4 20.3C28.4 20.3 27.5 20.5 26.6 20.8C26.3 17.4 23.5 14.6 20 14.6C16.3 14.6 13.3 17.6 13.3 21.3C13.3 22.1 13.5 22.9 13.7 23.6C13.4 23.5 13 23.5 12.7 23.5C9 23.5 6 26.5 6 30.2C6 33.8 8.9 36.8 12.5 36.9H29.7C34.1 36.4 37.6 32.9 37.6 28.5Z"
          fill="#57A0EE"
          stroke="white"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    )
  } else if (code >= 801 && code <= 802) {
    if (isDay) {
      return (
        <svg width="100%" height="100%" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
          <title>{title}</title>
          <path d="M15 30V33" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" />
          <path d="M8.63603 27.364L6.51471 29.4853" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" />
          <path d="M6 21H3" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" />
          <path d="M8.63603 14.636L6.51471 12.5147" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" />
          <path d="M15 12V9" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" />
          <path d="M21.364 14.636L23.4853 12.5147" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" />
          <path d="M24 21H27" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" />
          <path d="M21.364 27.364L23.4853 29.4853" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" />
          <path
            d="M15 26C17.7614 26 20 23.7614 20 21C20 18.2386 17.7614 16 15 16C12.2386 16 10 18.2386 10 21C10 23.7614 12.2386 26 15 26Z"
            fill="#FFA500"
            stroke="#FFA500"
            strokeWidth="2"
          />
          <path
            d="M42.7 29.4C42.7 24.8 39 21.2 34.5 21.2C33.5 21.2 32.6 21.4 31.7 21.7C31.4 18.3 28.6 15.5 25.1 15.5C21.4 15.5 18.4 18.5 18.4 22.2C18.4 23 18.6 23.8 18.8 24.5C18.5 24.4 18.1 24.4 17.8 24.4C14.1 24.4 11.1 27.4 11.1 31.1C11.1 34.7 14 37.7 17.6 37.8H34.8C39.2 37.3 42.7 33.8 42.7 29.4Z"
            fill="#57A0EE"
            stroke="white"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      )
    } else {
      return (
        <svg width="100%" height="100%" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
          <title>{title}</title>
          <path
            d="M25.54 9L26.1 9.96L27.06 10.44L26.1 11L25.54 11.96L25.06 11L24.1 10.44L25.06 9.96L25.54 9Z"
            fill="#FFA500"
          />
          <path
            d="M41.54 17L42.1 17.96L43.06 18.44L42.1 19L41.54 19.96L41.06 19L40.1 18.44L41.06 17.96L41.54 17Z"
            fill="#FFA500"
          />
          <path
            d="M34.5 18.36C34.5 15.4 36.1 12.84 38.5 11.4C37.3 10.68 35.94 10.36 34.5 10.36C30.1 10.36 26.5 13.96 26.5 18.36C26.5 22.76 30.1 26.36 34.5 26.36C35.94 26.36 37.3 25.96 38.5 25.32C36.1 23.96 34.5 21.32 34.5 18.36Z"
            fill="#FFA500"
            stroke="#FFA500"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M34.6 28.2C34.6 23.6 30.9 20 26.4 20C25.4 20 24.5 20.2 23.6 20.5C23.3 17.1 20.5 14.3 17 14.3C13.3 14.3 10.3 17.3 10.3 21C10.3 21.8 10.5 22.6 10.7 23.3C10.4 23.2 10 23.2 9.7 23.2C6 23.2 3 26.2 3 29.9C3 33.5 5.9 36.5 9.5 36.6H26.7C31.1 36.1 34.6 32.6 34.6 28.2Z"
            fill="#57A0EE"
            stroke="white"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      )
    }
  } else if (code >= 803 && code <= 804) {
    return (
      <svg width="100%" height="100%" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title>{title}</title>
        <path
          d="M28.52 17.34C28.52 14.58 26.3 12.42 23.6 12.42C23 12.42 22.46 12.54 21.92 12.72C21.74 10.68 20.06 9 17.96 9C15.74 9 13.94 10.8 13.94 13.02C13.94 13.5 14.06 13.98 14.18 14.4C14 14.34 13.76 14.34 13.58 14.34C11.36 14.34 9.56 16.14 9.56 18.36C9.56 20.52 11.3 22.32 13.46 22.38H23.78C26.42 22.08 28.52 19.98 28.52 17.34Z"
          fill="#91C0F8"
          stroke="white"
          strokeWidth="0.72"
          strokeLinejoin="round"
        />
        <path
          d="M37.6 28.5C37.6 23.9 33.9 20.3 29.4 20.3C28.4 20.3 27.5 20.5 26.6 20.8C26.3 17.4 23.5 14.6 20 14.6C16.3 14.6 13.3 17.6 13.3 21.3C13.3 22.1 13.5 22.9 13.7 23.6C13.4 23.5 13 23.5 12.7 23.5C9 23.5 6 26.5 6 30.2C6 33.8 8.9 36.8 12.5 36.9H29.7C34.1 36.4 37.6 32.9 37.6 28.5Z"
          fill="#57A0EE"
          stroke="white"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    )
  } else {
    if (isDay) {
      return (
        <svg width="100%" height="100%" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
          <title>{title}</title>
          <path d="M22 32V35" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" />
          <path d="M15.636 29.364L13.5147 31.4853" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" />
          <path d="M13 23H10" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" />
          <path d="M15.636 16.636L13.5147 14.5147" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" />
          <path d="M22 14V11" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" />
          <path d="M28.364 16.636L30.4853 14.5147" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" />
          <path d="M31 23H34" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" />
          <path d="M28.364 29.364L30.4853 31.4853" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" />
          <path
            d="M22 28C24.7614 28 27 25.7614 27 23C27 20.2386 24.7614 18 22 18C19.2386 18 17 20.2386 17 23C17 25.7614 19.2386 28 22 28Z"
            fill="#FFA500"
            stroke="#FFA500"
            strokeWidth="2"
          />
        </svg>
      )
    } else {
      return (
        <svg width="100%" height="100%" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
          <title>{title}</title>
          <path
            d="M12.8 12L13.5 13.2L14.7 13.8L13.5 14.5L12.8 15.7L12.2 14.5L11 13.8L12.2 13.2L12.8 12Z"
            fill="#FFA500"
          />
          <path
            d="M32.8 22L33.5 23.2L34.7 23.8L33.5 24.5L32.8 25.7L32.2 24.5L31 23.8L32.2 23.2L32.8 22Z"
            fill="#FFA500"
          />
          <path
            d="M24 23.7C24 20 26 16.8 29 15C27.5 14.1 25.8 13.7 24 13.7C18.5 13.7 14 18.2 14 23.7C14 29.2 18.5 33.7 24 33.7C25.8 33.7 27.5 33.2 29 32.4C26 30.7 24 27.4 24 23.7Z"
            fill="#FFA500"
            stroke="#FFA500"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      )
    }
  }
}

export default WeatherIcon
