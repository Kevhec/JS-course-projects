import { PacientType } from '../context/PacientsProvider'
import axiosClient from '../config/axios'

async function pacientsReducerInit (): Promise<PacientType[]> {
  try {
    const token = localStorage.getItem('vcpa_token')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token !== null ? token : ''}`
      }
    }
    const { data } = await axiosClient('/pacient', config)
    return data
  } catch (error) {
    console.error(error)
    return []
  }
}

export default pacientsReducerInit
