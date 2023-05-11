export default function connectDataBase (name, version) {
  return new Promise((resolve, reject) => {
    let connection = window.indexedDB.open(name, version)

    connection.onerror = () => {
      console.error('Hubo un error en la conexión')
      reject('Error when connecting to database')
    }

    connection.onsuccess = () => {
      const dataBase = connection.result
      resolve(dataBase)
    }
  })
}