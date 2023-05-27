import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BsInfoCircle } from 'react-icons/bs'
import { IconContext } from 'react-icons'

import axiosClient from '../../config/axios'

import Heading from '../../components/Heading'
import Loader from '../../components/Loader/Loader'
import Alert from '../../components/Alert'

export default function VerifyAccount (): JSX.Element {
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [message, setMessage] = useState('')
  const [hasFinished, setHasFinished] = useState(false)
  const navigate = useNavigate()

  const verification = async (endpoint: string): Promise<void> => {
    setHasError(false)
    setHasFinished(false)
    setLoading(true)
    try {
      const { data } = await axiosClient(endpoint)
      setMessage(data.message)
    } catch (error: any) {
      setHasError(true)
      setMessage(error.response.data.message)
    } finally {
      setLoading(false)
      setHasFinished(true)
    }
  }

  useEffect(() => {
    const { token } = params
    const endpoint = `/veterinarian/confirm/${token !== undefined ? token : ''}`
    void verification(endpoint)
  }, [])

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
      <Heading text='Verifying Your' highlightedText='Account' />
      <div className='p-2 shadow-lg px-5 py-5 rounded-xl bg-white'>
        {
          loading
            ? <Loader />
            : (
              <>
                <Alert isError={hasError}>
                  {message}
                </Alert>
                <IconContext.Provider value={{ size: '1.4em', className: 'inline-block' }}>
                  <p className='text-gray-600 flex items-center gap-3 leading-none'>
                    <BsInfoCircle /> You're being redirected to the log-in page shortly
                  </p>
                </IconContext.Provider>
              </>
              )
        }
      </div>
    </>
  )
}
