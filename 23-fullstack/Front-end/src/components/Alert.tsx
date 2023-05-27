import { BsFillCheckSquareFill } from 'react-icons/bs'
import { MdError } from 'react-icons/md'
import { IconContext } from 'react-icons'

interface Props {
  children: string
  isError?: boolean
}
export default function Alert ({ children, isError }: Props): JSX.Element {
  return (
    <IconContext.Provider value={{ size: '1.5em', className: 'min-w-1.5' }}>
      <div className='mb-5 last:mb-0'>
        <p className={`${isError === true ? 'text-red-500' : 'text-green-500'} leading-6 flex items-center gap-3 font-semibold`}>
          {isError === true ? <MdError /> : <BsFillCheckSquareFill />}
          {children}
        </p>
      </div>
    </IconContext.Provider>
  )
}
