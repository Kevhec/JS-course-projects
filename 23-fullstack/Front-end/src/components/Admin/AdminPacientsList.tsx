import usePacients from '../../hooks/usePacients'
import Pacient from './Pacient'

export default function AdminPacientsList (): JSX.Element {
  const { pacients } = usePacients()

  return (
    <>
      {
        pacients.length > 0
          ? (
            <h2 className='font-bold text-lg text-center'>
              Pacients
              <span className='text-lg mb-5 text-center font-bold text-indigo-600 block'>List</span>
            </h2>
            )
          : (
            <>
              <h2 className='font-bold text-lg text-center'>There are no pacients</h2>
              <p className='text-lg mb-5 text-center font-bold text-indigo-600'>Start by adding one!</p>
            </>
            )
      }
      <ul>
        {
          pacients.map(pacient => (
            <Pacient key={pacient.id} pacient={pacient} />
          ))
        }
      </ul>
    </>
  )
}
