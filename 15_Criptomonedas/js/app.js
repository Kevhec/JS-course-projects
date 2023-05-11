const criptoSelect = document.getElementById('criptomonedas')
const form = document.getElementById('formulario')
const resultContainer = document.getElementById('resultado')
const spinner = document.querySelector('.dot-spinner')
spinner.remove()

document.addEventListener('DOMContentLoaded', () => {
  getCryptoNames()
  form.addEventListener('submit', handleSubmit)
})

async function getCryptoNames () {
  const URL = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'

  try {
    const res = await fetch(URL)
    const { Data: data } = await res.json()

    data.forEach(coin => {
      const {
        FullName: fullName,
        Name: name
      } = coin.CoinInfo

      const option = document.createElement('option')
      option.value = name
      option.textContent = fullName

      criptoSelect.appendChild(option)
    })
  } catch (error) {
    console.error(error)
  }
}

function handleSubmit (evt) {
  evt.preventDefault()

  const fields = Object.fromEntries(
    new FormData(evt.target)
  )

  const isEmpty = Object.values(fields).some(value => !value)
  if(isEmpty) {
    printAlert('Porfavor seleccione un criptoactivo')
    return
  }

  while(resultContainer.children[0]) {
    resultContainer.children[0].remove()
  }

  resultContainer.appendChild(spinner)
  getCyptoValue(fields)
    .then(res => {
      showCryptoHTML(res)
      spinner.remove()
    })
}

function printAlert (message) {
  while (form.querySelector('.error')) {
    form.querySelector('.error').remove()
  }

  const messageContainer = document.createElement('div')
  messageContainer.classList.add('error')
  const messageParagraph = document.createElement('p')
  messageParagraph.textContent = message

  messageContainer.appendChild(messageParagraph)
  form.appendChild(messageContainer)

  setTimeout(() => {
    messageContainer.remove()
  }, 2000);
}

async function getCyptoValue ({ currency, crypto }) {
  const BASE_URL = 'https://min-api.cryptocompare.com/data/pricemultifull?'
  const fsyms = `fsyms=${crypto}`
  const tsyms = `&tsyms=${currency}`

  const res = await fetch(BASE_URL + fsyms + tsyms)
  const json = await res.json()
  return json.DISPLAY[crypto][currency]
}

function showCryptoHTML (object) {
  console.log(object)
  const {
    PRICE: price,
    HIGHDAY: highDay,
    LOWDAY: lowDay,
    CHANGEPCT24HOUR: changePCT24Hour,
    LASTUPDATE: lastUpdate
  } = object

  const priceP = document.createElement('p')
  priceP.classList.add('precio')
  priceP.innerHTML = `
    Price: <span>${price}</span>
  `

  const highDayP = document.createElement('p')
  highDayP.innerHTML = `
    Higher price today: <span>${highDay}</span>
  `

  const lowDayP = document.createElement('p')
  lowDayP.innerHTML = `
    Lower price today: <span>${lowDay}</span>
  `

  const lastHoursP = document.createElement('p')
  lastHoursP.innerHTML = `
    Variation last 24 hours: <span>${changePCT24Hour} %</span>
  `

  const lastUpdateP = document.createElement('p')
  lastUpdateP.innerHTML = `
    Updated: <span>${lastUpdate}</span>
  `
  

  resultContainer.appendChild(priceP)
  resultContainer.appendChild(highDayP)
  resultContainer.appendChild(lowDayP)
  resultContainer.appendChild(lastHoursP)
  resultContainer.appendChild(lastUpdateP)
}
