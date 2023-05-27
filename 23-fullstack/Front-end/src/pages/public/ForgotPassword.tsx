import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'

import formValidations from '../../utils/inputValidations'
import axiosClient from '../../config/axios'

import Input from '../../components/Input'
import Button from '../../components/Button'
import Alert from '../../components/Alert'
import Loader from '../../components/Loader/Loader'

export default function ForgotPassword (): JSX.Element {
  const methods = useForm()
  const { emailValidation } = formValidations()
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const onSubmit = methods.handleSubmit(async formData => {
    const { email } = formData
    setHasError(false)
    setSuccess(false)
    setLoading(true)
    try {
      const { data } = await axiosClient.post('/veterinarian/forgotten-password', { email })
      setMessage(data.message)
    } catch (error: any) {
      console.error(error)
      setHasError(true)
      setMessage(error.response.data.message)
    } finally {
      setLoading(false)
      setSuccess(true)
    }
  })

  return (
    <>
      <div className=''>
        <h1 className='text-indigo-600 font-black text-3xl md:text-4xl lg:text-6xl text-center md:text-left'>
          Don't loose your pacients! <span className='text-black block'>Recover Your Password</span>
        </h1>
      </div>
      <div className='mt-12 md:mt-5 shadow-lg px-5 py-5 rounded-xl bg-white'>
        <FormProvider {...methods}>
          {
            loading
              ? <Loader />
              : success && (
                <>
                  <Alert isError={hasError}>
                    {message}
                  </Alert>
                </>
              )
          }
          <form onSubmit={e => e.preventDefault()}>
            <Input {...emailValidation} />
            <Button value='Recover it!' onClick={onSubmit} />
          </form>
        </FormProvider>
        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link
            to='/'
            className='block text-center mb-5 text-gray-500 hover:text-indigo-600 active:text-indigo-800'
          >
            Miss click? Go back to log-in
          </Link>
        </nav>
      </div>
    </>
  )
}
