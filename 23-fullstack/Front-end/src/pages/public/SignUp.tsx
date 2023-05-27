import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import axios from 'axios'

import formValidations from '../../utils/inputValidations'

import Input from '../../components/Input'
import Button from '../../components/Button'
import Loader from '../../components/Loader/Loader'
import Alert from '../../components/Alert'

export default function SignUp (): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [message, setMessage] = useState('')
  // Get Methods from custom hook
  const methods = useForm()
  // State to save newPassword value to check if second is the same
  const [passwordValue, setPasswordValue] = useState(null)
  // Get props needed for inputs, included validations
  const {
    nameValidation,
    emailValidation,
    passwordValidation,
    repeatPasswordValidation
  } = formValidations(passwordValue)

  // New submit function that allows react-hook-form to validate the data
  const onSubmit = methods.handleSubmit(async data => {
    setHasError(false)
    setFinished(false)
    setLoading(true)
    const { name, email, password } = data
    try {
      const URL = `${import.meta.env.VITE_API_BASEURL}/veterinarian`

      const { data } = await axios.post(URL, { name, email, password })

      setMessage(data.message)
    } catch (error: any) {
      setHasError(true)
      setMessage(error?.response?.data?.message)
    } finally {
      setLoading(false)
      setFinished(true)
    }
  })

  // Effect to check changes on passwordValidation to extract it's name and initialize
  // watch method to compare it with repeat password
  useEffect(() => {
    const subscription = methods.watch(passwordValidation.name)
    setPasswordValue(subscription)
    return () => subscription.unsubscribe
  }, [passwordValidation])

  return (
    <>
      <h1 className='text-indigo-600 font-black text-3xl md:text-4xl lg:text-6xl text-center md:text-left'>
        Create Your <span className='text-black block'>Account</span>
      </h1>
      <div className='mt-12 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {/* Wrap form inside FormProvider */}
        <FormProvider {...methods}>
          {loading
            ? <Loader />
            : finished && (
              <Alert isError={hasError}>
                {message}
              </Alert>
            )}
          {/* onSubmit will be used just for preventDefault behavior
              noValidate relies validation on react-hoof-form */}
          <form
            onSubmit={evt => evt.preventDefault()}
            noValidate
          >
            <Input {...nameValidation} />
            <Input {...emailValidation} />
            <Input {...passwordValidation} />
            <Input {...repeatPasswordValidation} />
            {/* Instead of a submit event, we use on form button the previously created submit function */}
            <Button value='Create Account' onClick={onSubmit} />
          </form>
        </FormProvider>
        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link
            to='/'
            className='block text-center mb-5 text-gray-500 hover:text-indigo-600 active:text-indigo-800'
          >
            Already have an account? Try log-in!
          </Link>
        </nav>
      </div>
    </>
  )
}
