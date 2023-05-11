import { editClient, getClients } from './API.js'

;(function () {
  const form = document.getElementById('formulario')
  const clientId = new URL(window.location.href).searchParams.get('id')

  document.addEventListener('DOMContentLoaded', () => {
    getClients(clientId).then(res => fillForm(res))
    form.addEventListener('submit', handleSubmit)
  })

  function fillForm(clientObj) {
    const entries = Object.entries(clientObj)
    for (const [key, value] of entries) {
      form.elements[key].value = value
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault()

    const fields = Object.fromEntries(
      new FormData(form)
    )

    const isEmpty = Object.values(fields).some(entry => !entry)

    if (isEmpty) {
      createAlert(form, 'error', 'Todos los campos son requeridos')
      return
    } 
    
    editClient(fields, clientId)
  }
})()
