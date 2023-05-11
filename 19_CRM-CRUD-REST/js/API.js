const URL = 'http://localhost:4000/clientes'

// upload new client
export async function newClient (client) {
  try {
    await fetch(URL, {
      method: 'POST',
      body: JSON.stringify( client ),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    window.location.href = 'index.html'
  } catch (error) {
    console.error(error)
  }
}

// get clients
export async function getClients (...id) {
  try {
    const res = await fetch(URL + `/${id}`)
    const json = await res.json()
    return json
  } catch (error) {
    console.error(error)
  }
}

// delete client
export async function removeClient (id) {
  try {
    fetch(`${URL}/${id}`, {
      method: 'DELETE'
    })
  } catch (error) {
    console.error(error)
  }
}

// edit client
export async function editClient (client, id) {
  try {
    await fetch(URL + `/${id}`, {
      method: 'PUT',
      body: JSON.stringify( client ),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    window.location.href = 'index.html'
  } catch (error) {
    console.error(error)
  }
}
