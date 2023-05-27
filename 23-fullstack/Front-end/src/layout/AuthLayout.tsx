import { Outlet } from 'react-router-dom'

export default function AuthLayout (): JSX.Element {
  return (
    <div className='py-4 min-h-screen bg-gray-50 md:grid md:items-center'>
      <main className='container mx-auto md:grid md:grid-cols-2 md:gap-10 lg:gap-10 p-5 items-center'>
        <Outlet />
      </main>
    </div>
  )
}
