document.addEventListener("DOMContentLoaded", init)

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
function init() {
  getToys()
  const form = document.querySelector('form')
  form.addEventListener('submit', submitForm)
}

function submitForm() {
  let data = {
    "name": document.querySelector('#name-field').value,
    "image": document.querySelector('#img-url-field').value,
    "likes": 0
  }
  fetch('http://localhost:3000/toys', {
    method: 'post', 
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
  }).then(resp => resp.json())
    .then(toys => console.log(`hi ${toys}`))
}

function createToyDiv(toy) {
  let toysDiv = document.querySelector('#toy-collection')
    let toyDiv = document.createElement('div')
    toyDiv.className = 'card'
    toyDiv.id = `toy-${toy.id}`
      let toyName = document.createElement('h2')
        toyName.innerHTML = `${toy.name}`
      let toyImg = document.createElement('img')
        toyImg.src = toy.image
        toyImg.className = 'toy-avatar'
      let toyLikes = document.createElement('p')
        toyLikes.innerHTML = `${toy.likes} Likes`
      let likeButton = document.createElement('button')
        likeButton.innerHTML = 'Like <3'
        likeButton.className = 'like-btn'
    toyDiv.appendChild(toyName)
    toyDiv.appendChild(toyImg)
    toyDiv.appendChild(toyLikes)
    toyDiv.appendChild(likeButton)
  toysDiv.appendChild(toyDiv)
  likeButton.addEventListener('click', () => {updateLike(toy, ++toy.likes)})
}

function updateLike(toy, likes) {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({'likes': likes})
  })
  let toylikes = document.querySelector(`#toy-${toy.id} p`)
  toylikes.innerHTML = `${likes} Likes`
}

function getToys() {
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toyArray => {
      toyArray.forEach(toy => {
        createToyDiv(toy)
      })
    })
}

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
