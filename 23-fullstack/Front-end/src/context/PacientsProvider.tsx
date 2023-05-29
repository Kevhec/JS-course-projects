import { createContext, useEffect, useReducer, useState } from 'react'

import axiosClient from '../config/axios'
import pacientsReducer, { PacientActions, PacientsActionKind } from '../reducers/PacientsReducer'
import pacientsReducerInit from '../reducers/PacientsReducerInit'
import useAuth from '../hooks/useAuth'

interface Props {
  children: React.ReactNode
}

export interface PacientType {
  _id?: string
  id?: string
  petName: string
  petOwner: string
  petOwnerEmail: string
  dischargeDate: number
  symptoms: string
  dynamicType?: any
}

export type dynamicType = keyof PacientType | any

export const initialState: PacientType[] = []

export interface PacientsContextType {
  pacients: PacientType[]
  dispatch: React.Dispatch<PacientActions>
  newPacient: (pacient: PacientType) => Promise<void>
  editPacient: (pacient: PacientType) => Promise<void>
  deletePacient: (id: string | undefined) => Promise<any>
  toggleEditModeState: (pacient: PacientType) => void
  editModeState: EditModeState | null
  loading: boolean
}

const PacientsContext = createContext<PacientsContextType | null>(null)

interface EditModeState {
  pacient: PacientType | null
  isEditing: boolean
}

function PacientsProvider ({ children }: Props): JSX.Element {
  // const [pacients, setPacients] = useState<PacientType[]>(initialState)
  const [pacients, dispatch] = useReducer(pacientsReducer, initialState)
  const [editModeState, setEditModeState] = useState<EditModeState>({ pacient: null, isEditing: false })
  const [loading, setLoading] = useState(false)
  const { auth } = useAuth()

  const newPacient = async (pacient: PacientType): Promise<void> => {
    setLoading(true)
    try {
      const token = localStorage.getItem('vcpa_token')
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token !== null ? token : ''}`
        }
      }
      const { data } = await axiosClient.post('/pacient', pacient, config)
      dispatch({
        type: PacientsActionKind.ADD,
        payload: {
          ...data.newPacient
        }
      })
    } catch (error: any) {
      console.error(error.response)
    } finally {
      setLoading(false)
    }
  }

  const toggleEditModeState = (pacient: PacientType): void => {
    setEditModeState({
      pacient,
      isEditing: !editModeState.isEditing
    })
  }

  const editPacient = async (pacient: PacientType): Promise<void> => {
    setLoading(true)
    try {
      const keys = Object.keys(pacient)
      const newPacient = keys.reduce<Partial<PacientType>>((r, c) => {
        const newKey = c.split('-')[0]
        r[newKey as keyof PacientType] = pacient[c as keyof PacientType]
        return r as PacientType
      }, {})
      const token = localStorage.getItem('vcpa_token')
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token !== null ? token : ''}`
        }
      }
      const { data } = await axiosClient.patch(`/pacient/${pacient.id !== undefined ? pacient.id : ''}`, newPacient, config)
      const { petName, petOwner, petOwnerEmail, symptoms, dischargeDate }: PacientType = data
      const editedPacient = {
        id: pacient.id !== undefined ? pacient.id : '',
        petName,
        petOwner,
        petOwnerEmail,
        symptoms,
        dischargeDate
      }
      dispatch({
        type: PacientsActionKind.EDIT,
        payload: {
          ...editedPacient
        }
      })
    } catch (error: any) {
      console.error(error.response)
    } finally {
      setLoading(false)
    }
  }

  const deletePacient = async (id: string | undefined): Promise<any> => {
    try {
      const token = localStorage.getItem('vcpa_token')
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token !== null ? token : ''}`
        }
      }
      const { data, status } = await axiosClient.delete(
        `/pacient/${id !== undefined ? id : ''}`, config
      )
      if (status === 200) {
        dispatch({
          type: PacientsActionKind.REMOVE,
          payload: {
            id
          }
        })
      }
      return { data, status }
    } catch (error: any) {
      return error.response
    }
  }

  useEffect(() => {
    pacientsReducerInit()
      .then((data) => {
        dispatch({ type: PacientsActionKind.INIT, payload: data })
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error initializing pacientsReducer:', error)
        setLoading(false)
      })
  }, [auth])

  return (
    <PacientsContext.Provider
      value={{
        pacients,
        dispatch,
        newPacient,
        editPacient,
        deletePacient,
        toggleEditModeState,
        editModeState,
        loading
      }}
    >
      {children}
    </PacientsContext.Provider>
  )
}

export default PacientsContext
export { PacientsProvider }
