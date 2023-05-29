import { PacientType } from '../context/PacientsProvider'

export enum PacientsActionKind {
  INIT = 'INIT',
  RESET = 'RESET',
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  EDIT = 'EDIT'
}

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

interface PacientsPayload {
  [PacientsActionKind.INIT]: PacientType[]
  [PacientsActionKind.RESET]: PacientType[]
  [PacientsActionKind.ADD]: {
    _id: string
    petName: string
    petOwner: string
    petOwnerEmail: string
    dischargeDate: number
    symptoms: string
  }
  [PacientsActionKind.REMOVE]: {
    id: string | undefined
  }
  [PacientsActionKind.EDIT]: {
    id: string
  }
}

export type PacientActions = ActionMap<PacientsPayload>[keyof ActionMap<PacientsPayload>]

function pacientsReducer (pacients: PacientType[], action: PacientActions): PacientType[] {
  switch (action.type) {
    case PacientsActionKind.INIT:
      return action.payload.map(pacient => (
        {
          id: pacient._id,
          petName: pacient.petName,
          petOwner: pacient.petOwner,
          petOwnerEmail: pacient.petOwnerEmail,
          dischargeDate: pacient.dischargeDate,
          symptoms: pacient.symptoms
        }
      ))
    case PacientsActionKind.RESET:
      return action.payload
    case PacientsActionKind.ADD:
      return [...pacients, {
        id: action.payload._id,
        petName: action.payload.petName,
        petOwner: action.payload.petOwner,
        petOwnerEmail: action.payload.petOwnerEmail,
        dischargeDate: action.payload.dischargeDate,
        symptoms: action.payload.symptoms
      }]
    case PacientsActionKind.REMOVE:
      return pacients.filter((pacient) => pacient.id !== action.payload.id)
    case PacientsActionKind.EDIT:
      return pacients.map((pacient) =>
        pacient.id === action.payload.id ? { ...pacient, ...action.payload } : pacient
      )
    default: {
      throw Error('Unknown action')
    }
  }
}

export default pacientsReducer
