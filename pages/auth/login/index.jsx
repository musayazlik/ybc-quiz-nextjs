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
        router.push("/dashboard")
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
      })
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-1/2 h-1/2 bg-gray-200 rounded-lg flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <form
          className="w-1/2 flex flex-col justify-center items-center"
          onSubmit={handleSubmit}>
          <div className="w-full flex flex-col justify-center items-center">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full border-2 border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full border-2 border-gray-300 rounded-lg p-2"
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
