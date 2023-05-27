import { createContext, useEffect, useState } from 'react'
import authUser from '../utils/authUser'

interface Props {
  children: React.ReactNode
}

export interface AuthState {
  _id: string | null
  email: string | null
  name: string | null
  tel?: string
  website?: string
}

export interface AuthContextType {
  auth: AuthState
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>
  loading: boolean
  logOut: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const initialAuthState: AuthState = {
  _id: null,
  email: null,
  name: null
}

function AuthProvider ({ children }: Props): JSX.Element {
  const [auth, setAuth] = useState<AuthState>(initialAuthState)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = async (): Promise<void> => {
      setLoading(true)
      const token = localStorage.getItem('vcpa_token')
      if (token === null) {
        setLoading(false)
        return
      }
      try {
        const newAuth = await authUser(token)
        setAuth(newAuth)
      } catch (error: any) {
        console.error(error.response.data.message)
      } finally {
        setLoading(false)
      }
    }
    void auth()
  }, [])

  const logOut = (): void => {
    localStorage.removeItem('vcpa_token')
    setAuth(initialAuthState)
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export { initialAuthState, AuthProvider }
export default AuthContext
