export default function Range ({ min, max, step, ammount, onChange }) {
  return (
    <input
      type='range'
      name='range'
      id='rangeInput'
      className='w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600'
      min={min}
      max={max}
      step={step}
      value={ammount}
      onChange={onChange}
    />
  )
}
