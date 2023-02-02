import Image from "next/image"
import Link from "next/link"
import React from "react"
import { useRouter } from "next/router"
import { BiLogInCircle } from "react-icons/bi"

const Navbar = () => {
  const { pathname } = useRouter()

  return (
    <div className="bg-white shadow-sm shadow-zinc-100 border-b-2 mb-10">
      <div className="container">
        <nav className="py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Quiz App</h1>
          <ul className="flex justify-center items-center gap-6">
            <Link href="/dashboard">
              <li
                className={`
              ${
                pathname === "/dashboard"
                  ? " bg-zinc-200 shadow-inner border-zinc-800"
                  : "border-transparent"
              }
              px-4 py-2 font-semibold rounded-md border-2 `}>
                Home
              </li>
            </Link>
            <Link href="/dashboard/users">
              <li
                className={`
                ${
                  pathname === "/dashboard/users"
                    ? " bg-zinc-200 shadow-inner border-zinc-800"
                    : "border-transparent"
                }
                px-4 py-2 font-semibold rounded-md border-2 `}>
                Users
              </li>
            </Link>
            <Link href="/dashboard/quizzes">
              <li
                className={`
              ${
                pathname === "/dashboard/quizzes"
                  ? " bg-zinc-200 shadow-inner border-zinc-800"
                  : "border-transparent"
              }
              px-4 py-2 font-semibold rounded-md border-2 `}>
                Quizzes
              </li>
            </Link>
            <Link href="/dashboard/questions">
              <li
                className={`
              ${
                pathname === "/dashboard/questions"
                  ? " bg-zinc-200 shadow-inner border-zinc-800"
                  : "border-transparent"
              }
              px-4 py-2 font-semibold rounded-md border-2 `}>
                Questions
              </li>
            </Link>
          </ul>

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
