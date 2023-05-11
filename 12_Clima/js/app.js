const container = document.querySelector('.container')
const result = document.getElementById('resultado')
const form = document.getElementById('formulario')
const spinner = document.querySelector('.sk-fading-circle')

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?'
const API_KEY = '2ca98e42dcb0945916eae12b1f441a41'

document.addEventListener('DOMContentLoaded', () => {
  form.addEventListener('submit', searchWeather)
})

function searchWeather (evt) {
  evt.preventDefault()

  const city = document.getElementById('ciudad').value.trim().toLowerCase()
  const country = document.getElementById('pais').value

  // Validation
  if(city === '' || country === '') {
    generateAlert('Ambos campos son obligatorios')
    return
  }

  apiRequest(city, country)
}

function generateAlert (message) {
  if(document.querySelector('.alert')) return

  const alertContainer = document.createElement('div')
  alertContainer.classList.add('alert', 'bg-red-100', 'border-red-400', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6')

  const alertContent = document.createElement('p')
  alertContent.classList.add('text-red-700', 'text-center')
  alertContent.innerHTML = `
    <strong>¡Error!</strong>
    <span class="block">${message}</span>
  `

  alertContainer.appendChild(alertContent)

  container.appendChild(alertContainer)

  setTimeout(() => {
    alertContainer.remove()
  }, 3000);
}

function apiRequest (city, country) {
  const LOCATION = `q=${city},${country}`
  const LANG = '&lang=es'
  const ID = `&appid=${API_KEY}`
  const UNITS = '&units=metric'

  spinner.classList.remove('hidden')
  fetch(BASE_URL + LOCATION + LANG + ID + UNITS)
  .then(response => {
      if(response.status === 404) {
        throw new Error('404 Ciudad no encontrada', {cause: response})
      } else {
        return response.json()
      }
    })
    .then(data => displayWeather(data))
    .catch(error => generateAlert(error))
    .finally(spinner.classList.add('hidden'))
}

function displayWeather(weatherData) {
  console.log(weatherData)
  const resultPlaceHolder = document.getElementById('result-placeholder')

  if(weatherData) {
    resultPlaceHolder.classList.add('hidden')
  } else {
    resultPlaceHolder.classList.remove('hidden')
  }

  if(document.querySelector('.result-container')) {
    document.querySelector('.result-container').remove()
  }

  const {
    main: {
      temp,
      temp_max: tempMax,
      temp_min: tempMin,
      feels_like: feelsLike
    },
    name,
    sys: {country}
  } = weatherData

  const location = document.createElement('p')
  location.innerHTML = `Clima en ${name} - ${country}`
  location.classList.add('font-bold', 'text-xl')
  
  const actualTemp = document.createElement('p')
  actualTemp.innerHTML = `${Math.floor(temp)} &#8451;`
  actualTemp.classList.add('font-bold', 'text-6xl')
  
  const maximumTemp = document.createElement('p')
  maximumTemp.innerHTML = `Max: ${Math.floor(tempMax)} &#8451;`
  maximumTemp.classList.add('text-xl')
  
  const minimumTemp = document.createElement('p')
  minimumTemp.innerHTML = `Min: ${Math.floor(tempMin)} &#8451;`
  minimumTemp.classList.add('text-xl')
  
  const thermalSensation = document.createElement('p')
  thermalSensation.innerHTML = `Sensación térmica: ${Math.floor(feelsLike)} &#8451;`
  thermalSensation.classList.add('text-xl')

  const resultContainer = document.createElement('div')
  resultContainer.classList.add('result-container', 'text-center', 'text-white')

  resultContainer.appendChild(location)
  resultContainer.appendChild(actualTemp)
  resultContainer.appendChild(maximumTemp)
  resultContainer.appendChild(minimumTemp)
  resultContainer.appendChild(thermalSensation)

  result.appendChild(resultContainer)
}
