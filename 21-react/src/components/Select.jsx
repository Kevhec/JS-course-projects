export default function Select ({ term, onChange }) {
  return (
    <>
      <h2 className='text-2xl font-extrabold text-gray-500 text-center'>
        Elige un <span className='text-indigo-600'>Plazo </span>a pagar
      </h2>
      <select
        name='term'
        id='term'
        value={term}
        onChange={onChange}
        className='mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500'
      >
        <option value='6'>6 meses</option>
        <option value='12'>12 meses</option>
        <option value='24'>24 meses</option>
      </select>
    </>
  )
}
