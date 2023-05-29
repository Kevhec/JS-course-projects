import { Link, useLocation } from 'react-router-dom'

export default function AdminNav (): JSX.Element {
  const location = useLocation()

  const currentPage = location.pathname.split('/').at(-1)
  return (
    <nav className='flex gap-3'>
      <Link
        to='/admin/profile'
        className={`font-bold uppercase ${currentPage === 'profile' ? 'text-indigo-600' : 'text-gray-500'}`}
      >
        Profile
      </Link>
      <Link
        to='/admin/changepassword'
        className={`font-bold uppercase ${currentPage === 'changepassword' ? 'text-indigo-600' : 'text-gray-500'}`}
      >
        Change password
      </Link>
    </nav>
  )
}
