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

document.addEventListener("DOMContentLoaded", init)

function init() {
  getAllToys()

  let addToyForm = getAddToyForm()
  addToyForm.addEventListener('submit', handleClickOfCreateNewToy)
}

function getToyContainer() {
  return document.querySelector('#toy-collection')
}

function getAddToyForm() {
  return document.querySelector('.add-toy-form')
}

function getAllToys() {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(allToyObjs => {
    allToyObjs.forEach(renderToy)
  })
}

function renderToy(toyObj) {
  let toyContainer = getToyContainer()

  let div = document.createElement('div')
  div.classList.add('card')
  toyContainer.appendChild(div)

  let h2 = document.createElement('h2')
  div.appendChild(h2)
  h2.innerText = toyObj.name

  let img = document.createElement('img')
  div.appendChild(img)
  img.classList.add('toy-avatar')
  img.src = toyObj.image

  let p = document.createElement('p')
  div.appendChild(p)
  p.id = 'toy-' + toyObj.id
  p.innerText = `${toyObj.likes} Likes`

  let button = document.createElement('button')
  div.appendChild(button)
  button.classList.add('like-btn')
  button.dataset.id = toyObj.id
  button.innerText = "Like"
  button.addEventListener('click', handleClickOfLikeButton)
}

function handleClickOfCreateNewToy(event) {
  event.preventDefault()
  postNewToy()
}

function postNewToy() {
  let postData = {
    name: document.querySelectorAll('input')[0].value,
    image: document.querySelectorAll('input')[1].value,
    likes: 0
  }

  document.querySelectorAll('input')[0].value = ''
  document.querySelectorAll('input')[1].value = ''

  fetch(`http://localhost:3000/toys`, {
    method: "POST",
    body: JSON.stringify(postData),
    headers : {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }).then(res => res.json())
    .then(newToyObj => {renderToy(newToyObj)})
}

function handleClickOfLikeButton(event) {
  let toyId = event.currentTarget.dataset.id
  patchLikes(toyId)
}

function patchLikes(toyId) {
  let patchData = {
    likes: parseInt(document.querySelector(`#toy-${toyId}`).innerText.split(" ")[0]) + 1
  }
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    body: JSON.stringify(patchData),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }).then(res => res.json())
    .then(patchedToyObj => {
      document.querySelector(`#toy-${toyId}`).innerText = `${patchedToyObj.likes} Likes`
    })
}
