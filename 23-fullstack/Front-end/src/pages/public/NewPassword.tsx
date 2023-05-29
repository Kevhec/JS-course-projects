import { FormProvider, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { BsInfoCircle } from 'react-icons/bs'

import formValidations from '../../utils/inputValidations'
import axiosClient from '../../config/axios'

import Button from '../../components/Button'
import Input from '../../components/Input'
import Alert from '../../components/Alert'
import Loader from '../../components/Loader/Loader'

export default function NewPassword (): JSX.Element {
  const methods = useForm()
  const params = useParams()
  const { token } = params
  const [passwordValue, setPasswordValue] = useState(null)
  const [hasError, setHasError] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)
  const navigate = useNavigate()

  const {
    passwordValidation,
    repeatPasswordValidation
  } = formValidations(passwordValue)

  const onSubmit = methods.handleSubmit(async formData => {
    setLoading(true)
    setHasError(false)
    setHasFinished(false)
    try {
      const { password } = formData
      const endpoint = `/veterinarian/forgotten-password/${token !== undefined ? token : ''}`
      const { data } = await axiosClient.post(endpoint, { newPassword: password })
      setMessage(data.message)
      setHasFinished(true)
    } catch (error: any) {
      setMessage(error.response.data.message)
      setHasError(true)
    } finally {
      setLoading(false)
    }
  })

  const verification = async (endpoint: string): Promise<void> => {
    setHasError(false)
    setLoading(true)
    try {
      const { data } = await axiosClient(endpoint)
      setMessage(data.message)
    } catch (error: any) {
      setHasError(true)
      setMessage(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const endpoint = `/veterinarian/forgotten-password/${token !== undefined ? token : ''}`
    void verification(endpoint)
  }, [])

  useEffect(() => {
    const subscription = methods.watch(passwordValidation.name)
    setPasswordValue(subscription)
    return () => subscription.unsubscribe
  }, [passwordValidation])

  useEffect(() => {
    let timeOut: number
    if (hasFinished) {
      timeOut = setTimeout(() => {
        navigate('/')
      }, 6000)
    }
    return () => clearTimeout(timeOut)
  }, [hasFinished])

  return (
    <>
      <h1 className='text-indigo-600 font-black text-3xl md:text-4xl lg:text-6xl text-center md:text-left'>
        Write Your <span className='text-black block'>New Password</span>
      </h1>
      <div className='mt-12 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        <FormProvider {...methods}>
          {
            loading
              ? <Loader />
              : (
                <>
                  <Alert isError={hasError}>
                    {message}
                  </Alert>
                </>
                )
            }
          <form
            onSubmit={evt => evt.preventDefault()}
            noValidate
          >
            <Input {...passwordValidation} label='New Password' disabled={loading || hasError} />
            <Input {...repeatPasswordValidation} disabled={loading || hasError} />
            {/* Instead of a submit event, we use on form button the previously created submit function */}
            <Button value='Set new password' onClick={onSubmit} disabled={loading || hasError} />

          </form>
          {hasFinished && (
            <IconContext.Provider value={{ size: '1.4em', className: 'inline-block' }}>
              <p className='text-gray-600 flex items-center gap-3 leading-none mt-5'>
                <BsInfoCircle /> You're being redirected to the log-in page shortly
              </p>
            </IconContext.Provider>
          )}
        </FormProvider>
      </div>
    </>
  )
}
