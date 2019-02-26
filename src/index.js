let addToy = false

// On page load
document.addEventListener("DOMContentLoaded", function() {
  getToys()
  addBtn().addEventListener('click', handleAddButton)
  toyCollection().addEventListener('click', handleLikeButton)
})

// Clear page
function clearPage() {
  while (toyCollection().firstChild) {
    toyCollection().removeChild(toyCollection().firstChild)
  }
}

// Retrieve page elements
function baseURL() {
  return 'http://localhost:3000/toys'
}

function toyCollection() {
  return document.querySelector('#toy-collection')
}

function toyForm() {
  return document.querySelector('.add-toy-form')
}

function toyFormArea() {
  return document.querySelector('.container')
}

function addBtn() {
  return document.querySelector('#new-toy-btn')
}

//Fetch toys from API, then add to Toy.all and display
function getToys() {
  fetch(`${baseURL()}`)
  .then(res => res.json())
  .then(data => addToys(data))
}

function addToys(toys) {
  for (const key in toys) {
    let t = toys[key]
    new Toy(t.name, t.image, t.likes)
  }
  Toy.displayAll()
}

// Handle events
function handleAddButton() {
  addToy = !addToy
  if (addToy) {
    toyFormArea().style.display = 'block'
    toyForm().addEventListener("submit", handleFormSubmission)
  } else {
    toyFormArea().style.display = 'none'
  }
}

function handleFormSubmission(e) {
  e.preventDefault()
  let name = document.querySelector("#name").value
  let image = document.querySelector("#image").value
  sendToy(name, image)
  toyForm().reset()
}

function handleLikeButton(e) {
  if (e.target && e.target.nodeName === "BUTTON") {
    let t = Toy.all().find(toy => toy.id == e.target.id.slice(4))
    updateLikes(t)
  }
}

// Send new toy to db -- if successful, create toy as object/render
function sendToy(name, image) {
  let toy = {name: name, image: image, likes: 0}
  fetch(`${baseURL()}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(toy)
  }).then(res => res.json())
  .then(() => {createToy(toy)})
}

function createToy(toy) {
  let t = new Toy(toy.name, toy.image)
  t.format()
}

// Send updated likes to db -- if successful, update object/render
function updateLikes(toy) {
  fetch(`${baseURL()}/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({likes: `${parseInt(toy.likes)+1}`})
  }).then(res => res.json()).then(json => toy.editLikes(json))
}
