import { createContext, useEffect, useState } from 'react'
import authUser from '../utils/authUser'
import axiosClient from '../config/axios'

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
  updateProfile: (updatedProfile: AuthState) => Promise<any>
  logOut: () => void
  changePassword: (newPasswordData: any) => Promise<any>
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

  const updateProfile = async (updatedProfile: AuthState): Promise<any> => {
    try {
      const token = localStorage.getItem('vcpa_token')
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token !== null ? token : ''}`
        }
      }
      const url = `/veterinarian/profile/${updatedProfile._id !== null ? updatedProfile._id : ''}`
      const { data } = await axiosClient.patch(url, updatedProfile, config)
      setAuth(data.updatedVeterinarian)
      return { message: data.message, hasErrorRes: false }
    } catch (error: any) {
      return { message: error.response.data.message, hasErrorRes: true }
    }
  }

  const logOut = (): void => {
    localStorage.removeItem('vcpa_token')
    setAuth(initialAuthState)
  }

  const changePassword = async (newPasswordData: any): Promise<any> => {
    try {
      const token = localStorage.getItem('vcpa_token')
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token !== null ? token : ''}`
        }
      }
      const url = '/veterinarian/changepassword/'
      const { data } = await axiosClient.patch(url, newPasswordData, config)
      return { message: data.message, hasErrorRes: false }
    } catch (error: any) {
      return { message: error.response.data.message, hasErrorRes: true }
    }
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading, updateProfile, logOut, changePassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export { initialAuthState, AuthProvider }
export default AuthContext
