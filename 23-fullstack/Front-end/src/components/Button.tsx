import { MouseEventHandler } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  onClick: MouseEventHandler
  value: string
  disabled?: boolean
  className?: string
  dataset?: {
    [key: string]: string | undefined
  }
  type?: 'button' | 'submit' | undefined
}

export default function Button ({ value, onClick, disabled, className, dataset, type }: Props): JSX.Element {
  const buttonClasses = twMerge(
    'bg-indigo-700',
    'w-full',
    'py-3',
    'px-10',
    'rounded-md',
    'text-white',
    'uppercase',
    'font-bold',
    'mt-5',
    'hover:bg-indigo-800',
    'hover:cursor-default',
    'active:bg-indigo-900',
    'lg:w-auto',
    'disabled:bg-indigo-400',
    'transition-colors',
    className
  )

  return (
    <button
      type={type !== undefined ? type : 'submit'}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...dataset}
    >
      {value}
    </button>
  )
}
