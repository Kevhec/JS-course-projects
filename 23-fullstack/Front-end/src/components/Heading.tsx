interface Props {
  text: string
  highlightedText: string
}
export default function Heading ({ text, highlightedText }: Props): JSX.Element {
  return (
    <h1 className='text-indigo-600 font-black text-3xl md:text-4xl lg:text-6xl text-center md:text-left'>
      {text} <span className='text-black block'>{highlightedText}</span>
    </h1>
  )
}
