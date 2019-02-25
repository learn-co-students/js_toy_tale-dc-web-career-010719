const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!

let toysContainer
let form
document.addEventListener('DOMContentLoaded', init)

function init() {
  toysContainer = document.querySelector('#toy-collection')
  getAllToys()
  form = document.querySelector('.add-toy-form')
  form.addEventListener('submit', handleSubmitForm)
}

function getAllToys() {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(allToys => {
    allToys.forEach(renderToy)
  })
}

function renderToy(toyObj) {
  let div = document.createElement('div')
  div.classList.add('card')
  toysContainer.appendChild(div)

  let h2 = document.createElement('h2')
  div.appendChild(h2)
  h2.innerText = toyObj.name

  let img = document.createElement('img')
  div.appendChild(img)
  img.classList.add('toy-avatar')
  img.src = toyObj.image

  let p = document.createElement('p')
  div.appendChild(p)
  p.id = 'toy-like-' + toyObj.id
  p.innerText = `${toyObj.likes} Likes`

  let button = document.createElement('button')
  button.dataset.id = toyObj.id
  div.appendChild(button)
  button.classList.add('like-btn')
  button.innerText = 'Like <3'
  button.addEventListener('click', handleClickOfLikeButton)
}

function handleSubmitForm(event) {
  event.preventDefault()
  postNewToy()
}

function postNewToy() {
  let postData = {
    name: document.querySelectorAll('.input-text')[0].value,
    image: document.querySelectorAll('.input-text')[1].value,
    likes: 0
  }
  fetch('http://localhost:3000/toys', {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }).then(res => res.json())
    .then(newToyObj => renderToy(newToyObj))
}

function handleClickOfLikeButton(event) {
  let toyIdToIncreaseLikes = event.currentTarget.dataset.id
  addLikesToToy(toyIdToIncreaseLikes)
}

function addLikesToToy(id) {
  let currentLikes = parseInt(document.querySelector(`#toy-like-${id}`).innerText.split(' ')[0])
  let newLikes = currentLikes + 1
  let patchData = {
    likes: newLikes
  }
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    body: JSON.stringify(patchData),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }).then(res => res.json())
    .then(patchedToy => adjustLikes(patchedToy))
}

function adjustLikes(patchedToy) {
  document.querySelector(`#toy-like-${patchedToy.id}`).innerText = `${patchedToy.likes} Likes`
}
