import './Loader.css'

interface Props {
  className?: string | undefined
}

export default function Loader ({ className }: Props): JSX.Element {
  return (
    <div className={`spinner ${className !== undefined ? className : ''}`}>
      <div className='bounce1' />
      <div className='bounce2' />
      <div className='bounce3' />
    </div>
  )
}
