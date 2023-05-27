import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'

import { initialAuthState } from '../../context/AuthProvider'
import formValidations from '../../utils/inputValidations'
import axiosClient from '../../config/axios'
import useAuth from '../../hooks/useAuth'

import Input from '../../components/Input'
import Button from '../../components/Button'
import Alert from '../../components/Alert'
import Loader from '../../components/Loader/Loader'

export default function SignIn (): JSX.Element {
  const methods = useForm()
  const { emailValidation, passwordValidation } = formValidations()
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [message, setMessage] = useState('')
  const { auth, setAuth } = useAuth()
  const navigate = useNavigate()

  const onSubmit = methods.handleSubmit(async formData => {
    setHasError(false)
    setLoading(true)
    const { email, password } = formData
    try {
      const { data } = await axiosClient.post('veterinarian/login', { email, password })
      localStorage.setItem('vcpa_token', data.token)
      setAuth(data.user)
      navigate('/admin')
    } catch (error: any) {
      setHasError(true)
      setMessage(error.response.data.message)
      setAuth(initialAuthState)
    } finally {
      setLoading(false)
    }
  })

  useEffect(() => {
    if (localStorage.getItem('vcpa_token') !== null && auth._id !== null) {
      navigate('/admin')
    }
  }, [])

  return (
    <>
      <div className=''>
        <h1 className='text-indigo-600 font-black text-3xl md:text-4xl lg:text-6xl text-center md:text-left'>
          Patient Administration <span className='text-black block'>Portal</span>
        </h1>
      </div>
      <div className='mt-12 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white relative'>
        {
          loading && <Loader className='absolute inset-0 flex items-center justify-center w-full bg-white rounded-xl' />
        }
        <FormProvider {...methods}>
          {hasError && (
            <Alert isError={hasError}>
              {message}
            </Alert>
          )}
          <form
            onSubmit={evt => evt.preventDefault()}
            noValidate
          >
            <Input {...emailValidation} id='signInEmail' />
            <Input {...passwordValidation} id='signInPassword' />
            <Button value='Log-In' onClick={onSubmit} />
          </form>
        </FormProvider>
        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link
            to='/signup'
            className='block text-center mb-5 md:mb-0 text-gray-500 hover:text-indigo-600 active:text-indigo-800'
          >
            Need an account? Register now!
          </Link>
          <Link
            to='/forgotpassword'
            className='block text-center text-gray-500 hover:text-indigo-600 active:text-indigo-800'
          >
            Reset my password!
          </Link>
        </nav>
      </div>
    </>
  )
}
