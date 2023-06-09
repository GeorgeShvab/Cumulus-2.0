import Link from 'next/link'
import { FC } from 'react'

const ServerError: FC = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div>
        <div className="flex justify-center mb-6">
          <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_19_8)">
              <path
                d="M206.25 119.274V82.5H192.5V68.75H206.25V13.75H13.75V68.75H27.5V82.5H13.75V137.5H27.5V151.25H13.75V206.25H119.274C129.896 214.83 143.406 219.993 158.125 220C192.301 219.986 219.986 192.301 220 158.125C219.993 143.399 214.83 129.896 206.25 119.274ZM96.6556 151.25H41.25V137.5H99.8388C98.2919 141.886 97.1781 146.479 96.6556 151.25ZM178.75 82.5H41.25V68.75H178.75V82.5ZM27.5 41.25H55V55H27.5V41.25ZM27.5 110H55V123.75H27.5V110ZM55 192.5H27.5V178.75H55V192.5ZM158.125 205.446C131.993 205.384 110.852 184.243 110.791 158.125C110.852 131.993 131.993 110.852 158.125 110.791C184.243 110.852 205.384 131.993 205.446 158.125C205.384 184.243 184.243 205.384 158.125 205.446Z"
                fill="black"
              />
              <path
                d="M192.5 165V151.243H181.067C180.634 149.786 180.07 148.404 179.382 147.077L187.543 138.916L177.808 129.188L169.799 137.204C168.286 136.359 166.691 135.685 165.007 135.183V123.75H151.257V135.176C149.682 135.644 148.191 136.262 146.774 137.032L138.93 129.195L129.202 138.923L137.039 146.761C136.269 148.184 135.651 149.676 135.176 151.25H123.75V165H135.176C135.678 166.691 136.359 168.293 137.204 169.799L129.195 177.794L138.909 187.529L147.077 179.369C148.397 180.063 149.786 180.62 151.236 181.053V192.5H165V181.053C166.574 180.586 168.059 179.967 169.476 179.197L177.808 187.529L187.529 177.794L179.197 169.476C179.96 168.059 180.579 166.568 181.053 165H192.5ZM158.118 168.431C152.419 168.417 147.819 163.818 147.799 158.118C147.819 152.419 152.419 147.819 158.118 147.799C163.818 147.819 168.417 152.419 168.431 158.118C168.417 163.818 163.818 168.417 158.118 168.431Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_19_8">
                <rect width="220" height="220" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <h3 className="text-2xl text-center font-semibold mb-6">Помилка сервера</h3>
        <p className="text-center">
          <Link href="/" className="text-blue-400">
            На головну
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ServerError
