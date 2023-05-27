import { motion } from 'framer-motion'
import { MdError } from 'react-icons/md'

interface InputErrorType {
  message: string | undefined
}
const InputError = ({ message }: InputErrorType): JSX.Element => {
  return (
    <motion.p
      className='flex items-center gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md'
      {...framerError}
    >
      <MdError />
      {message}
    </motion.p>
  )
}

const framerError = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 }
}

export default InputError
