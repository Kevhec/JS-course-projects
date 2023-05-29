import axiosClient from '../config/axios'
import { AuthState } from '../context/AuthProvider'

export default async function authUser (token: string): Promise<AuthState> {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
/* yes */
  try {
    const { data } = await axiosClient('/veterinarian/profile', config)
    return data
  } catch (error: any) {
    throw new Error(error.response.data.message)
  }
}
