import { createContext, useContext, useState } from "react"

const AppContext = createContext()

export function Wrapper({ children }) {
  const [user, setUser] = useState(null)
  const [quizCreate, setQuizCreate] = useState()
  const sharedState = {
    // Add your shared state here
    user,
    setUser,
    quizCreate,
    setQuizCreate,
  }

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
