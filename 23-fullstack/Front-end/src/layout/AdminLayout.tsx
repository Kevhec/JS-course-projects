import { Navigate, Outlet } from 'react-router-dom'

import useAuth from '../hooks/useAuth'

import Loader from '../components/Loader/Loader'
import AdminHeader from '../components/Admin/AdminHeader'
import AdminFooter from '../components/Admin/AdminFooter'

export default function AdminLayout (): JSX.Element {
  const { auth, loading } = useAuth()

  if (loading) {
    return (
      <Loader className='absolute inset-0 flex items-center justify-center w-full bg-white' />
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-between'>
      <AdminHeader />
      {auth._id !== null
        ? (
          <main className='container mx-auto mt-5 p-2 md:p-5 flex-grow'>
            <Outlet />
          </main>
          )
        : <Navigate to='/' />}
      <AdminFooter />
    </div>
  )
}
