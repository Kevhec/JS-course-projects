const form = document.getElementById('table-form')
const resumeContainer = document.querySelector('#resumen .contenido')
const billContainerTemplate = document.getElementById('billContainer')

const categories = {
  1: 'Comida',
  2: 'Bebidas',
  3: 'Postres'
}

let client = {
  table: '',
  time: '',
  dishes: new Map()
}

form.addEventListener('submit', handleSubmit)

function handleSubmit (evt) {
  evt.preventDefault()

  // Create table object with form info
  const table = Object.fromEntries(
    new FormData(evt.target)
  )

  // Validate data
  const isEmpty = Object.values(table).some(value => !value)

  if(isEmpty) {
    showAlert('Ambos campos son requeridos')
    return
  }

  client = {
    ...client,
    ...table
  }

  const tableModal = document.getElementById('formulario')
  const tableModalInstance = bootstrap.Modal.getInstance(tableModal)
  tableModalInstance.hide()

  // TODO: process and display table data, also add dishes array

  showHiddenSections()

  // Fetch and display dishes from API
  getDishesFromApi()
    .then(dishes => showDishes(dishes))
}

function showHiddenSections () {
  const hiddenSections = document.querySelectorAll('.d-none')
  hiddenSections.forEach(section => section.classList.remove('d-none'))
}

async function getDishesFromApi () {
  const API_URL = 'http://localhost:4000/platillos'
  try {
    const res = await fetch(API_URL)
    return await res.json()
  } catch (error) {
    console.error(error)
  }  
}

function showDishes (dishes) {
  const container = document.querySelector('#platillos .contenido')

  dishes.forEach(dish => {
    const { id, categoria, nombre, precio } = dish

    const row = document.createElement('div')
    row.classList.add('row', 'border-bottom')

    const nameP = document.createElement('p')
    nameP.classList.add('col-md-4', 'py-3')
    nameP.textContent = nombre

    const priceP = document.createElement('p')
    priceP.classList.add('col-md-3')
    priceP.textContent = `$ ${precio}`

    const categoryP = document.createElement('p')
    categoryP.classList.add('col-md-3')
    categoryP.textContent = categories[categoria]

    const ammountInput = document.createElement('input')
    ammountInput.type = 'number'
    ammountInput.id = `product-${id}`
    ammountInput.name = 'ammount'
    ammountInput.value = 0
    ammountInput.min = 0
    ammountInput.classList.add('form-control')
    ammountInput.onchange = () => {
      const ammountValue = parseInt(ammountInput.value)
      handleChange({ ...dish, ammountValue })
    }

    const ammountInputDiv = document.createElement('div')
    ammountInputDiv.classList.add('col-md-2')
    ammountInputDiv.appendChild(ammountInput)

    row.appendChild(nameP)
    row.appendChild(priceP)
    row.appendChild(categoryP)
    row.appendChild(ammountInputDiv)
    container.appendChild(row)
  })
}

function handleChange (dishInfo) {
  const {
    ammountValue,
    categoria,
    id,
    nombre,
    precio
  } = dishInfo

  const isPresent = Boolean(client.dishes.get(id))
  const isZero = ammountValue === 0

  // Update ammount or add dish to Map according to isPresent
  switch (true) {
    case isPresent: client.dishes.get(id).ammountValue = ammountValue
      break
    case !isPresent: client.dishes.set(id, { nombre, ammountValue, precio, categoria })
  }

  // Remove if ammount gets zero
  if(isPresent && isZero) {
    client.dishes.delete(id)
  }

  clearHTML('#resumen .contenido')
  displayResume()
  displayResumeForm()
}

function displayResume () {
  const billContainerCopy = billContainerTemplate.content.cloneNode(true)

  // Table info
  const table = billContainerCopy.querySelector('.tableContainer')
  table.textContent = client.table

  // Time info
  const time = billContainerCopy.querySelector('.timeContainer')
  time.textContent = client.time

  // Dishes content
  const group = document.createElement('ul')
  group.classList.add('list-group')

  client.dishes.forEach((dish, key) => {
    const { ammountValue, categoria, nombre, precio } = dish

    const item = document.createElement('li')
    item.classList.add('list-group-item')

    const itemName = document.createElement('h4')
    itemName.classList.add('my-4')
    itemName.textContent = nombre

    const itemAmmount = document.createElement('p')
    itemAmmount.classList.add('fw-bold')
    itemAmmount.innerHTML = `
      Cantidad: <span class="fw-normal">${ammountValue}</span>
    `

    const itemPrice = document.createElement('p')
    itemPrice.classList.add('fw-bold')
    itemPrice.innerHTML = `
      Precio: <span class="fw-normal">$ ${precio}</span>
    `

    const itemSubTotal = document.createElement('p')
    itemSubTotal.classList.add('fw-bold')
    itemSubTotal.innerHTML = `
      Subtotal: <span class="fw-normal">$ ${calcSubTotal(precio, ammountValue)}</span>
    `

    const itemRemoveButton = document.createElement('button')
    itemRemoveButton.classList.add('btn', 'btn-danger')
    itemRemoveButton.textContent = 'Eliminar del pedido'
    itemRemoveButton.onclick = () => {
      client.dishes.delete(key)
      clearHTML('#resumen .contenido')
      resetInput(key)
      displayResume()
      displayResumeForm()
    }

    item.appendChild(itemName)
    item.appendChild(itemAmmount)
    item.appendChild(itemPrice)
    item.appendChild(itemSubTotal)
    item.appendChild(itemRemoveButton)

    group.appendChild(item)
  })

  billContainerCopy.querySelector('.card').appendChild(group)
  resumeContainer.appendChild(billContainerCopy)
}

