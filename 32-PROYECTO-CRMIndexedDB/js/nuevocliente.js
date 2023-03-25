import connectDataBase from "./services/connectDB.js"
import generateAlert from "./services/generateAlert.js"
import validateClient from "./services/validation.js"

(function () {
  let db
  const form = document.getElementById('formulario')
  
  document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', handleSubmit)

    connectDataBase('crm', 1)
      .then(dataBase => {
        db = dataBase
      })
      .catch(error => {
        console.error(error)
      })
  })

  function handleSubmit (evt) {
    evt.preventDefault()
    const formData = new FormData(form)

    if(!validateClient(form, formData)) return

    let client = {}
    formData.forEach((value, key) => {
      client[key] = value
    })
    client.id = Date.now()

    createNewClient(client)
  }

  function createNewClient (client) {
    const transaction = db.transaction(['crm'], 'readwrite')
    const objectStore = transaction.objectStore('crm')

    objectStore.add(client)

    transaction.onerror = (e) => {
      generateAlert(form, 'error', 'Hubo un error al agregar en la base de datos')
      console.error(e)
    }

    transaction.oncomplete = () => {
      generateAlert(form, 'success', 'Cliente agregado correctamente')

      setTimeout(() => {
        window.location.href = 'index.html'
      }, 3000);
    }
  }
})()