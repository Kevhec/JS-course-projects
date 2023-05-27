import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

export default function AdminHeader (): JSX.Element {
  const { logOut } = useAuth()
  const handleClick = (): void => {
    if (confirm('Do you really want to leave?')) {
      logOut()
    }
  }
  return (
    <header className='py-10 px-5 lg:px-0 bg-indigo-600'>
      <div className='container mx-auto flex justify-between items-center flex-col gap-5 md:flex-row'>
        <h1 className='font-bold text-2xl text-white'>Pacients Administrator</h1>
        <nav className='flex gap-4 flex-col md:flex-row text-center'>
          <Link
            to='/admin'
            className='text-white text-sm uppercase font-semibold leading-none hover:text-indigo-100'
          >
            Pacients
          </Link>
          <Link
            to='/profile'
            className='text-white text-sm uppercase font-semibold leading-none hover:text-indigo-100'
          >
            Profile
          </Link>
          <button
            className='text-white text-sm uppercase font-semibold leading-none hover:text-indigo-100'
            onClick={handleClick}
          >
            Log out
          </button>
        </nav>
      </div>
    </header>
  )
}
