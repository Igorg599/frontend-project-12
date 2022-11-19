import { createContext, useCallback, useMemo, useState } from "react"
import useLocalStorage from "../hooks/useLokalStorage"

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [storageUserValue] = useLocalStorage("userId")
  const [loggedIn, setLoggedIn] = useState(!!storageUserValue)

  const logIn = useCallback(() => setLoggedIn(true), [])
  const logOut = useCallback(() => {
    localStorage.removeItem("userId")
    setLoggedIn(false)
  }, [])

  const valueProvider = useMemo(
    () => ({ loggedIn, logIn, logOut }),
    [logIn, logOut, loggedIn]
  )

  return (
    <AuthContext.Provider value={valueProvider}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
