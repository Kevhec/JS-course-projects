import { getClients, removeClient } from "./API.js"

  ; (function () {
    const list = document.getElementById("listado-clientes")
    document.addEventListener("DOMContentLoaded", displayClients)

    async function displayClients() {
      
      const clients = await getClients()

      clients.forEach((client) => {
        const { nombre, email, telefono, empresa, id } = client

        const row = document.createElement("tr")
        row.innerHTML = `
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                    <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                    <p class="text-gray-700">${telefono}</p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                    <p class="text-gray-600">${empresa}</p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                    <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                    <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                </td>
            `

        const deleteButton = row.querySelector('.eliminar')
        deleteButton.onclick = (e) => handleClientRemoval(e)

        list.appendChild(row)
      })
    }

    function handleClientRemoval (evt) {
      const clientId = parseInt( evt.target.dataset.cliente )
      const confirmDeletion = confirm('¿Deseas eliminar éste registro?')

      if(confirmDeletion) {
        removeClient(clientId)
        clearHTML(list)
        displayClients()
      }
    }

    function clearHTML (element) {
      while(element.children[0]) {
        element.children[0].remove()
      }
    }
  })()
