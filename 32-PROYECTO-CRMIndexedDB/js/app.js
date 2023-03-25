(function () {
  let db
  
  document.addEventListener('DOMContentLoaded', () => {
    createDB()
    if (window.indexedDB.open('crm', 1)) {
      displayData()
    }
  })

  function createDB() {
    const dataBaseCreation = window.indexedDB.open('crm', 1)

    dataBaseCreation.onerror = () => {
      console.error('error en la creación de la base de datos')
    }

    dataBaseCreation.onsuccess = () => {
      db = dataBaseCreation.result
    }

    dataBaseCreation.onupgradeneeded = (evt) => {
      const dbInstance = evt.target.result

      const objectStore = dbInstance.createObjectStore('crm', {
        keyPath: 'id',
        autoIncrement: true
      })

      // Campos
      objectStore.createIndex('id', 'id', { unique: true })
      objectStore.createIndex('name', 'name', { unique: false })
      objectStore.createIndex('email', 'email', { unique: true })
      objectStore.createIndex('tel', 'tel', { unique: false })
      objectStore.createIndex('company', 'company', { unique: false })
    }
  }

  function displayData () {
    const clientsContainer = document.getElementById('listado-clientes')

    const openConnection = window.indexedDB.open('crm', 1)

    openConnection.onerror = () => {
      console.error('Error al obtener los datos')
    }

    openConnection.onsuccess = () => {
      db = openConnection.result
      
      const objectStore = db.transaction('crm').objectStore('crm')

      objectStore.openCursor().onsuccess = (evt) => {
        const cursor = evt.target.result

        if (cursor) {
          const {nombre, telefono, empresa, email, id} = cursor.value

          const tableRow = document.createElement('tr')

          // Name table data
          const tdName = document.createElement('td')
          const pName = document.createElement('p')
          const pEmail = document.createElement('p')
          tdName.classList.add('px-6', 'py-4', 'whitespace-no-wrap', 'border-b', 'border-gray-20')
          pName.classList.add('text-sm', 'leading-5', 'font-medium', 'text-gray-700', 'text-lg',  'font-bold')
          
          pName.textContent = nombre
          pEmail.textContent = email

          tdName.appendChild(pName)
          tdName.appendChild(pEmail)

          // Tel table data
          const tdTel = document.createElement('td')
          const pTel = document.createElement('p')
          tdTel.classList.add('px-6', 'py-4', 'whitespace-no-wrap', 'border-b', 'border-gray-200')
          pTel.classList.add('text-gray-700')
          pTel.textContent = telefono

          tdTel.appendChild(pTel)

          // Company table data
          const tdComp = document.createElement('td')
          const pComp = document.createElement('p')
          tdComp.classList.add('px-6', 'py-4', 'whitespace-no-wrap', 'border-b', 'border-gray-200',  'leading-5', 'text-gray-700')
          pComp.classList.add('text-gray-600')
          pComp.textContent = empresa

          tdComp.appendChild(pComp)

          // Buttons
          const tdButtons = document.createElement('td')

          const editButton = document.createElement('a')
          editButton.classList.add('text-teal-600', 'hover:text-teal-900', 'mr-5', 'cursor-default')
          editButton.href = `editar-cliente.html?id=${id}`
          editButton.textContent = 'Editar'

          const deleteButton = document.createElement('a')
          deleteButton.classList.add('text-red-600', 'hover:text-red-900', 'cursor-default')
          deleteButton.textContent = 'Eliminar'
          deleteButton.dataset.id = id
          deleteButton.addEventListener('click', removeClient)

          tdButtons.appendChild(editButton)
          tdButtons.appendChild(deleteButton)

          // Append to row
          tableRow.appendChild(tdName)
          tableRow.appendChild(tdTel)
          tableRow.appendChild(tdComp)
          tableRow.appendChild(tdButtons)

          // Append row to container
          clientsContainer.appendChild(tableRow)
          
          cursor.continue()
        }
      }
    }

    function removeClient (evt) {
      const clientId = Number(evt.target.dataset.id)

      const transaction = db.transaction(['crm'], 'readwrite')
      transaction.objectStore('crm').delete(clientId)

      transaction.oncomplete = () => {
        evt.target.parentElement.parentElement.remove()
      }
    }
  }
})()