import { fetchRecipes } from './services/recipeAPI.js'
import constants from './utils/constants.js'

const resultContainer = document.getElementById('resultado')
const spinner = document.querySelector('.dot-spinner')
const modal = new bootstrap.Modal('#modal', {})
const favoritesContainer = document.querySelector('.favoritos')

document.addEventListener('DOMContentLoaded', () => {
  initializeApp()
  if(spinner) {
    spinner.remove()
  }
})

if(favoritesContainer) {
  getFavorites()
}

function initializeApp () {
  const catSelect = document.getElementById('categorias')
  if(catSelect) {
    catSelect.addEventListener('change', getMeals)
    fillCategories(catSelect)
  } else {
    return
  }
}

async function fillCategories (catSelect) {
  try {
    const { categories } = await fetchRecipes(constants.CAT_ENDPOINT)
  
    categories.forEach(category => {
      const { strCategory } = category
  
      const option = document.createElement('option')
      option.value = strCategory
      option.textContent = strCategory
  
      catSelect.appendChild(option)
    })
  } catch (error) {
    console.error(error)
  }
}

async function getMeals (evt) {
  resultContainer.innerHTML = ''

  const category = evt.target.value
  try {
    resultContainer.append(spinner)
    const { meals } = await fetchRecipes(constants.FILTER_ENDPOINT, category)
    if(meals) fillResults(meals, resultContainer)
  } catch (error) {
    console.error(error)
  } finally {
    spinner.remove()
  }
}

function fillResults (meals, mealsContainer) {
  meals.forEach(meal => {
    const {
      idMeal: id,
      strMeal: name,
      strMealThumb: image
    } = meal

    const container = document.createElement('div')
    container.classList.add('col-md-4')
    container.innerHTML = `
      <div class="card mb-4">
        <figure>
          <img class="card-img-top" src="${image}" alt="Image of the meal ${name}" style="width=700px; aspect-ratio: 1/1" />
        </figure>
        <div class="card-body">
          <h3 class="card-title mb-3">${name}</h3>
          <button class="btn btn-danger w-100">See recipe</button>
        </div>
      </div>
    `

    const cardButton = container.querySelector('.btn')
    cardButton.onclick = () => {
      selectMeal(id)
      modal.show()
    }

    mealsContainer.appendChild(container)
  })
}

async function selectMeal (id) {
  try {
    const { meals: meal } = await fetchRecipes(constants.LOOKUP_ENDPOINT, id)
    fillModal(meal[0])
  } catch (error) {
    console.error(error)
  }
}

function fillModal (meal) {
  if (!meal) return

  const {
    idMeal: id,
    strInstructions: instructions,
    strMeal: name,
    strMealThumb: image
  } = meal
  
  const modalTile = document.querySelector('.modal .modal-title')
  const modalBody = document.querySelector('.modal .modal-body')

  modalTile.textContent = name
  modalBody.innerHTML = `
    <figure>
      <img class="img-fluid" src="${image}" alt="Image of the meal ${name}" style="width=100%; aspect-ratio: 1/1" /> 
    </figure>
    <h3 class="my-3">Ingredients</h3>
    <ul class="list-group ingredientsList"></ul>
    <h3 class="my-3">Instructions</h3>
    <ul class="list-group instructionsList"></ul>
  `
  const instructionsArray = instructions.split(/\r?\n/).filter(element => element.length > 1)
  const instructionsContainer = modalBody.querySelector('.instructionsList')
  instructionsContainer.innerHTML = instructionsArray.map(instruction => {
      if(instruction.trim()) {
       return `<li class="list-group-item">${instruction}</li>`
      } else {
        return null
      }
  }).join('')

  // Ammounts

  const ingredientsContainer = document.querySelector('.ingredientsList')
  for (let i = 1; ; i++) {
    if(meal[`strIngredient${i}`]) {
      const ingredient = meal[`strIngredient${i}`]
      const ammount = meal[`strMeasure${i}`]

      const groupItem = document.createElement('li')
      groupItem.classList.add('list-group-item', 'd-flex', 'justify-content-between')

      groupItem.innerHTML = `
        <p class="mb-0 fw-bold">${ingredient}</p>
        <p class="mb-0">${ammount}</p>
      `

      ingredientsContainer.appendChild(groupItem)
    } else {
      break
    }
  }

  // Footer buttons
  const modalFooter = document.querySelector('.modal-footer')
  modalFooter.innerHTML = ''

  const favoriteBtn = document.createElement('button')
  favoriteBtn.classList.add('btn', 'btn-danger', 'col')
  favoriteBtn.textContent = toggleButtonText(id)

  favoriteBtn.onclick = () => {
    const currentText = favoriteBtn.textContent
    if(currentText === 'Remove favorite') {
      favoriteBtn.textContent = 'Add to favorites'
    } else {
      favoriteBtn.textContent = 'Remove favorite'
    }
    
    handleFavorites({
      idMeal: id,
      strMeal: name,
      strMealThumb: image
    })
  }

  const closeModalBtn = document.createElement('button')
  closeModalBtn.classList.add('btn', 'btn-secondary', 'col')
  closeModalBtn.textContent = 'Close'
  closeModalBtn.onclick = () => modal.hide()

  modalFooter.appendChild(favoriteBtn)
  modalFooter.appendChild(closeModalBtn)
}

function handleFavorites (recipe) {

  const favorites = JSON.parse(localStorage.getItem('favorites')) ?? []
  
  if(isElementOnStorage('favorites', recipe.idMeal)) {
    const newFavorites = favorites.filter(item => item.idMeal !== recipe.idMeal)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
    showToast(`Removed ${recipe.strMeal} from favorites`)
    return
  }

  localStorage.setItem('favorites', JSON.stringify([...favorites, recipe]))
  showToast(`Added ${recipe.strMeal} to favorites`)
}

function isElementOnStorage (storageName, id) {
  const fromStorage = JSON.parse(localStorage.getItem(storageName))
  if(!fromStorage) return false

  return fromStorage.find(item => item.idMeal === id)
}

function toggleButtonText (id) {
  if(isElementOnStorage('favorites', id)) {
    return 'Remove favorite'
  } else {
    return 'Add to favorites'
  }
}

function showToast (message) {
  const toastDiv = document.getElementById('toast')
  const toastBody = document.querySelector('.toast-body')
  const toast = new bootstrap.Toast(toastDiv)

  toastBody.textContent = message
  toast.show()
}

function getFavorites () {
  const favorites = JSON.parse(localStorage.getItem('favorites')) ?? []
  if (favorites.length) {
    fillResults(favorites, resultContainer)
  } else {
    const noFavorites = document.createElement('p')
    noFavorites.classList.add('fs-4', 'text-center', 'fw-bold', 'mt-5')
    noFavorites.textContent = 'No favorites yet'
    favoritesContainer.appendChild(noFavorites)
  }
}
