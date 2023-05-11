import { fetchImages } from './getImages.js'

const form = document.getElementById('formulario')
const resultContainer = document.getElementById('resultado')
const paginationsContainer = document.getElementById('paginacion')
const spinner = document.querySelector('.dot-spinner')

window.onload = () => {
  form.addEventListener('submit', validateForm)
  spinner.remove()
}

function validateForm (evt) {
  evt.preventDefault()
  let previousQuery
  
  const query = form.querySelector('#termino').value.trim()
  
  if(previousQuery === query) return
 
  if(!query) {
    showAlert('How empty 🙁')
  }
  
  previousQuery = query

  resultContainer.appendChild(spinner)
  fetchImages(query)
    .then(result => {
      spinner.remove()
      handleResults(result, query)
    })
}

function handleResults (results, query) {
  showImages(results)

  const pages = calcPages(results.totalHits)

  while (paginationsContainer.children[0]) {
    paginationsContainer.children[0].remove()
  }
  
  printPagination(pages, query)
}

function* createPagination (total) {
  for (let i = 1; i <= total; i++) {
    yield i;
  }
}

function calcPages (maxResults) {
  return Math.ceil(maxResults / 20)
}

function showImages (imagesJSON) {
  while(resultContainer.children[0]) {
    resultContainer.children[0].remove()
  }

  imagesJSON.hits.forEach(hit => {
    const { previewURL, largeImageURL, tags, user, likes, views } = hit
    resultContainer.innerHTML += 
    `
      <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
        <div class="bg-white rounded overflow-hidden">
          <figure class="w-full imageFig">
            <img class="w-full h-full object-contain" src="${previewURL}" alt="${tags}. Photo by ${user}" />
          </figure>
          <div class="p-4">
            <p>Liked <span class="font-bold text-blue-800">${likes}</span> times</p>
            <p>Viewed <span class="font-bold text-blue-800">${views}</span> times</p>
            <a
              class="block text-center font-bold text-white rounded mt-5 p-2 w-full bg-blue-800 hover:bg-blue-500"
              href="${largeImageURL}" target="_blank" rel="noopener noreferrer"
            >
                See full image
            </a>
          </div>
        </div>
      </div>
    `
  })
}

function printPagination (totalPages, query) {
  const iterator = createPagination(totalPages)

  while (true) {
    const { value, done } = iterator.next()
    if (done) break

    const button = document.createElement('a')
    button.href = '#'
    button.dataset.page = value
    button.textContent = value
    button.classList.add('next', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'font-bold', 'mb-4', 'rounded')

    button.onclick = () => {
      fetchImages(query, value)
        .then(results => showImages(results))
    }

    paginationsContainer.appendChild(button)
  }
}

function showAlert (message) {
  if(form.querySelector('.alert')) {
    form.querySelector('.alert').remove()
  }

  const alert = document.createElement('p')
  alert.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'alert')
  alert.textContent = message

  form.insertBefore(alert, form.children[2])
  
  setTimeout(() => {
    alert.remove()
  }, 2000);
}
