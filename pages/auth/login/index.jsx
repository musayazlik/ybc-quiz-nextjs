import React from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/libs/firebase"
import { useRouter } from "next/router"
import { useAppContext } from "@/pages/context"

const Login = () => {
  const router = useRouter()
  const { user, setUser } = useAppContext()
  const handleSubmit = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        setUser(user)

        //router.push("/dashboard")
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-1/2 h-1/2 bg-gray-200 rounded-lg flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <form
          className="w-1/2 flex flex-col justify-center items-center gap-4"
          onSubmit={(e) => handleSubmit(e)}>
          <div className="w-full flex flex-col justify-center items-center">
            <label htmlFor="email" className="text-gray-500 mb-3 mt-8">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="px-3 py-2 border-2 duration-200 border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <label htmlFor="password" className="text-gray-500 mb-3">
              Password
            </label>
            <input
              type="text"
              name="password"
              id="password"
              className=" px-3 py-2 border-2 duration-200 border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-lg p-2 mt-4">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
