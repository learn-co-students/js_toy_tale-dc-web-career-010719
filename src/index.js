const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyContainer = document.querySelector('#toy-collection')

const api = 'http://localhost:3000/toys'

document.addEventListener('DOMContentLoaded', () => {
  toyForm.addEventListener('submit', handleAdd)
  fetchToys()
})

let addToyEnabled = false

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToyEnabled = !addToyEnabled
  if (addToyEnabled) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

// function toyAPI(endpoint = '', opts = {}) {
//   return fetch(`${api}/${endpoint}`, opts)
//     .then(res => res.json())
// }

function addToy(name, image, likes = 0) {
  fetch(api, {
    method: 'POST',
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({name: name, image: image, likes: likes})
  }).then(res => res.json())
    .then(displayToy)
}

function likeToy(id, likes) {
  fetch(`${api}/${id}`, {
    method: 'PATCH',
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({likes: likes})
  })
}

function fetchToys() {
  fetch(api)
    .then(res => res.json())
    .then(displayToys)
}

function displayToys(toys) {
  toys.forEach(displayToy)
}

function displayToy(toy) {
  const card = document.createElement('div')
  card.classList.add('card')

  card.dataset.id = toy.id
  card.dataset.likes = toy.likes

  card.innerHTML += `<h2>${toy.name}</h2>`
  card.innerHTML += `<img src="${toy.image}" alt="${toy.name}" class="toy-avatar" />`
  card.innerHTML += `<p class="like-text">${toy.likes} Likes</p>`

  const likeBtn = document.createElement('button')
  likeBtn.innerText = "Like <3"
  likeBtn.classList.add('like-btn')
  likeBtn.addEventListener('click', handleLike)
  likeBtn.dataset.id = toy.id
  card.appendChild(likeBtn)

  toyContainer.appendChild(card)
}

function handleAdd(e) {
  e.preventDefault()
  const name = toyForm.querySelector('input[name="name"]').value 
  const image = toyForm.querySelector('input[name="image"]').value 
  addToy(name, image)
}

function handleLike(e) {
  const toyId = e.currentTarget.dataset.id
  const toyCard = document.querySelector(`.card[data-id="${toyId}"]`)
  let likes = parseInt(toyCard.dataset.likes)
  toyCard.querySelector('.like-text').innerText = `${++likes} Likes`
  likeToy(toyId, likes)
}