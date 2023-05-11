// Variables
const form = document.getElementById('formulario');
console.log(form)
const tweetsList = document.getElementById('lista-tweets');
let tweets = [];

// Events
eventListeres()
function eventListeres() {
  form.addEventListener('submit', addTweet);

  document.addEventListener('DOMContentLoaded', () => {
    tweets = JSON.parse(localStorage.getItem('tweets')) || []; // Operador || da un fallback en caso de que el primero sea null, entrega entonces un arreglo vacío.
    createHTML()
  })
}

// Functions
function addTweet(e) {
  e.preventDefault();
  
  const tweet = document.getElementById('tweet').value;
  if(tweet === '') {
    showError('Este campo no puede estar vacío.')
    return
  }

  const tweetObj = {
    id: Date.now(),
    tweet
  }
  
  tweets = [...tweets, tweetObj]
  createHTML()
  form.reset()
}

function showError(msg) {
  const errorMsg = document.createElement('P');
  errorMsg.textContent = msg;
  errorMsg.classList.add('error');
  form.insertBefore(errorMsg, form.lastElementChild);

  setTimeout(() => {
    errorMsg.remove()
  }, 3000);
}

function createHTML() {
  clearHTML()
  if(tweets.length > 0) {
    tweets.forEach(tweet => {
      const li = document.createElement('LI');
      li.innerText = tweet.tweet;
      li.classList.add('tweet');

      const deleteButton = document.createElement('A');
      deleteButton.classList.add('borrar-tweet');
      deleteButton.innerText = 'X';
      li.appendChild(deleteButton);
      
      deleteButton.onclick = () => {
        deleteTweet(tweet.id);
      }

      tweetsList.appendChild(li);
    })
  }
  addToLocalStorage();
}

function addToLocalStorage() {
  localStorage.setItem('tweets', JSON.stringify(tweets));
}

function clearHTML() {
  while(tweetsList.firstChild) {
    tweetsList.removeChild(tweetsList.firstChild);
  }
}

function deleteTweet(id) {
  tweets = tweets.filter(tweet => tweet.id != id);
  createHTML()
}