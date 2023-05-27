import { useState, useEffect } from 'react'
import Button from './components/Button'
import moneyFormatter from './utils/moneyFormatter'
import Range from './components/Range'
import Select from './components/Select'
import totalAmmountCalc from './utils/totalAmmountCalc'

export default function App () {
  const [ammount, setAmmount] = useState(500000)
  const [term, setTerm] = useState(6)
  const [total, setTotal] = useState(0)

  const RANGE_MIN = 10000
  const RANGE_MAX = 1000000
  const RANGE_STEP = 1000

  const handleRangeChange = (evt) => {
    const newAmmount = Number(evt.target.value)
    setAmmount(newAmmount)
  }

  const handleIncrementDecrement = (type) => {
    // Set action of increment or decrement according to button type and range step
    const action = type === 'increment' ? RANGE_STEP : -RANGE_STEP
    const newAmmount = ammount + action

    // Handle select min / max limits
    if (newAmmount < RANGE_MIN || newAmmount > RANGE_MAX) {
      return
    }

    setAmmount(newAmmount)
  }

  const handleSelectChange = (evt) => {
    const newTerm = Number(evt.target.value)
    setTerm(newTerm)
  }

  useEffect(() => {
    setTotal(totalAmmountCalc(ammount, term))
  }, [ammount, term])

  return (
    <div className='my-20 max-w-lg mx-auto bg-white shadow p-10'>
      <h1 className='text-4xl font-extrabold text-gray-500 text-center'>
        ¿Cuánto <span className='text-indigo-600'>dinero </span>necesitas?
      </h1>

      <div className='flex justify-between my-6'>
        <Button type='decrement' onClick={handleIncrementDecrement}>
          -
        </Button>
        <Button type='increment' onClick={handleIncrementDecrement}>
          +
        </Button>
      </div>

      <Range
        min={RANGE_MIN}
        max={RANGE_MAX}
        step={RANGE_STEP}
        ammount={ammount}
        onChange={handleRangeChange}
      />

      <p className='text-center my-10 text-5xl font-extrabold text-indigo-600'>
        {moneyFormatter(ammount)}
      </p>

      <Select
        term={term}
        onChange={handleSelectChange}
      />

      <div className='my-5 space-y-3 bg-gray-50 p-5'>
        <h2 className='text-2xl font-extrabold text-gray-500 text-center'>
          Resumen <span className='text-indigo-600'>de Pagos </span>
        </h2>
        <p className='text-xl text-gray-500 text-center font-bold'>
          <span className='text-indigo-600'>{term}</span> Meses
        </p>
        <p className='text-xl text-gray-500 text-center font-bold'>
          <span className='text-indigo-600'>{moneyFormatter(total)}</span> Total
        </p>
        <p className='text-xl text-gray-500 text-center font-bold'>
          <span className='text-indigo-600'>{moneyFormatter(total / term)}</span> Por cuota
        </p>
      </div>
    </div>
  )
}