function displayResumeForm () {
  if (client.dishes.size === 0) {
    resetResume()
    return
  }

  const resumeFormColumn = document.createElement('div')
  resumeFormColumn.classList.add('col-md-6', 'formulario')

  const resumeFormContainer = document.createElement('div')
  resumeFormContainer.classList.add('card', 'py-2', 'px-3', 'shadow')

  resumeFormContainer.innerHTML = `
    <h3 class="my-4 text-center">Propina</h3>
    <form>
      <div class="form-check">
        <input type="radio" name="tip" value="10" id="tip10" class="form-check-input">
        <label for="tip10" class="form-check-label">10%</label>
      </div>
      <div class="form-check">
        <input type="radio" name="tip" value="25" id="tip25" class="form-check-input">
        <label for="tip25" class="form-check-label">25%</label>
      </div>
      <div class="form-check">
        <input type="radio" name="tip" value="50" id="tip50" class="form-check-input">
        <label for="tip50" class="form-check-label">50%</label>
      </div>
    </form>
  `
  const tipForm = resumeFormContainer.querySelector('form')
  const tipInputs = tipForm.querySelectorAll('input')
  tipInputs.forEach(input => {
    input.addEventListener('click', calcTip)
  })

  resumeFormColumn.appendChild(resumeFormContainer)
  resumeContainer.appendChild(resumeFormColumn)
}

function calcTip (evt) {
  // Get tip percentage
  const tip = parseInt(evt.target.value)/100

  // Calc total with no tip from client's dishes Map
  let noTipTotal = 0
  client.dishes.forEach(dish => {
    const { precio, ammountValue } = dish
    noTipTotal += calcSubTotal(precio, ammountValue)
  })

  // Overall total including tip
  const total = Math.round(noTipTotal * (1 + tip))

  displayTotal(noTipTotal, total, tip)

}

function displayTotal (noTipTotal, total, tip) {
  if(document.querySelector('.total-payment')) {
    document.querySelector('.total-payment').remove()
  }
  
  const totalDiv = document.createElement('div')
  totalDiv.classList.add('total-payment')

  const noTipTotalParagraph = document.createElement('p')
  noTipTotalParagraph.classList.add('fs-3', 'fw-bold', 'mt-5')
  noTipTotalParagraph.innerHTML = `
    Subtotal Consumo: <span class="fw-normal">$${noTipTotal}</span>
  `

  const tipParagraph = document.createElement('p')
  tipParagraph.classList.add('fs-3', 'fw-bold', 'mt-5')
  tipParagraph.innerHTML = `
    Propina: <span class="fw-normal">$${tip * noTipTotal}</span>
  `
  
  const totalParagraph = document.createElement('p')
  totalParagraph.classList.add('fs-3', 'fw-bold', 'mt-5')
  totalParagraph.innerHTML = `
    Total a Pagar: <span class="fw-normal">$${total}</span>
  `

  totalDiv.appendChild(noTipTotalParagraph)
  totalDiv.appendChild(tipParagraph)
  totalDiv.appendChild(totalParagraph)

  document.querySelector('.formulario .card').appendChild(totalDiv)
}

const calcSubTotal = (price, ammount) => price * ammount

function showAlert (message) {
  while (document.querySelector('.alertSelector')) {
    document.querySelector('.alert').remove()
  }

  const tableModalBody = document.querySelector('#formulario .modal-body')

  const messageDiv = document.createElement('div')
  messageDiv.classList.add('alertSelector', 'invalid-feedback', 'd-block', 'text-center')

  const messageP = document.createElement('p')
  messageP.textContent = message

  messageDiv.appendChild(messageP)
  tableModalBody.appendChild(messageDiv)

  setTimeout(() => {
    messageDiv.remove()
  }, 2000);
}

function clearHTML (selector) {
  const container = document.querySelector(selector)
  if(!container) return

  while (container.children[0]) {
    container.children[0].remove()
  }
}

function resetInput (id) {
  const input = document.getElementById(`product-${id}`)
  input.value = 0
}

function resetResume () {
  clearHTML('#resumen .contenido')

  const emptyMessage = document.createElement('p')
  emptyMessage.classList.add('text-center')
  emptyMessage.textContent = 'Añade los elementos del pedido'

  resumeContainer.appendChild(emptyMessage)
}
