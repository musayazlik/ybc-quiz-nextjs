import Image from "next/image"
import Link from "next/link"
import React from "react"
import { useRouter } from "next/router"
import { BiLogInCircle } from "react-icons/bi"
import { FiMenu, FiX } from "react-icons/fi"

const Navbar = () => {
  const { pathname } = useRouter()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className=" bg-white shadow-sm shadow-zinc-100 border-b-2 mb-10">
      <div className="lg:container lg:mx-auto mx-6">
        <nav className="py-4 flex justify-between items-center">
          <button className="md:hidden " onClick={() => setIsOpen(!isOpen)}>
            <FiMenu fontSize={28} />
          </button>
          <h1 className="text-2xl font-bold flex-1 flex whitespace-nowrap">
            Quiz App
          </h1>
          <ul
            className={`fixed md:relative md:w-full  ${
              isOpen === true ? "left-0" : "left-[-280px] md:left-0"
            } top-0 min-w-[280px] h-full bg-zinc-100 md:bg-transparent flex flex-col md:flex-row md:justify-center items-center md:gap-6 pt-6 md:pt-0 duration-300 z-40`}>
            <div className=" md:hidden w-full mb-8 flex justify-end pr-4">
              <FiX
                fontSize={12}
                className="w-8 h-8 p-1 border-2 border-red-800 bg-red-600 text-white rounded-full"
                onClick={() => setIsOpen(!isOpen)}
              />
            </div>
            <Link href="/dashboard" className="w-full md:w-auto ">
              <li
                className={`
              ${
                pathname === "/dashboard"
                  ? " bg-zinc-200 shadow-inner md:border-zinc-800 "
                  : "border-transparent"
              }
              px-4 py-3 md:py-2 font-semibold md:rounded-md border-2  `}>
                Home
              </li>
            </Link>
            <Link href="/dashboard/users" className="w-full md:w-auto">
              <li
                className={`
                ${
                  pathname === "/dashboard/users"
                    ? " bg-zinc-200 shadow-inner border-zinc-800 "
                    : "border-transparent"
                }
                px-4 py-3 md:py-2 font-semibold md:rounded-md md:border-2 `}>
                Users
              </li>
            </Link>
            <Link href="/dashboard/quizzes" className="w-full md:w-auto">
              <li
                className={`
              ${
                pathname === "/dashboard/quizzes"
                  ? " bg-zinc-200 shadow-inner md:border-zinc-800"
                  : "border-transparent"
              }
              px-4 py-3 md:py-2 font-semibold md:rounded-md md:border-2 `}>
                Quizzes
              </li>
            </Link>
            <Link href="/dashboard/questions" className="w-full md:w-auto">
              <li
                className={`
              ${
                pathname === "/dashboard/questions"
                  ? " bg-zinc-200 shadow-inner md:border-zinc-800"
                  : "border-transparent"
              }
              px-4 py-3 md:py-2 font-semibold md:rounded-md md:border-2 `}>
                Questions
              </li>
            </Link>
          </ul>
          {isOpen && (
            <span
              className="fixed w-screen h-screen bg-zinc-600/70 top-0 left-0 z-30 "
              onClick={() => setIsOpen(false)}></span>
          )}

          <div className="flex gap-3 items-center">
            <div className="user w-10 h-10 relative">
              <Image
                src="https://i.pravatar.cc/150?img=52"
                alt="user"
                quality={40}
                fill
                className=" rounded-full border-2 border-zinc-800 shadow-md shadow-zinc-400"
              />

              <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="layout w-8 h-8 bg-red-600 flex justify-center items-center rounded-full border-2 border-red-800 cursor-pointer hover:shadow-md hover:shadow-red-600/50 duration-200">
              <BiLogInCircle className="text-xl text-white" />
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
