import { newClient } from './API.js'
import { createAlert } from './funciones.js'

(function() {
  const form = document.getElementById('formulario')
  form.addEventListener('submit', handleSubmit)

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
    
    newClient(fields)
  }
})()