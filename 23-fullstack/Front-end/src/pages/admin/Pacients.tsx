import { useState } from 'react'
import cn from 'classnames'

import AdminForm from '../../components/Admin/AdminForm'
import AdminPacientsList from '../../components/Admin/AdminPacientsList'

export default function Pacients (): JSX.Element {
  const [isFormVisible, setIsFormVisible] = useState(false)

  const formContainerClasses = cn(
    'md:block',
    'shadow-lg',
    'px-5',
    'py-8',
    'rounded-xl',
    'bg-white',
    {
      block: isFormVisible,
      hidden: !isFormVisible
    }
  )

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='flex flex-col md:w-1/2 lg:w-2/5 mb-5 md:mb-0'>
        <h2 className='text-center text-lg font-bold mb-5 md:mb-5'>
          Add your pacients and
          <span className='text-indigo-600 block'>manage them</span>
        </h2>
        <button
          className='bg-indigo-700 w-full py-2 px-10 rounded-md text-white text-sm leading-none uppercase font-bold mb-3 hover:bg-indigo-800 hover:cursor-default active:bg-indigo-900 lg:w-auto disabled:bg-indigo-400 transition-colors md:hidden'
          onClick={() => setIsFormVisible(!isFormVisible)}
        >
          {isFormVisible ? 'Hide Form' : 'Show Form'}
        </button>
        <div className={formContainerClasses}>
          <AdminForm />
        </div>
      </div>
      <div className='md:w-1/2 lg:w-3/5'>
        <AdminPacientsList />
      </div>
    </div>
  )
}
