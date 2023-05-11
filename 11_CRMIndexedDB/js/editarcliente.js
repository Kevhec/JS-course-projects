import connectDataBase from "./services/connectDB.js"
import generateAlert from "./services/generateAlert.js"
import validateClient from "./services/validation.js"

(function () {
  let db
  const form = document.getElementById('formulario')

  document.addEventListener('DOMContentLoaded', () => {
    
    const URLParams = new URLSearchParams(window.location.search)
    const clientId = URLParams.get('id')
    
    if (clientId) {
      connectDataBase('crm', 1)
        .then(dataBase => {
          db = dataBase
          obtainClient(clientId)
        })
        .catch(error => {
          console.error(error)
        })
    }

    form.addEventListener('submit', updateClient)
  })

  function obtainClient (id) {
    const transaction = db.transaction(['crm'], 'readonly')
    const objectStore = transaction.objectStore('crm')
  
    const request = objectStore.get(Number(id))
    
    request.onsuccess = (event) => {
      const client = event.target.result
      fillForm(client)
    }
  }

  function fillForm (object) {
    const entries = Object.entries(object)
    
    entries.forEach(entry => {
      const input = form.querySelector(`input[id="${entry[0]}"]`)
      input.value = entry[1]
    })
  }

  function updateClient (evt) {
    evt.preventDefault()
    const formData = new FormData(form)

    if (!validateClient(form, formData)) return

    let updatedClient = {}
    formData.forEach((value, key) => {
      if (key === 'id') {
        value = Number(value)
      }
      updatedClient[key] = value
    })
    
    const transaction = db.transaction(['crm'], 'readwrite')
    const objectStore = transaction.objectStore('crm')

    objectStore.put(updatedClient)

    transaction.oncomplete = () => {
      generateAlert(form, 'success', 'Editado correctamente')

      setTimeout(() => {
        window.location.href = 'index.html'
      }, 3000);
    }
  }
})()