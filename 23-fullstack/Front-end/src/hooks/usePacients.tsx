import { useContext } from 'react'
import PacientsContext, { PacientsContextType } from '../context/PacientsProvider'

const usePacients = (): PacientsContextType => {
  const pacientsContext = useContext(PacientsContext)
  if (pacientsContext === undefined || pacientsContext === null) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return pacientsContext
}

export default usePacients
